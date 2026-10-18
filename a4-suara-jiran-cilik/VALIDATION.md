# Bukti pengesahan A4

## Ujian yang lulus

- Membaca fail A4 penuh daripada origin/main. Lapan tajuk, situasi, ujaran utama/susulan, petunjuk, contoh guru dan lencana disalin tepat ke missions.js.
- 8 misi × 2 peringkat diuji hingga ganjaran. Semua peringkat menghasilkan Blob sebenar melalui MediaRecorder dalam Chromium dengan peranti mikrofon sintetik; API tidak diganti dengan Blob palsu.
- Setiap peringkat menghalang kemajuan sebelum rakaman selesai. Peringkat 2 turut memerlukan rakaman peringkat 1 dan tiga semakan kendiri.
- Dengar semula, rakam semula, muat turun audio dengan sambungan format sebenar, dan pelepasan semua trek mikrofon diuji.
- Penolakan kebenaran mikrofon diuji secara berasingan; mesej bantuan dipaparkan, tiada rakaman direka, kemajuan kekal disekat.
- Keluar ketika rakaman berjalan meminta pengesahan, membatalkan rakaman belum selesai dan melepaskan mikrofon.
- Misi dibuka berurutan, lencana diberikan, status lapan misi dipulihkan selepas reload. Blob audio tidak dipulihkan atau disimpan dalam localStorage.
- Panel guru: sunting ujaran, simpan setempat, tolak URL HTTP, main audio guru HTTPS melalui respons MP3 ujian dan sahkan aktiviti lisan secara berasingan tanpa mencipta Blob.
- Muzik latar dijana, disenyapkan semasa audio guru dimainkan atau rakaman berjalan, lalu disambung selepas audio tamat.
- Sijil terbuka selepas 8 misi; nama dan kelas diselitkan sebagai teks dengan escaping. PDF dijana melalui mod cetakan Chromium dan diperiksa dengan pdfinfo: tepat 1 halaman A4 landskap (841.92 × 594.96 pt).
- Butang PDF dan cetak memanggil cetakan pelayar sebenar. UI menerangkan pilihan Simpan sebagai PDF.
- Galeri lencana, bantuan, penilaian kendiri, tetapan bunyi/animasi serta pemadaman profil dengan pengesahan diuji.
- Paparan 1440, 768 dan 390px diperiksa; semua lapan kawasan misi berada dalam peta dan tiada butang terpotong. Peta boleh ditatal mendatar pada skrin kecil.
- Tiada ralat JavaScript tidak tertangkap dalam aliran ujian. Maklumat kurikulum yang dilarang tidak dipaparkan pada UI.
- Semua perubahan terhad kepada folder a4-suara-jiran-cilik. index.html portal, A4 asal, A2, audio lama, aset dan dokumen lain tidak diubah.

## Had yang perlu diketahui

Mikrofon fizikal, pelayar Safari/iOS dan peranti tablet sebenar belum diuji. Ujian Chromium menggunakan peranti sintetik untuk mengesahkan rakaman, bukan untuk menilai sebutan manusia. Ketersediaan suara ms-MY bergantung pada peranti; rakaman MP3 ujaran guru belum dibekalkan. Tiada penilaian pertuturan automatik, backend, akaun atau penyelarasan data antara peranti. Panel guru tidak mempunyai pengesahan pentadbir.

Sijil PDF menggunakan cetakan pelayar sebagai alternatif yang dinyatakan dalam arahan, bukan penjana PDF tersembunyi. Projek telah diuji melalui HTTP localhost; penerbitan Netlify sebenar belum dilakukan. Muzik dijana melalui Web Audio dan bermula selepas interaksi pengguna.

Cabang pembangunan disediakan untuk semakan PR. Tiada penggabungan automatik ke main.
