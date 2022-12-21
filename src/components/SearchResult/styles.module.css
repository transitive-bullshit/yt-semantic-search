.searchResult {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;
}

.searchResult p {
  font-size: 15px;
}

:global(.dark) .searchResult p {
  color: #d1d5db;
}

.title {
  font-size: 1.1em;
  margin-bottom: 0.5em;
  color: #1a0dab;
}

:global(.dark) .title {
  color: #78a9ff;
}

.frame {
  position: relative;
  display: block;
}

.thumbnail {
  min-width: 210px;
  max-width: 320px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

:global(.dark) .thumbnail {
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.youtubeButton {
  display: block;
  position: relative;
  width: 68px;
  height: 48px;
  cursor: pointer;
  background-color: transparent;
  background-image: url('/images/youtube.svg');
  filter: grayscale(100%);
  transition: filter 0.1s cubic-bezier(0, 0, 0.2, 1);
  border: none;
}

.youtubeButton:hover,
.youtubeButton:focus {
  filter: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

.overlay:hover,
.overlay:focus {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.25);
}

@media (max-width: 700px) {
  .thumbnail {
    max-width: calc(min(400px, 100vw - 24px));
  }

  .searchResult {
    flex-direction: column;
    gap: 1em;
  }

  .frame {
    order: 1;
  }

  .lhs {
    order: 2;
  }
}
