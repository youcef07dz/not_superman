# Mistakes

- Arabic text swap broke a JS string: the map entry ate the closing quote in the
  "Carrying: safe zone ..." line, so the page failed to parse. Fix: run
  `node --check` on every inline script after bulk replacing text, and fix quotes.
- Picked Orpheus TTS before checking its languages; it has no Arabic model at all.
  Fix: check the model list on Hugging Face for the target language first.
- Two downloads wrote the same file at once (two curl jobs plus a ranged script),
  which corrupted it. Fix: one writer per file, download to `.part`, check sha256.
