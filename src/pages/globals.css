@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* For rgb(255 115 179 / <alpha-value>) */
    --color-fg-0: 36 41 47;
    --color-fg-1: 51 65 85;
    --color-fg-2: 71 85 105;
    --color-fg-3: 100 116 139;
    --color-fg-4: 148 163 184;

    --color-bg-0: 255 255 255;
    --color-bg-1: 241 245 249;
    --color-bg-2: 226 232 240;
    --color-bg-3: 203 213 225;
    --color-bg-4: 148 163 184;
  }

  .dark {
    --color-fg-0: 255 255 255;
    /* --color-fg-1: 241 245 249; */
    --color-fg-1: 226 232 240;
    --color-fg-2: 203 213 225;
    --color-fg-3: 148 163 184;
    --color-fg-4: 100 116 139;

    --color-bg-0: 18 18 18;
    --color-bg-1: 51 65 85;
    --color-bg-2: 71 85 105;
    --color-bg-3: 100 116 139;
    --color-bg-4: 148 163 184;
  }

  .link {
    display: inline-block;
    text-decoration: none;
    line-height: 1.3;
    position: relative;
    transition: unset;
    opacity: 1;
    border-color: var(--fg-color-2);
    border-bottom-width: 0.135rem;
    background: transparent;
    background-origin: border-box;
    background-repeat: no-repeat;
    background-position: 50% 100%;
    background-size: 0 0.135rem;
  }

  .link:focus,
  .link:hover {
    text-decoration: none;
    border-bottom-color: transparent;

    background-image: linear-gradient(90.68deg, #b439df 0.26%, #e5337e 102.37%);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 100% 0.135rem;

    transition-property: background-position, background-size;
    transition-duration: 300ms;
  }
}

* {
  box-sizing: border-box;
}

svg {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

:root {
  --bg-color: #fff;
  --bg-color-0: rgba(135, 131, 120, 0.15);
  --bg-color-1: rgb(247, 246, 243);
  --bg-color-2: rgba(135, 131, 120, 0.15);

  --fg-color: #24292f;
  --fg-color-1: #292d32;
  --fg-color-2: #31363b;

  --max-width: 1200px;
  --max-body-width: 1024px;

  --gap: calc(max(8px, min(24px, 1.5vw)));
  --gap-w: calc(max(12px, min(48px, 1.5vw)));
  --gap-w-1: calc(max(2px, min(24px, 0.7vw)));
  --gap-h: calc(max(12px, min(48px, 4vh)));
  --gap-h-1: calc(max(8px, min(24px, 1.5vh)));
  --gap-2: calc(max(12px, min(48px, 4vmin)));
}

.dark {
  --bg-color: #121212;
  --bg-color-0: rgb(71, 76, 80);
  --bg-color-1: rgb(63, 68, 71);
  --bg-color-2: rgba(135, 131, 120, 0.15);

  --fg-color: #fff;
  --fg-color-1: rgba(255, 255, 255, 0.85);
  --fg-color-2: rgba(255, 255, 255, 0.7);
}

body {
  background: var(--bg-color);
  color: var(--fg-color);
  line-height: 1.3;
}

.match {
  border-radius: 0.35em;
  padding: 0.1em 0.25em;
  margin: -0.1em -0.25em;
  box-decoration-break: clone;
  background: #fdf59d;
  background: #bbebff;
  font-weight: normal;
  color: #000;
}

[data-radix-popper-content-wrapper] {
  z-index: 500 !important;
}

[data-nextjs-scroll-focus-boundary] {
  display: contents;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
