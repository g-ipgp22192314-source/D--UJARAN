# Pemindahan D-UJARAN daripada Canva

## Menjalankan aplikasi

Dari `/workspace/D--UJARAN`:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Tiada pemasangan npm, proses binaan, pangkalan data atau kunci API diperlukan. Gunakan pelayan HTTP statik untuk pembangunan dan hos statik untuk penerbitan.

## Perubahan yang dibuat

- Kod asal disimpan tanpa perubahan dalam `docs/original/D-UJARAN-CANVA-BACKUP.txt`.
- `index.html` menggunakan HTML, CSS dan JavaScript asal.
- Empat skrip SDK Canva yang tidak disertakan serta metadata bootstrap Canva dikeluarkan daripada salinan web.
- Import Lucide yang tidak digunakan dan Tailwind CDN dikeluarkan. Satu kelas utiliti `mt-4` yang digunakan digantikan dengan CSS tempatan `margin-top:1rem`.
- Warna, gaya sebaris, susun atur, teks, SVG, emoji, animasi dan logik aktiviti asal dikekalkan.

## Keperluan yang belum tersedia

1. Dua imej asal: lihat `assets/canva-assets.json`. Rujukan `canva://` masih dikekalkan sehingga fail sebenar diperoleh; gambar belum boleh dipaparkan di luar Canva.
2. Terdapat 20 medan teks templat kosong dalam sumber asal. Dapatkan teks tepat daripada versi Canva; jangan mereka kandungan.
3. Sepuluh nilai URL dalam `CONFIG` kosong: dua halaman mod dan lapan aktiviti. Empat butang mod dan lapan butang aktiviti memaparkan dialog asal sehingga URL sebenar diberikan.
4. Kedua-dua butang Puzzle menggunakan pautan Canva yang sama. Video menggunakan pautan Google Drive asal. Semak akses awam dan kandungan pada rangkaian yang membenarkannya; akses dari persekitaran audit disekat proksi.
5. Muzik dan kesan bunyi hanya menukar status. Tiada fail audio atau fungsi main audio. Rakaman suara, markah dan latihan disebut dalam kad tetapi tidak dilaksanakan dalam portal ini. Tentukan halaman aktiviti sebenar sebelum menambah fungsi.
6. DM Sans dan Fraunces masih dimuatkan daripada Google Fonts. Persekitaran audit menyekat akses. Untuk paparan setara atau luar talian, dapatkan fail fon sah yang sama serta lesen dan hos tempatan; jangan ganti fon secara senyap.
7. Tiada imej latar seksyen tambahan dalam sumber ini. Jika versi Canva memilikinya, dapatkan aset asal dan rujukan paparan sebelum pemulihan.

## Urutan kerja seterusnya

1. Terima aset, teks dan pautan sebenar.
2. Padankan aset dengan manifest dan ubah hanya laluan yang telah disahkan.
3. Isi URL HTTPS yang telah disahkan dalam `CONFIG`.
4. Bandingkan paparan dengan Canva pada desktop dan telefon.
5. Uji kedua-dua mod, video, aktiviti dan akses papan kekunci. Tambah audio/rakaman/markah hanya berdasarkan keperluan yang dipersetujui dan bahan sebenar.

Jangan anggap pemindahan aset telah lengkap sehingga imej, fon dan teks asal disahkan.

## Pengesahan pengguna dan rujukan visual

Pengguna mengesahkan pautan induksi yang sama untuk A1 dan B1:
https://pbsemsatutahunduapismp.my.canva.site/induksi-d-ujaran

Pengguna mengesahkan pautan video pengenalan:
https://drive.google.com/file/d/10nyyLMpFqj37PHXh5Ak03vNrZy4OhJ_L/view?usp=sharing

Kedua-dua pautan sudah sepadan dengan kod; tiada perubahan URL diperlukan. Pengesahan pengguna bukan pengesahan capaian atau main balik dari persekitaran ujian.

Dua tangkapan skrin Canva menunjukkan:
- Tajuk Selamat Datang, nama D-UJARAN, Dengar/Faham/Bertutur dan slogan Jiran Sepakat Membawa Berkat kelihatan sebagai sebahagian grafik utama. Medan teks HTML yang kosong mungkin disengajakan untuk mengelakkan pertindihan; jangan isi tanpa menyemak aset asal.
- Bahagian video mempunyai latar taman dengan tajuk Jom Kenali D-UJARAN, selain poster bilik darjah. Latar video itu tidak terkandung sebagai URL imej dalam kod yang diterima dan perlu diperoleh berasingan.
- Tangkapan skrin mengandungi butang, teks dan bingkai laman. Jangan gunakan keseluruhan tangkapan skrin sebagai latar kerana elemen UI akan berganda.

Diperlukan: fail imej latar utama tanpa lapisan UI laman, latar bahagian video tanpa bingkai pemain/butang, dan poster bilik darjah asal. Tangkapan skrin menjadi rujukan visual; belum disalin sebagai aset aplikasi.

## Kemas kini imej utama

`halaman utama.png` daripada arkib pengguna telah disalin tanpa pengubahsuaian kepada `assets/images/taman-harmoni.png` dan dipautkan dalam `index.html`. Tetapan paparan asal dikekalkan. Poster video dan latar bahagian video masih belum diterima.

## Kemas kini latar video dan poster

Dua fail daripada `jom kenali.zip` diterima dan disalin tanpa perubahan: `assets/images/jom-kenali.png` dan `assets/images/poster-pengenalan.png`. Latar dipaparkan mengikut lebar seksyen dan bingkai diletakkan di bawah tajuk grafik. Poster pengguna ialah bilik darjah dengan papan hitam, berbeza daripada rujukan terdahulu yang mempunyai guru dan logo; tiada unsur tambahan direka. Atribut alt dikemas kini mengikut kandungan sebenar. Pautan Google Drive asal dikekalkan. Semua rujukan imej canva:// dalam aplikasi telah diganti dengan aset tempatan.
