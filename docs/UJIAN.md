# Keputusan ujian pemindahan

Ujian dijalankan pada index.html melalui pelayan HTTP tempatan menggunakan Chromium.

Lulus:
- HTTP 200, tajuk aplikasi dan 10 kad aktiviti.
- 14 butang berasaskan CONFIG hadir; semua 12 butang tanpa URL memaparkan dialog asal.
- Dialog maklumat, Escape dan pemulihan fokus.
- Kawalan muzik/kesan bunyi menukar status ON (audio sebenar belum dilaksanakan).
- Navigasi #mod dan #video.
- Susun atur 3/2/1 lajur pada 1440/768/390px; tiada limpahan mendatar.
- Tiada ralat JavaScript tidak tertangkap atau respons HTTP 404 selepas pembersihan import.
- Kandungan dan atribut body serta JavaScript fungsi sama dengan sumber asal.
- Sandaran asal disahkan sama bait demi bait.

Belum lulus atau belum disahkan:
- Dua imej canva:// gagal kerana skema tidak disokong; menunggu aset asal.
- 20 medan teks templat kosong dalam sumber asal.
- Google Fonts gagal melalui proksi ujian; padanan fon Canva belum disahkan.
- Dua butang Puzzle membuka tab tetapi destinasi disekat proksi. Ujian audit terdahulu untuk pautan Drive juga disekat proksi; main balik video belum disahkan.
- Aktiviti rakaman, latihan, audio dan markah tidak tersedia dalam portal asal.

Tiada penerbitan atau pengesahan pemulihan pada tugas cloud baharu dilakukan.

## Ujian selepas menerima imej utama

Imej utama PNG 1692×930 berjaya dimuatkan daripada assets/images/taman-harmoni.png pada viewport 1440, 768 dan 390px. Dialog Maklumat produk dan Escape masih berfungsi. Fail imej disalin tanpa perubahan.

Semakan visual desktop menunjukkan CSS asal object-fit:cover memotong sebahagian imej dan kotak penerangan menutupi sebahagian tajuk grafik. Pemindahan aset berjaya, tetapi padanan susun atur kepada tangkapan skrin Canva masih memerlukan pembetulan kedudukan dan saiz hero. Belum mendakwa padanan visual lengkap. Poster dan latar bahagian video masih menunggu aset.

## Ujian selepas menerima jom kenali.zip

Latar 1942×809 dan poster 1591×989 berjaya didekod pada 1440/768/390px. Bingkai bermula 400/232/180px dari atas seksyen, di bawah tajuk grafik. Tiada limpahan mendatar atau ralat JavaScript. URL video Google Drive kekal sama. Main balik pada Google Drive belum disahkan; ujian ini mengesahkan pemuatan aset tempatan dan pautan sahaja. Poster berbeza daripada rujukan Canva terdahulu, seperti direkod dalam manifest.
