# A2 — Detektif Dialog Harmoni

Permainan statik Bahasa Melayu Tahun 4, SP 1.1.2. Buka dari kad A2 pada halaman utama atau `a2/index.html` melalui pelayan HTTP statik. Tiada build atau pemasangan dependency diperlukan. Contoh: dari akar projek, `python3 -m http.server 8000 --bind 127.0.0.1`.

## Kandungan dan markah

`data.js` mengandungi lapan dialog baharu yang digubal berdasarkan situasi pengguna, tiga soalan pemahaman bagi setiap unit, tiga pilihan bukti, satu soalan tujuan ujaran, jawapan dan penjelasan. Jumlah tepat: 8 × 5 = 40 soalan dinilai. Guru boleh menyemak bahasa dan merakam dua watak berdasarkan dialog ini sebelum penggunaan kelas.

Jawapan pertama sahaja dinilai, 20 markah bagi setiap soalan. Selepas dipilih, semua pilihan dikunci dan penerangan dipaparkan. Markah maksimum 100 setiap unit, 800 keseluruhan. 80–100 memberi 3 bintang, 60 memberi 2, 20–40 memberi 1 dan 0 tiada bintang. Ulang kaji mengekalkan jawapan dan markah asal. Panel guru menyediakan pemadaman kemajuan dengan pengesahan. Tiada akaun, pemarkahan awan atau penghantaran data murid.

## Rakaman guru

Laluan bagi fail pada hos:

- assets/audio/A2_U01_DIALOG.mp3
- assets/audio/A2_U02_DIALOG.mp3
- assets/audio/A2_U03_DIALOG.mp3
- assets/audio/A2_U04_DIALOG.mp3
- assets/audio/A2_U05_DIALOG.mp3
- assets/audio/A2_U06_DIALOG.mp3
- assets/audio/A2_U07_DIALOG.mp3
- assets/audio/A2_U08_DIALOG.mp3

Letakkan fail dalam folder itu atau tekan Panel guru dan pilih fail mengikut unit. MP3 dan WAV disokong. Muat naik disimpan dalam IndexedDB pelayar semasa sahaja; ia tidak memasukkan fail ke repositori atau menyediakan audio untuk peranti murid lain. Untuk perkongsian, letakkan fail pada laluan hos di atas. Gunakan suara Bahasa Melayu Malaysia standard yang berlainan mengikut watak. Rakaman belum dibekalkan bersama aplikasi.

MAIN AUDIO menyambung main balik, JEDA menjeda, DENGAR SEMULA bermula dari awal. Muat naik guru mengatasi laluan lalai. Jika MP3 tiada atau gagal, aplikasi hanya menawarkan bacaan automatik apabila dua suara berbeza berbahasa tepat ms-MY tersedia. Tiada fallback bahasa lain. Kualiti sebutan suara pelayar masih perlu disemak guru. Jika tiada suara yang sesuai, mesej jelas meminta rakaman; teks boleh dibuka untuk ulang kaji. Butang bunyi atas mematikan dialog serta kesan bunyi. Kesan Web Audio ringkas dimainkan dengan kelantangan rendah.

## Slot ilustrasi 3D

Ilustrasi watak/situasi/bukti 3D belum dijana. Aplikasi menggunakan slot bertanda jelas dengan ikon dan keterangan sementara, bukan mendakwa ilustrasi lengkap. Latar pembukaan menggunakan imej Agensi Detektif Jiran Harmoni yang dimuat naik pengguna, disimpan tanpa perubahan sebagai assets/images/agensi-detektif.png. Imej dipaparkan penuh tanpa lapisan warna lutsinar. Tambah gambar WebP pada laluan berikut, atau sunting laluan dalam data.js:

- assets/images/detektif-lelaki.webp — detektif 10 tahun, topi coklat, kaca pembesar.
- assets/images/detektif-perempuan.webp — detektif 10 tahun, tudung merah jambu, topi, papan catatan.
- assets/images/U01_SITUASI.webp hingga U08_SITUASI.webp — situasi dua watak mengikut dialog unit.
- assets/images/U01_BUKTI_1.webp, U01_BUKTI_2.webp, U01_BUKTI_3.webp — tiga pilihan Unit 1; ulang pola sehingga U08.

`data.js` menyenaraikan perbezaan fakta ketiga-tiga bukti setiap unit. Setiap gambar mesti memadani keterangan tersebut. Keterangan kekal tersedia supaya bukti tidak bergantung pada warna sahaja. Jangan letakkan jawapan tambahan yang bercanggah. Slot situasi digunakan semula pada papan kes. Sediakan gambar bukti nisbah 4:3 dan watak berlatar telus. Jangan gunakan imej rawak untuk menggantikan aset asal.

## Aksesibiliti dan simpanan

Butang asli menyokong Tab/Enter/Space, dialog guru dan bantuan menggunakan elemen dialog dengan Escape. Pilihan pengurangan animasi disimpan dan menghormati tetapan sistem. Tiada kelipan pantas. localStorage menyimpan markah, jawapan pertama, tahap dan tetapan. Jika simpanan ditolak, permainan masih boleh dijalankan dengan mesej amaran. Audio guru menggunakan IndexedDB; jika tidak tersedia, muat naik boleh dimainkan sepanjang sesi sahaja. Buka melalui hos HTTP untuk simpanan yang konsisten; pelayar mungkin mengehadkan simpanan bagi file:// atau mod peribadi.

Fon Fredoka dan Nunito dibekalkan secara tempatan (Fontsource 5.3.0, subset Latin) bersama lesen SIL OFL dalam assets/fonts. Tiada akses Google Fonts diperlukan bagi A2. Tiada kebergantungan Canva SDK. Bahagian D-UJARAN lain dikekalkan; hanya pautan kad A2 menuju permainan ini.

## Reka bentuk utama daripada laman utama A2.zip

Halaman utama kini menggunakan satu imej asal pengguna `assets/images/laman-utama-a2.png` tanpa menambah tulisan yang kelihatan. Kawasan lapan fail, Mulakan Penyiasatan, Cara Bermain, Bunyi dan Animasi dipadankan dengan butang HTML telus berlabel aria untuk papan kekunci/pembaca skrin. Peti Maklumat membuka panel guru. Papan D-UJARAN di kiri atas kembali ke portal. Imej tidak disunting.

Setiap fail 1–8 terus membuka unit sedia ada yang sepadan. Gambar kecil setiap fail digunakan semula sebagai situasi unit melalui pemotongan paparan CSS (medan cover dalam data.js), bukan imej baharu. Imej 24 pilihan bukti berasingan belum dibekalkan. Pada skrin kecil, ilustrasi boleh ditatal secara mendatar supaya kawasan tekan tidak menjadi terlalu kecil. Markah masih dipaparkan dalam unit/laporan dan disimpan seperti sebelumnya. Garis hijau pada fail menunjukkan kes selesai; bintang dalam gambar asal ialah hiasan statik, markah/bintang sebenar dirujuk pada laporan.

## Rakaman Unit 1 telah dipasang

A2_U01_DIALOG.mp3 kini tersedia pada hos projek. Tiga rakaman pengguna digabungkan mengikut Aina → Pak Rahman → Aina dengan jeda 0.6 saat. Unit 1 tidak memerlukan muat naik melalui panel guru. Jika pelayar mempunyai muat naik Unit 1 lama, buang muat naik itu dalam panel guru untuk menggunakan fail projek terkini. Unit 2–8 masih menunggu rakaman.
