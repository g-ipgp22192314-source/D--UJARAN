# A4 – Suara Jiran Cilik

Versi statik daripada kod Canva guru. Gambar a4.png asal digunakan tanpa suntingan pada semua paparan.

## Terbit di Netlify
1. Ekstrak ZIP A4-Netlify.zip.
2. Buka https://app.netlify.com/drop dan seret folder yang mengandungi index.html.
3. Buka pautan HTTPS Netlify terus dalam Chrome, Edge atau Safari terkini. Tekan MULA RAKAM, kemudian Benarkan mikrofon. Jangan buka dalam iframe Canva.

Tiada pemasangan atau arahan build diperlukan. Semua fon, ikon, CSS, gambar dan audio Peringkat 1 disertakan.

## Audio ujaran
Audio Peringkat 1 untuk lapan misi disertakan daripada fail guru. Audio Peringkat 2 belum diberikan. Panel guru membolehkan guru membaca teks dan memuat naik MP3/WAV/M4A atau pautan HTTPS. Muat naik panel hanya disimpan pada pelayar berkenaan. Untuk semua murid, tambahkan fail Peringkat 2 ke folder audio, kemudian tambah entri kind: bundled dalam bundledAudio di app.js dan terbit semula.

## Rakaman murid
Rakaman menggunakan getUserMedia dan MediaRecorder sebenar; bukan penilaian AI. Setiap peringkat memerlukan rakaman dan semakan murid. Berhenti memuktamadkan audio, Dengar Rakaman memainkan semula, Rakam Semula meminta pengesahan, Muat Turun menyimpan fail format asli pelayar (WebM, M4A atau Ogg). Had satu rakaman 120 saat. Rakaman tidak dihantar ke pelayan dan hilang apabila tab dimuat semula atau ditutup; muat turun sebelum keluar. Kemajuan dan nama disimpan dalam localStorage pada peranti tersebut. Mula Semula memadam kemajuan dan rakaman murid semasa.

## Pembangun
Jalankan python3 -m http.server 8094 dari folder ini untuk semakan tempatan (localhost dipercayai pelayar); produksi mesti HTTPS. Tailwind 3.4.17 dan Lucide 0.577.0 dibundel setempat. Kod asal Canva dikekalkan dalam susun atur dan kandungan; SDK proprietari Canva dibuang kerana tidak diperlukan pada hosting statik.
