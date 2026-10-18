# A4 — Suara Jiran Cilik

Permainan web statik lengkap dengan peta isometrik 2.5D, lapan misi berurutan, dua peringkat rakaman bagi setiap misi, penilaian kendiri, lencana dan sijil digital. Kandungan lapan misi disalin daripada fail `A4` pada cabang `main`; fail asal itu tidak diubah.

## Jalankan secara setempat

Dari akar repositori:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Buka `/a4-suara-jiran-cilik/` pada pelayan tersebut. Mikrofon memerlukan HTTPS atau localhost, sokongan MediaRecorder dan kebenaran pengguna. Elakkan `file://`. Tiada pemasangan npm, build, API key atau backend diperlukan untuk aplikasi.

## Terbitkan pada Netlify

Pilihan paling ringkas: terbitkan folder `a4-suara-jiran-cilik` sebagai laman statik (muat naik folder ini ke Netlify). Untuk sambungan Git, gunakan cabang A4 yang telah disemak, **Base directory** `a4-suara-jiran-cilik`, tiada **Build command**, dan **Publish directory** `.`. `netlify.toml` disertakan untuk menerbitkan folder semasa tanpa build.

Semua aset, fon, skrip dan gaya menggunakan laluan relatif. Tiada SPA rewrite diperlukan. `_headers` membenarkan mikrofon pada origin sendiri dan menyekat kamera. Netlify menyediakan HTTPS. Jika aplikasi dimasukkan dalam iframe, hos induk juga perlu membenarkan mikrofon; pembukaan terus melalui URL laman disyorkan.

Pautan kembali ke portal dan menu Mod A boleh diubah dalam `A4_SETTINGS` pada `missions.js` (pautan jenama pada index.html turut perlu diubah jika portal berpindah). Pautan lalai menunjuk ke portal D-UJARAN sedia ada, jadi navigasi masih betul jika A4 diterbitkan bersendirian di Netlify.

## Rakaman sebenar

`recorder.js` menggunakan getUserMedia, MediaRecorder, Blob dan URL.createObjectURL. Browser memilih format yang disokong: WebM/Opus, MP4 audio atau Ogg/Opus; jika tiada pilihan tertentu, format lalai MediaRecorder digunakan. Muat turun menggunakan sambungan `.webm`, `.m4a`, `.ogg` atau `.audio` mengikut format sebenar. Tiada dakwaan eksport MP3 untuk rakaman murid.

MULA RAKAM meminta mikrofon; BERHENTI menamatkan rakaman dan melepaskan semua trek. Rakaman boleh didengar melalui pemain sebenar, dirakam semula selepas pengesahan, dan dimuat turun. Permintaan mikrofon yang masih menunggu dibatalkan secara selamat apabila keluar. Had rakaman dua minit. Semasa rakaman atau ujaran dimainkan, muzik latar disenyapkan. Kesan bunyi turut tidak dimainkan semasa dialog/rakaman.

Audio murid **tidak dimuat naik ke pelayan**, tidak disimpan dalam localStorage, dan tidak disimpan merentas sesi. Ia kekal dalam memori sehingga halaman ditutup/dimuat semula. Muat turun rakaman sebelum keluar. Metadata penyelesaian sahaja disimpan bersama kemajuan.

Setiap peringkat memerlukan Blob rakaman yang telah selesai. Muat semula halaman menghilangkan rakaman belum dimuat turun; selepas muat semula, latihan semula memerlukan rakaman semula. Lencana misi yang sudah selesai kekal. Guru boleh mengurus aktiviti lisan di luar aplikasi melalui panel guru dan menandakan pengesahan yang benar-benar dijalankan. Laluan ini dilabel sebagai lisan bersama guru, tidak mencipta rakaman palsu dan tidak mengaku bahawa pertuturan telah dinilai mesin.

## Audio ujaran jiran

Rakaman ujaran guru belum dibekalkan. Untuk setiap misi, tetapkan `stages[0].audioUrl` dan `stages[1].audioUrl` dalam missions.js kepada URL MP3 HTTPS, atau gunakan panel guru untuk suntingan setempat. Utamakan fail guru apabila ada. Audio gagal dimuatkan akan diberitahu dan fallback hanya menggunakan suara berbahasa tepat `ms-MY` daripada Web Speech API. Jika suara itu tidak tersedia, teks dan mesej bantuan ditunjukkan; tiada pertukaran senyap ke bahasa lain. Kualiti dan ketersediaan suara bergantung pada peranti; semak sebutan sebelum kelas.

## Panel guru

Panel berasingan menyenaraikan lapan misi, boleh menyunting ujaran utama/susulan, kata kunci petunjuk, contoh respons dan kedua-dua URL audio. Butang ujian menggunakan audio yang sedang disunting. URL bukan HTTPS ditolak. Contoh respons hanya dalam panel guru, bukan pada cabaran spontan murid. Suntingan disimpan pada pelayar ini sahaja; untuk semua murid, pindahkan nilai ke missions.js dan terbitkan semula. Panel tidak mempunyai pengesahan pentadbir dan tidak menggunakan PIN yang memberi gambaran keselamatan palsu.

Nama, kelas, tetapan, status misi dan lencana disimpan dalam localStorage origin semasa. Tiada penyelarasan antara peranti atau akaun. Jika storan tidak tersedia/penuh, aplikasi memberikan mesej dan boleh diteruskan sepanjang sesi. Pemadaman profil/kemajuan meminta pengesahan, memadam Blob rakaman sesi, tetapi mengekalkan suntingan kandungan guru.

## Peta, lencana dan sijil

Lapan lokasi dibuka berurutan; lokasi selesai boleh diulang. Laluan biru bermula dari Rumah Jiran Baharu, terus ke simpang lalu belok kanan menuju taman; Dewan Hari Keluarga terletak bersebelahan taman. Peta boleh ditatal mendatar pada telefon dan tablet kecil. Dunia dibina dengan SVG isometrik, avatar blok CSS asli dan animasi tanpa aset/jenama rasmi Roblox atau pustaka 3D berat.

Selepas dua peringkat dan tiga semakan kendiri, lencana diberikan. Ia menunjukkan penyertaan, bukan pengesahan ketepatan pertuturan secara automatik. Sijil terbuka selepas lapan misi dan memaparkan nama, kelas serta tarikh Malaysia. **MUAT TURUN PDF** menggunakan alternatif cetakan pelayar yang berfungsi: pilih **Simpan sebagai PDF**, A4, landskap. **CETAK SIJIL** membuka dialog cetakan yang sama. Ia bukan muat turun PDF senyap; arahan itu juga dipaparkan dalam aplikasi.

Fon Fredoka dan Nunito dibekalkan secara tempatan dengan lesen SIL OFL di assets/fonts. Muzik dan kesan bunyi pendek dijana melalui Web Audio, bermula selepas interaksi pengguna. Pilihan kurangkan animasi serta prefers-reduced-motion dihormati. Tiada kilatan pantas. UI menggunakan butang asli, label form, dialog Escape dan status langsung untuk papan kekunci/pembaca skrin.

## Fail utama

- index.html — rangka aplikasi, dialog bantuan dan panel guru.
- style.css — visual isometrik, animasi, responsif dan cetakan sijil.
- app.js — aliran misi, peta, lencana, audio, tetapan, panel guru dan sijil.
- recorder.js — rakaman, pelepasan mikrofon, Blob, ulang rakam dan muat turun.
- missions.js — lapan misi, 16 ujaran, petunjuk, contoh guru, URL audio serta pautan portal.
- assets/fonts/ — fon tempatan dan lesen.
- audio/README.md — pemetaan audio guru.
- netlify.toml dan _headers — konfigurasi hos statik Netlify.
- tests/smoke.cjs — ujian pelayar.
- VALIDATION.md — bukti pengujian dan batasan.

## Ujian

Dengan Python 3, Node.js, Playwright dan Chromium tersedia:

```sh
node a4-suara-jiran-cilik/tests/smoke.cjs
```

Skrip memulakan pelayan sementara pada port 8896. Tetapkan CHROMIUM_PATH jika binari bukan /usr/bin/chromium. Ujian menggunakan peranti mikrofon sintetik Chromium melalui API sebenar; bukan rakaman pertuturan manusia dan bukan pengesahan ketepatan isi respons. Penolakan kebenaran diuji secara berasingan dengan suntikan ralat. Semak mikrofon sebenar pada peranti sasaran sebelum penggunaan kelas.

Ujian tambahan audio dan susun atur (mulakan pelayan HTTP dahulu):

```sh
A4_TEST_URL=http://127.0.0.1:8000/a4-suara-jiran-cilik/ node a4-suara-jiran-cilik/tests/audio-layout.cjs
```

Fail `tests/fixtures/audio-test.mp3` ialah nada sintetik tiga saat untuk pengujian media sahaja, bukan rakaman ujaran guru atau audio yang digunakan oleh permainan.
