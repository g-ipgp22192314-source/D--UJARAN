# Laporan pengesahan A2

## Disahkan melalui ujian Chromium

- Pembukaan → papan lapan fail → setiap unit → empat cabaran → laporan → ulang kaji/pilih fail lain.
- Tepat 8 unit, 3 soalan pemahaman + 1 bukti + 1 tujuan ujaran setiap unit: 40 soalan.
- Semua 40 soalan dilalui dalam ujian; jawapan betul dan salah diuji.
- Unit 1 hingga 8 diuji dengan skor 0, 20, 40, 60, 80, 100, 100 dan 100.
- Bintang masing-masing 0, 1, 1, 2, 3, 3, 3 dan 3. Jumlah 500/800 dan 8/8 selesai kekal selepas reload.
- Pilihan dikunci selepas jawapan pertama. Menekan pilihan sekali lagi atau mengulang kaji tidak menambah markah.
- Mesej audio hilang dipaparkan. Tiada suara Indonesia/Inggeris dipilih secara automatik.
- Fail WAV ujian tiga saat dimuat naik melalui panel guru: main, jeda, sambung, ulang dari awal dan mute disahkan. Muat naik dipulihkan daripada IndexedDB selepas reload.
- Fail WAV ialah nada ujian, bukan dialog guru. Ia tidak disimpan dalam aplikasi yang dihantar.
- Teks dialog, bantuan dan penutupan dialog dengan Escape diuji.
- Pengurangan animasi dan paparan 1440/768/390px diperiksa; tiada limpahan mendatar.
- Fredoka dan Nunito setempat disahkan dimuatkan oleh document.fonts.
- Tiada ralat JavaScript tidak tertangkap dalam aliran ujian.
- Kesemua 10 kad portal masih hadir. Kedua-dua pautan A1 kekal. Perbandingan bait menunjukkan hanya pautan kad A2 di index.html berubah; fail lain di luar A2 tidak diubah.

Jalankan semula dengan Node.js, Playwright dan Chromium tersedia:

```sh
node a2/tests/smoke.cjs
```

Ujian memulakan pelayan Python sementara pada port 8879 dan menutupnya selepas selesai. Tetapkan CHROMIUM_PATH jika binari Chromium bukan /usr/bin/chromium. Tiada pemasangan dependency runtime diperlukan untuk permainan itu sendiri.

## Had yang masih jelas

Ilustrasi 3D baharu dan lapan rakaman MP3 Bahasa Melayu Malaysia belum dibekalkan. Slot visual mempunyai ikon/keterangan fakta sementara, jadi tugas memilih ilustrasi sebenar belum boleh dinilai sepenuhnya secara visual. Dua suara ms-MY bergantung pada pelayar/peranti; persekitaran ujian tidak menyediakan pengesahan sebutan manusia. Guru perlu menyemak kandungan dan rakaman sebelum penggunaan kelas. Ujian pelayar tidak menggantikan semakan pedagogi atau percubaan bersama murid.

Tiada penerbitan laman, push GitHub atau pengujian peranti fizikal dilakukan. Permainan boleh dihos sebagai laman statik bersama projek sedia ada.

Percubaan membuka melalui file:// dalam Chromium cloud disekat oleh polisi pentadbir pelayar. Pembukaan fail setempat tidak disahkan dalam mesin ini; semua aliran permainan disahkan melalui HTTP.

Semakan tambahan: pembatalan audio semasa kembali ke papan kes tidak menghasilkan ralat JavaScript. Pilihan maksud ujaran disunting supaya panjang pilihan lebih seimbang; indeks jawapan kekal.

## Kemas kini latar agensi A2

Imej PNG asal pengguna 1672×941 disalin tanpa perubahan kepada assets/images/agensi-detektif.png. Ujian pada lebar 1440, 768 dan 390px mengesahkan pemuatan imej, opacity 1, filter none, tiada gradient atau pseudo-element yang menutupi latar, dan tiada limpahan mendatar. Imej dipaparkan mengikut nisbah asal. Pada tablet/telefon, tajuk diletakkan selepas gambar untuk mengelakkan pertindihan. Bantuan, Escape, Mulakan Penyiasatan, lapan fail kes, soalan pertama dan kembali ke pembukaan diuji. Tiada ralat JavaScript. Markah, data soalan, audio dan bahagian portal lain tidak diubah.

## Halaman utama berdasarkan gambar lengkap pengguna

Sumber: laman utama A2.zip, mengandungi laman utama A2.png (1672×941). Fail disalin tanpa perubahan ke assets/images/laman-utama-a2.png. Tiada tulisan HTML kelihatan ditambah pada halaman utama (body.innerText kosong semasa tiada dialog). Kawasan klik pada gambar dipadankan dengan semua lapan unit; setiap unit diuji untuk nombor kes yang betul. Gambar kecil setiap fail digunakan semula melalui paparan CSS pada unit sepadan. Tiada imej baharu dijana.

Butang Mulakan Penyiasatan memfokuskan fail pertama; fail lain bebas dipilih. Cara Bermain, Escape, Bunyi, Animasi dan Peti Maklumat/Panel Guru diuji. Pada telefon/tablet, ilustrasi boleh ditatal mendatar dalam bingkai tanpa menyebabkan limpahan halaman. Kawasan klik kekal sepadan selepas tatal. Label aria menyediakan nama butang tanpa tulisan tambahan pada imej. Bintang yang terkandung dalam imej ialah grafik; ganjaran sebenar kekal pada laporan unit.

## Audio sebenar Unit 1

Tiga rakaman pengguna digabungkan dalam turutan Aina, Pak Rahman, Aina dengan jeda 0.6 saat antara giliran. FFmpeg mengesahkan semua sumber dan output boleh didekod tanpa ralat. Tempoh MP3 kira-kira 24.67 saat (pelayar melaporkan kandungan audio 24.62 saat).

Ujian Chromium melalui HTTP dengan fail A2_U01_DIALOG.mp3 sebenar mengesahkan main, jeda (masa kekal), sambung, ulang dari awal, pengesanan tamat dan berhenti apabila kembali ke papan kes. Tiada ralat JavaScript. Ujian ini mengesahkan fungsi media, bukan semakan manusia terhadap sebutan atau ketepatan kandungan rakaman. Ujian fail hilang dalam suite dialihkan ke Unit 2 kerana audio Unit 1 kini tersedia.

## Latar bilik penyiasatan

Semua lapan fail kes diuji: latar latar-fail-kes.png digunakan, nombor unit sepadan, dan tiga soalan pemahaman masih tersedia. Kembali ke halaman utama memulihkan paparan gambar utama tanpa latar bilik. Laporan keputusan turut menggunakan latar bilik. Paparan 1440/768/390px diperiksa tanpa limpahan mendatar. Tiada ralat JavaScript. Imej disahkan sama bait demi bait dengan PNG dalam arkib pengguna. Logik soalan, jawapan, markah dan audio tidak diubah.
