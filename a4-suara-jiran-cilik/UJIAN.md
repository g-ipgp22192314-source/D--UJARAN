# Keputusan ujian

Dijalankan dalam Chromium menggunakan mikrofon sintetik sebenar melalui MediaRecorder, bukan memalsukan hasil Blob.

- Lulus: 16 rakaman (8 misi × 2 peringkat), main semula dan 8 pemain ujaran Peringkat 1.
- Lulus: muat turun WebM, fail berjaya dinyahkod oleh ffmpeg.
- Lulus: rakam semula dan batal penggantian.
- Lulus: peringkat tanpa rakaman tidak boleh dilengkapkan.
- Lulus: lencana, sijil PDF satu halaman A4 landskap, kemajuan selepas muat semula.
- Lulus: Mula Semula membersihkan rakaman murid terdahulu.
- Lulus: muat naik fail guru melalui IndexedDB.
- Lulus: paparan 390, 768 dan 1366 px tanpa limpahan mendatar pada peta/misi.
- Lulus: kebenaran mikrofon ditolak; permintaan mikrofon lewat selepas meninggalkan misi dibatalkan.
- Tiada ralat JavaScript dalam perjalanan permainan penuh.

Jalankan pelayan python3 -m http.server 8094 dari folder aplikasi, kemudian node tests/smoke.cjs dengan Playwright dan Chromium tersedia.

Ujian menggunakan mikrofon sintetik. Guru masih perlu mencuba suara sebenar pada peranti sasaran selepas penerbitan HTTPS. Audio Peringkat 2 belum dibekalkan. Ujian ini tidak membuktikan penerbitan Netlify telah dibuat.
