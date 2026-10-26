# Pengesahan panel suntingan B2

Lulus dalam Chromium/Playwright:

- Sunting ayat, tajuk unit, soalan, jawapan, pengganggu dan petunjuk.
- Muat naik gambar dan audio yang boleh dibuka, kemudian simpan melalui IndexedDB.
- Muat semula memulihkan draf dan media.
- Pratonton murid menggunakan teks/gambar/audio yang disunting.
- Jawapan betul/salah masih dinilai selepas suntingan dan media pengganggu dipetakan kepada identiti pilihan.
- Pilihan jawapan pendua ditolak sebelum simpan/eksport.
- Sandaran JSON dan pemulihan pada projek berfungsi.
- Eksport index.html membawa suntingan serta media ke konteks pelayar baharu.
- Teks halaman/latar belakang boleh diganti.
- SVG dan sumber javascript: dalam import ditolak tanpa menggantikan projek.
- Teks yang menyerupai penutup script kekal teks selepas eksport.
- Paparan panel 390 dan 768 px tiada limpahan mendatar.
- Halaman kendiri berfungsi tanpa rangkaian selepas dokumen dibekalkan; semua lapan unit boleh dibuka.
- Jika IndexedDB disekat, status menyatakan simpan gagal tetapi eksport sesi masih berfungsi.

Jalankan `node b2-jelajah-audio-visual/tests/editor-smoke.cjs` dari akar repositori dengan Playwright dan /usr/bin/chromium tersedia. Skrip menjalankan pelayan sementara sendiri dan membersihkan hasil ujian.

Semakan ini menguji aplikasi setempat; penerbitan dalam akaun Netlify guru belum dilaksanakan. Navigasi file:// dalam persekitaran ujian disekat oleh polisi pelayar pentadbir; semakan utama menggunakan HTTP setempat.
