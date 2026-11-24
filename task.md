# Task

Goal: Arabic version in `arabic/` (text + voice).

Done:
- `arabic/index.html`, `mobile.html`, `pc.html`: all UI text translated, `lang="ar" dir="rtl"`.
- Voice lines translated in both the `CLIPS` map and the `say()` calls, so keys still match.
- Voice: Piper `ar_JO-kareem-medium` (60 MB, CPU) with espeak Arabic phonemes, so the tashkeel in `tts_lines.txt` is used. Per-voice pitch via ffmpeg rubberband (formant preserved). OGGs in `arabic/audio/`.
- MMS (`facebook/mms-tts-ara`) dropped: it ignores tashkeel, and asetrate pitch shifting sounded bad.

Next:
- Finish the tashkeel pass: `arabic/tts_lines.txt` stops at 53 rows, the other 48 come from `tts_lines_missing.txt`.
- Listen to a few clips on a real device.
- Check the RTL layout on a phone in landscape.
