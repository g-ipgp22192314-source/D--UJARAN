## Perubahan

Tambah permainan A4 – Suara Jiran Cilik dalam folder baharu `a4-suara-jiran-cilik`, berdasarkan keseluruhan fail arahan `A4`. Murid meneroka peta isometrik, menyelesaikan 8 misi berurutan dengan 2 peringkat rakaman setiap misi, menilai pertuturan sendiri, memperoleh lencana dan membuka sijil digital.

Rakaman menggunakan getUserMedia dan MediaRecorder sebenar: mula/henti, main semula, rakam semula, muat turun format yang disokong dan pelepasan mikrofon. Kemajuan disekat sehingga rakaman selesai; pilihan aktiviti lisan yang disahkan guru dilabel secara berasingan. Audio tidak dimuat naik ke pelayan. Panel guru menyokong suntingan kandungan dan URL MP3 HTTPS, dengan fallback hanya kepada suara ms-MY.

Semua perubahan terhad kepada folder A4 baharu. Tiada perubahan pada fail arahan A4 asal, index.html portal, A2, aktiviti lain atau Mod B. Tiada penggabungan automatik ke main. Konfigurasi Netlify untuk penerbitan statik disertakan.

## Pengesahan

- Ujian Chromium melengkapkan semua 8 misi/16 peringkat menggunakan peranti mikrofon sintetik melalui API rakaman sebenar.
- Main semula, rakam semula, muat turun, pelepasan trek, penolakan kebenaran, pembatalan rakaman dan laluan lisan guru diuji.
- Pembukaan misi berurutan, simpanan kemajuan/lencana selepas reload dan suntingan guru diuji.
- Audio guru HTTPS dan muzik yang disenyapkan semasa audio/rakaman diuji.
- Sijil diperiksa sebagai satu halaman PDF A4 landskap, dengan nama dan kelas yang betul.
- Paparan 1440/768/390px diperiksa; semua butang peta berada dalam kawasan peta.

## Had

Rakaman ujaran guru belum dibekalkan; suara ms-MY bergantung pada pelayar. Tiada penilaian pertuturan automatik. Rakaman murid kekal sepanjang sesi sahaja dan perlu dimuat turun. Panel guru bukan kawasan pentadbir berautentikasi. PDF menggunakan cetakan pelayar (Simpan sebagai PDF). Mikrofon fizikal, Safari/iOS dan penerbitan Netlify sebenar belum diuji.

Panduan: `a4-suara-jiran-cilik/README.md`. Bukti ujian: `a4-suara-jiran-cilik/VALIDATION.md`.
