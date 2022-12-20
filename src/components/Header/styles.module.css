.header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;

  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  height: 72px;
  min-height: 72px;
  padding: 12px 0;

  background: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(16px);
}

:global(.dark) .header {
  background: transparent;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: saturate(180%) blur(8px);
}

.navHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: var(--gap-w-1);

  max-width: var(--max-width);
  height: 100%;
  margin: 0 auto;
}

.rhs {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  gap: var(--gap-w-1);
}

.action {
  display: inline-flex;
  align-items: center;
  padding: 12px;
  line-height: 1;
  font-size: 14px;
  border-radius: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: backgrond-color 200ms ease-in, color 200ms ease-in;
}

.icon {
  box-sizing: border-box;
  padding: 8px !important;
  width: calc(1rem + 24px);
  height: calc(1rem + 24px);
}

.icon > svg {
  width: 100%;
  height: 100%;
}

.action:not(.active):hover,
.action:not(.active):focus {
  transition: backgrond-color 50ms ease-in, color 50ms ease-in;
  background-color: var(--bg-color-0);
}

.action:not(.active):active {
  background-color: var(--bg-color-1);
}

.action.active {
  cursor: default;
}

.twitter:hover {
  color: #2795e9;
}

.github:hover {
  color: #c9510c;
}

.logo {
  display: block;
  width: auto;
  max-width: 100%;
  height: 48px;
}

/* Workaround for Firefox not supporting backdrop-filter yet */
@-moz-document url-prefix() {
  :global(.dark) .header {
    background: hsla(203, 8%, 20%, 0.8);
  }
}
