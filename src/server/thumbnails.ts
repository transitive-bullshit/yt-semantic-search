import lqip from 'lqip-modern'
import pRetry from 'p-retry'
import puppeteer, { type Browser, executablePath } from 'puppeteer'

import * as types from '@/server/types'

/**
 * Generates N thumbnail images from a YouTube video using headless Puppeteer.
 *
 * The YouTube video is loaded in an iframe embed, and we use the YouTube Player
 * API to `seekTo` each timestamp in turn.
 *
 * Resulting images are stored to disk, uploaded to a Google Cloud bucket, and
 * processed with `lqip-modern` to generate aesthetically-pleasing preview images.
 */
export async function getThumbnailsForVideo({
  videoId,
  timestamps,
  browser,
  storage,
  bucket
}: {
  videoId: string
  timestamps: string[]
  browser?: Browser
  storage?: types.GCPStorage
  bucket?: string
}): Promise<
  Record<
    string,
    {
      videoId: string
      thumbnail: string
      preview: string
    }
  >
> {
  const originalBrowser = browser

  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-first-run',
        '--no-service-autorun',
        '--password-store=basic',
        '--mute-audio',
        '--disable-default-apps',
        '--no-zygote'
      ],
      ignoreHTTPSErrors: true,
      executablePath: await executablePath()
    })
  }

  const page = (await browser.pages())[0] || (await browser.newPage())
  const startTime = timestamps[0]
  const start = startTime.split('.')[0]
  const html = getYouTubePlayerHtml({ videoId, start })
  await page.setContent(html, {
    waitUntil: 'networkidle2'
  })
  await page.waitForSelector('.ready')
  const iframe = await page.$('iframe#player')
  const frame = await iframe.contentFrame()
  await frame.addStyleTag({
    content: `
        .ytp-chrome-bottom, 
        .ytp-chrome-top-buttons,
        .ytp-player-content, 
        .ytp-pause-overlay-container {
          display: none !important;
        }`
  })

  const output: Record<
    string,
    {
      videoId: string
      thumbnail: string
      preview: string
    }
  > = {}

  for (const time of timestamps) {
    try {
      const t = time.split('.')[0]
      const tt = parseFloat(t)

      await page.evaluate((tt) => {
        return new Promise<void>(async (resolve, reject) => {
          try {
            globalThis.bufferingP = null
            globalThis.resolveBufferingP = null

            console.log('seekTo', tt)
            globalThis.player.seekTo(tt, true)

            do {
              await new Promise((resolve) => setTimeout(resolve, 250))

              if (globalThis.bufferingP) {
                await globalThis.bufferingP
              } else {
                const time = globalThis.player.getCurrentTime()
                if (Math.abs(time - tt) < 5) {
                  return resolve()
                }
              }
            } while (true)
          } catch (err) {
            reject(err)
          }
        })
      }, tt)

      const name = `${videoId}-${t}.jpg`
      const path = `out/${name}`
      const buffer = await iframe.screenshot({
        type: 'jpeg',
        path
      })

      if (storage && bucket) {
        const preview = await lqip(buffer)

        await pRetry(
          () =>
            uploadFileToBucket({
              path,
              name,
              storage,
              bucket,
              contentType: 'image/jpeg'
            }),
          {
            retries: 3
          }
        )

        const url = `https://storage.googleapis.com/${bucket}/${name}`
        console.log(url)

        output[time] = {
          videoId,
          thumbnail: url,
          preview: preview.metadata.dataURIBase64
        }
      }
    } catch (err) {
      console.warn(
        'puppeteer error taking thumbnail screenshot',
        videoId,
        time,
        err.toString()
      )
    }

    // const youtubeUrl = `https://youtube.com/watch?v=${videoId}&t=${t}`
    // console.log(youtubeUrl)
    // await page.goto(youtubeUrl, {
    //   waitUntil: 'networkidle2'
    // })
    // const video = await page.waitForSelector('video.html5-main-video')
  }

  if (!originalBrowser) {
    await browser.close()
  } else {
    await page.close()
  }

  return output
}

interface UploadFileToBucketOptions {
  name: string
  path: string
  storage: types.GCPStorage
  bucket: string
  contentType?: string
}

async function uploadFileToBucket({
  path,
  name,
  storage,
  bucket,
  contentType = 'image/jpeg'
}: UploadFileToBucketOptions) {
  return storage.bucket(bucket).upload(path, {
    destination: name,
    contentType
  })
}

function getYouTubePlayerHtml({
  videoId,
  start
}: {
  videoId: string
  start: string
}) {
  return `
<!DOCTYPE html>
<html>
  <body>
    <div id="player"></div>

    <script>
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: '${videoId}',
          playerVars: {
            'playsinline': 1,
            'controls': 0,
            'rel': 0,
            'modestbranding': 1,
            'start': '${start}'
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        window.player = player;
      }

      var state = 0;
      var resolveBufferingP;
      function onPlayerReady(event) {
        console.log('ready')
        player.playVideo()
      }

      function onPlayerStateChange(event) {
        console.log('state change', event.data, player.getCurrentTime());

        if (event.data === 1) {
          // ensure player is always paused
          player.pauseVideo();

          if (state === 0) {
            state = 1;

            // signal node.js that we're ready to rock & roll
            var div = document.createElement('div');
            div.className = 'ready';
            document.body.appendChild(div);
          }
        }

        if (event.data === 3) {
          if (!globalThis.bufferingP) {
            console.log('init bufferingP')
            globalThis.bufferingP = new Promise((resolve) => {
              globalThis.resolveBufferingP = resolve
            })
          }
          return
        }

        if (event.data === 2) {
          if (globalThis.bufferingP && globalThis.resolveBufferingP) {
            console.log('resolveBufferingP()')
            globalThis.resolveBufferingP()
          }
        }
      }
    </script>
  </body>
</html>
`
}
