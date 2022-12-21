# YouTube Channel Search <!-- omit in toc -->

> TODO

[![Build Status](https://github.com/transitive-bullshit/yt-channel-search/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/yt-channel-search/actions/workflows/test.yml) [![MIT License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/transitive-bullshit/yt-channel-search/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

- [Intro](#intro)
- [Example Queries](#example-queries)
- [How It Works](#how-it-works)
- [TODO](#todo)
- [Credit](#credit)
- [License](#license)

## Intro

I love the [All-In Podcast](https://www.youtube.com/channel/UCESLZhusAkFfsNsApnjF_Cg), but podcasts make recall and discovery challenging.

This project uses the latest models from [OpenAI](https://openai.com/) to search every episode with Google-level accuracy and summarize the results.

You can use it to power advanced search across any YouTube channel or playlist. This demo uses the [All-In Podcast](https://www.youtube.com/channel/UCESLZhusAkFfsNsApnjF_Cg) because it's a podcast that I follow regularly.

## Example Queries

- [sweater karen](https://all-in-on-ai.vercel.app/?query=sweater+karen)
- [best advice for founders](https://all-in-on-ai.vercel.app/?query=best+advice+for+founders)
- [poker story from last night](https://all-in-on-ai.vercel.app/?query=poker+story+from+last+night)
- [crypto scam ponzi scheme](https://all-in-on-ai.vercel.app/?query=crypto+scam+ponzi+scheme)
- [luxury sweater chamath](https://all-in-on-ai.vercel.app/?query=luxury+sweater+chamath)
- [phil helmuth](https://all-in-on-ai.vercel.app/?query=phil+helmuth)
- [intellectual honesty](https://all-in-on-ai.vercel.app/?query=intellectual+honesty)
- [sbf](https://all-in-on-ai.vercel.app/?query=sbf)

## How It Works

- [OpenAI](https://openai.com) - We use the [text-embedding-ada-002](https://openai.com/blog/new-and-improved-embedding-model/) embedding model
- [Pinecone](https://www.pinecone.io) - Hosted vector search across embeddings
- [Vercel](https://vercel.com) - Hosting and API functions
- [Next.js](https://nextjs.org) - React web framework

We use Node.js and the [YouTube API v3](https://developers.google.com/youtube/v3/getting-started) to fetch the videos of a playlist or channel. In this case, we're focused on the [All-In Podcast Episodes Playlist](https://www.youtube.com/playlist?list=PLn5MTSAqaf8peDZQ57QkJBzewJU1aUokl).

```bash
npx tsx src/bin/resolve-yt-playlist.ts
```

We then download all of the available English transcripts for each episode using a hacky HTML scraping solution, since the YouTube API doesn't allow non-OAuth access to captions. Note that a few episodes don't have automated English transcriptions available, so we're just skipping them at the moment.

Once we have all of the transcripts and metadata downloaded locally, we pre-process each video's transcripts, breaking them up into reasonably sized chunks of ~100 tokens and getting the [text-embedding-ada-002](https://openai.com/blog/new-and-improved-embedding-model/) embedding from OpenAI. This results in ~200 embeddings per episode.

All of these embeddings are then upserted into a [Pinecone](https://www.pinecone.io) index with a dimensionality of 1536. There are ~17,575 embeddings in total across ~108 episodes of the All-In Podcast.

```bash
npx tsx src/bin/process-yt-playlist.ts
```

Once our Pinecone search index is set up, we can start querying it either via the webapp or via the example CLI:

```bash
npx tsx src/bin/query.ts
```

## TODO

- Use [Whisper](https://github.com/m-bain/whisperX) for transcription
- Support sorting by recency vs relevancy
- Add screenshots of the video at the given offset

## Credit

- Inspired by [Riley Tomasek's project](https://twitter.com/rileytomasek/status/1603854647575384067)

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

If you found this project interesting, please consider [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
