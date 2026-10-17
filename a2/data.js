window.A2_UNITS = [
  {
    "id": 1,
    "title": "Misteri Si Comel Hilang!",
    "characters": [
      "Aina",
      "Pak Rahman"
    ],
    "dialog": [
      {
        "speaker": "Aina",
        "text": "Pak Rahman, adakah pak cik nampak kucing saya? Namanya Si Comel. Bulunya putih bertompok oren dan dia memakai kolar biru."
      },
      {
        "speaker": "Pak Rahman",
        "text": "Tadi pak cik nampak seekor kucing begitu berhampiran bangku taman, di bawah pokok besar."
      },
      {
        "speaker": "Aina",
        "text": "Terima kasih, pak cik. Saya akan mencarinya di situ bersama ibu."
      }
    ],
    "audio": "assets/audio/A2_U01_DIALOG.mp3",
    "scene": "assets/images/U01_SITUASI.webp",
    "questions": [
      {
        "prompt": "Siapakah yang sedang mencari Si Comel?",
        "options": [
          "Aina",
          "Mei Xin",
          "Amir",
          "Hakim"
        ],
        "correct": 0,
        "explanation": "Aina bertanya tentang kucingnya yang hilang."
      },
      {
        "prompt": "Apakah warna kolar Si Comel?",
        "options": [
          "Merah",
          "Biru",
          "Hijau",
          "Kuning"
        ],
        "correct": 1,
        "explanation": "Aina menyebut bahawa Si Comel memakai kolar biru."
      },
      {
        "prompt": "Di manakah Pak Rahman melihat kucing itu?",
        "options": [
          "Di dalam dewan",
          "Di tepi kedai",
          "Berhampiran bangku taman",
          "Di bawah meja"
        ],
        "correct": 2,
        "explanation": "Pak Rahman melihatnya berhampiran bangku taman, di bawah pokok besar."
      }
    ],
    "evidence": [
      {
        "icon": "🐈",
        "label": "Kucing putih bertompok oren, berkolar biru, di bangku taman.",
        "image": "assets/images/U01_BUKTI_1.webp"
      },
      {
        "icon": "🐈‍⬛",
        "label": "Kucing hitam, berkolar merah, di bangku taman.",
        "image": "assets/images/U01_BUKTI_2.webp"
      },
      {
        "icon": "🐈",
        "label": "Kucing putih bertompok oren, berkolar hijau, di dalam rumah.",
        "image": "assets/images/U01_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 0,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Mengapakah Aina bertanya kepada Pak Rahman?",
      "options": [
        "Untuk mengajak pak cik bermain di taman",
        "Untuk membeli makanan bagi kucingnya",
        "Untuk meminjam bakul daripada pak cik",
        "Untuk mengetahui tempat kucingnya dilihat"
      ],
      "correct": 3,
      "explanation": "Aina ingin mendapatkan maklumat untuk mencari Si Comel yang hilang."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 163,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-01.png"
  },
  {
    "id": 2,
    "title": "Bungkusan Misteri di Pagar!",
    "characters": [
      "Amir",
      "Encik Farid"
    ],
    "dialog": [
      {
        "speaker": "Amir",
        "text": "Encik Farid, bungkusan ini diletakkan di pagar rumah saya. Pada label tertulis nama Encik Farid dan nombor rumah 24. Adakah ini bungkusan encik?"
      },
      {
        "speaker": "Encik Farid",
        "text": "Ya, betul. Rumah saya nombor 24, di sebelah rumah kamu. Saya sedang menunggu bungkusan buku itu."
      },
      {
        "speaker": "Amir",
        "text": "Oh, mungkin penghantar tersalah letak. Saya mahu memastikan pemiliknya dahulu."
      }
    ],
    "audio": "assets/audio/A2_U02_DIALOG.mp3",
    "scene": "assets/images/U02_SITUASI.webp",
    "questions": [
      {
        "prompt": "Siapakah nama pada label bungkusan?",
        "options": [
          "Encik Lim",
          "Pak Rahman",
          "Encik Farid",
          "Abang Firdaus"
        ],
        "correct": 2,
        "explanation": "Label pada bungkusan menyatakan nama Encik Farid."
      },
      {
        "prompt": "Berapakah nombor rumah pada label?",
        "options": [
          "42",
          "24",
          "14",
          "12"
        ],
        "correct": 1,
        "explanation": "Amir membaca nombor rumah 24 pada label."
      },
      {
        "prompt": "Di manakah bungkusan itu mula-mula diletakkan?",
        "options": [
          "Di rak buku",
          "Di dalam dewan",
          "Di bangku taman",
          "Di pagar rumah Amir"
        ],
        "correct": 3,
        "explanation": "Amir memberitahu bahawa bungkusan diletakkan di pagar rumahnya."
      }
    ],
    "evidence": [
      {
        "icon": "📦",
        "label": "Label: Encik Farid · Rumah 42",
        "image": "assets/images/U02_BUKTI_1.webp"
      },
      {
        "icon": "📦",
        "label": "Label: Encik Farid · Rumah 24",
        "image": "assets/images/U02_BUKTI_2.webp"
      },
      {
        "icon": "📦",
        "label": "Label: Encik Lim · Rumah 24",
        "image": "assets/images/U02_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 1,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Apakah tujuan Amir bertanya tentang bungkusan itu?",
      "options": [
        "Untuk memastikan pemilik bungkusan tersebut",
        "Untuk mengajak jirannya membeli buku baharu",
        "Untuk meminta jirannya membuang bungkusan",
        "Untuk memaklumkan harga bungkusan tersebut"
      ],
      "correct": 0,
      "explanation": "Amir mahu mendapatkan kepastian tentang pemilik bungkusan yang tersalah dihantar."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 337,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-02.png"
  },
  {
    "id": 3,
    "title": "Basikal Rosak, Siapa Boleh Bantu?",
    "characters": [
      "Danish",
      "Abang Firdaus"
    ],
    "dialog": [
      {
        "speaker": "Danish",
        "text": "Abang Firdaus, tayar belakang basikal saya pancit semasa saya melalui taman. Bolehkah saya terus menunggangnya ke rumah?"
      },
      {
        "speaker": "Abang Firdaus",
        "text": "Jangan tunggang basikal yang pancit, Danish. Tuntun basikal kamu ke laluan pejalan kaki yang selamat dahulu. Abang akan membantu kamu membaikinya."
      },
      {
        "speaker": "Danish",
        "text": "Baiklah, abang. Saya akan menuntunnya ke situ supaya tidak menghalang jalan."
      }
    ],
    "audio": "assets/audio/A2_U03_DIALOG.mp3",
    "scene": "assets/images/U03_SITUASI.webp",
    "questions": [
      {
        "prompt": "Bahagian manakah yang pancit?",
        "options": [
          "Tayar hadapan",
          "Tayar belakang",
          "Tempat duduk",
          "Pemegang basikal"
        ],
        "correct": 1,
        "explanation": "Danish menyatakan bahawa tayar belakangnya pancit."
      },
      {
        "prompt": "Apakah yang perlu Danish lakukan dahulu?",
        "options": [
          "Menunggang lebih laju",
          "Meninggalkan basikal",
          "Menuntun basikal ke tempat selamat",
          "Bermain di tengah jalan"
        ],
        "correct": 2,
        "explanation": "Abang Firdaus menyuruh Danish menuntun basikal ke laluan pejalan kaki yang selamat."
      },
      {
        "prompt": "Siapakah yang menawarkan bantuan?",
        "options": [
          "Abang Firdaus",
          "Encik Farid",
          "Hakim",
          "Faris"
        ],
        "correct": 0,
        "explanation": "Abang Firdaus menawarkan diri untuk membantu membaiki basikal."
      }
    ],
    "evidence": [
      {
        "icon": "🚴",
        "label": "Danish menunggang laju di jalan dengan tayar pancit.",
        "image": "assets/images/U03_BUKTI_1.webp"
      },
      {
        "icon": "🚲",
        "label": "Danish meninggalkan basikal di tengah jalan.",
        "image": "assets/images/U03_BUKTI_2.webp"
      },
      {
        "icon": "🚶",
        "label": "Danish menuntun basikal pancit ke laluan selamat.",
        "image": "assets/images/U03_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 2,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Mengapakah Abang Firdaus memberikan nasihat itu?",
      "options": [
        "Supaya Danish dapat memenangi perlumbaan",
        "Supaya Danish memilih basikal yang baharu",
        "Supaya keselamatan Danish terus terjaga",
        "Supaya Danish dapat bermain lebih lama"
      ],
      "correct": 2,
      "explanation": "Nasihat itu bertujuan menjaga keselamatan Danish dan pengguna jalan."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 506,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-03.png"
  },
  {
    "id": 4,
    "title": "Jiran Baharu, Sahabat Baharu!",
    "characters": [
      "Sofea",
      "Mei Xin"
    ],
    "dialog": [
      {
        "speaker": "Sofea",
        "text": "Hai, saya Sofea. Kamu baru berpindah ke rumah di hujung jalan ini, bukan?"
      },
      {
        "speaker": "Mei Xin",
        "text": "Ya, saya Mei Xin. Kami berpindah semalam. Saya belum mengenali kawasan ini."
      },
      {
        "speaker": "Sofea",
        "text": "Selamat datang! Di sebelah dewan ada taman permainan. Perpustakaan mini pula terletak di belakang dewan. Saya boleh menunjukkan kedua-dua tempat itu."
      },
      {
        "speaker": "Mei Xin",
        "text": "Terima kasih, Sofea. Gembira dapat berkenalan dengan kamu."
      }
    ],
    "audio": "assets/audio/A2_U04_DIALOG.mp3",
    "scene": "assets/images/U04_SITUASI.webp",
    "questions": [
      {
        "prompt": "Siapakah jiran yang baharu berpindah?",
        "options": [
          "Aina",
          "Sofea",
          "Kak Nisha",
          "Mei Xin"
        ],
        "correct": 3,
        "explanation": "Mei Xin baru berpindah ke kawasan kejiranan itu."
      },
      {
        "prompt": "Bilakah Mei Xin berpindah?",
        "options": [
          "Semalam",
          "Minggu hadapan",
          "Pagi esok",
          "Bulan hadapan"
        ],
        "correct": 0,
        "explanation": "Mei Xin menyatakan bahawa keluarganya berpindah semalam."
      },
      {
        "prompt": "Di manakah perpustakaan mini terletak?",
        "options": [
          "Di hadapan kedai",
          "Di belakang dewan",
          "Di sebelah sungai",
          "Di hujung padang"
        ],
        "correct": 1,
        "explanation": "Sofea menyebut perpustakaan mini terletak di belakang dewan."
      }
    ],
    "evidence": [
      {
        "icon": "👭",
        "label": "Sofea menunjukkan taman permainan dan perpustakaan mini kepada Mei Xin.",
        "image": "assets/images/U04_BUKTI_1.webp"
      },
      {
        "icon": "👭",
        "label": "Sofea menunjukkan pasar raya dan stesen bas kepada Mei Xin.",
        "image": "assets/images/U04_BUKTI_2.webp"
      },
      {
        "icon": "👭",
        "label": "Mei Xin mengajak Sofea mencari kucing di taman.",
        "image": "assets/images/U04_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 0,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Apakah tujuan Sofea berbual dengan Mei Xin?",
      "options": [
        "Untuk meminjam buku sekolah daripada Mei Xin",
        "Untuk berkenalan dan memperkenalkan kawasan",
        "Untuk mengajak Mei Xin menyertai perlumbaan",
        "Untuk bertanya tentang aktiviti di sekolah"
      ],
      "correct": 1,
      "explanation": "Sofea ingin berkenalan dan membantu jiran baharu mengenali kawasan kejiranan."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 684,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-04.png"
  },
  {
    "id": 5,
    "title": "Rahsia Rak Buku Komuniti!",
    "characters": [
      "Hakim",
      "Puan Devi"
    ],
    "dialog": [
      {
        "speaker": "Hakim",
        "text": "Puan Devi, bolehkah saya meminjam buku cerita dari rak buku komuniti ini?"
      },
      {
        "speaker": "Puan Devi",
        "text": "Boleh, Hakim. Catat nama kamu dan tajuk buku dalam buku rekod di atas meja. Pulangkan buku dalam masa tujuh hari dan jagalah kebersihannya."
      },
      {
        "speaker": "Hakim",
        "text": "Baik, puan. Saya akan mencatat maklumat itu sebelum membawa buku pulang."
      }
    ],
    "audio": "assets/audio/A2_U05_DIALOG.mp3",
    "scene": "assets/images/U05_SITUASI.webp",
    "questions": [
      {
        "prompt": "Apakah yang mahu dipinjam oleh Hakim?",
        "options": [
          "Buku rekod",
          "Buku cerita",
          "Buku latihan",
          "Buku resipi"
        ],
        "correct": 1,
        "explanation": "Hakim mahu meminjam buku cerita dari rak buku komuniti."
      },
      {
        "prompt": "Apakah yang perlu dicatat dalam buku rekod?",
        "options": [
          "Nama dan tajuk buku",
          "Alamat dan warna beg",
          "Umur dan nama sekolah",
          "Tarikh lahir dan hobi"
        ],
        "correct": 0,
        "explanation": "Puan Devi meminta Hakim mencatat nama dan tajuk buku."
      },
      {
        "prompt": "Bilakah buku perlu dipulangkan?",
        "options": [
          "Selepas sebulan",
          "Dalam masa dua hari",
          "Pada tahun hadapan",
          "Dalam masa tujuh hari"
        ],
        "correct": 3,
        "explanation": "Tempoh peminjaman yang disebut ialah tujuh hari."
      }
    ],
    "evidence": [
      {
        "icon": "📚",
        "label": "Hakim terus membawa buku pulang tanpa mencatat.",
        "image": "assets/images/U05_BUKTI_1.webp"
      },
      {
        "icon": "📝",
        "label": "Hakim mencatat nama dan tajuk buku dalam buku rekod.",
        "image": "assets/images/U05_BUKTI_2.webp"
      },
      {
        "icon": "📝",
        "label": "Hakim menulis pada kulit buku cerita yang dipinjam.",
        "image": "assets/images/U05_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 1,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Mengapakah Puan Devi menerangkan langkah peminjaman?",
      "options": [
        "Supaya penduduk membeli buku untuk diri sendiri",
        "Supaya penduduk menutup rak selepas waktu rehat",
        "Supaya penduduk menukar tajuk buku yang dibaca",
        "Supaya penduduk memahami peraturan pinjaman"
      ],
      "correct": 3,
      "explanation": "Penerangan itu membantu penduduk memahami dan mengikuti peraturan peminjaman buku."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 861,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-05.png"
  },
  {
    "id": 6,
    "title": "Paip Bocor, Air Mengalir!",
    "characters": [
      "Sara",
      "Encik Lim"
    ],
    "dialog": [
      {
        "speaker": "Sara",
        "text": "Encik Lim, air mengalir keluar dari paip berhampiran pagar dewan komuniti. Laluan di situ sudah basah."
      },
      {
        "speaker": "Encik Lim",
        "text": "Terima kasih kerana memberitahu, Sara. Jangan berjalan di laluan itu kerana licin. Gunakan laluan sebelah taman. Saya akan menghubungi tukang paip."
      },
      {
        "speaker": "Sara",
        "text": "Baik, encik. Saya akan memberitahu rakan-rakan supaya berhati-hati."
      }
    ],
    "audio": "assets/audio/A2_U06_DIALOG.mp3",
    "scene": "assets/images/U06_SITUASI.webp",
    "questions": [
      {
        "prompt": "Di manakah paip yang bocor itu?",
        "options": [
          "Di dalam kedai",
          "Di belakang rumah",
          "Berhampiran pagar dewan komuniti",
          "Di tepi padang sekolah"
        ],
        "correct": 2,
        "explanation": "Sara menyebut paip berhampiran pagar dewan komuniti."
      },
      {
        "prompt": "Mengapakah laluan itu perlu dielakkan?",
        "options": [
          "Kerana laluan itu licin",
          "Kerana laluan itu terlalu jauh",
          "Kerana terdapat pertandingan",
          "Kerana laluan itu terlalu gelap"
        ],
        "correct": 0,
        "explanation": "Air menyebabkan laluan basah dan licin."
      },
      {
        "prompt": "Siapakah yang akan dihubungi oleh Encik Lim?",
        "options": [
          "Penghantar bungkusan",
          "Penjual buku",
          "Pengawal sekolah",
          "Tukang paip"
        ],
        "correct": 3,
        "explanation": "Encik Lim akan menghubungi tukang paip untuk menyelesaikan kebocoran."
      }
    ],
    "evidence": [
      {
        "icon": "🚰",
        "label": "Paip bocor di dalam dapur rumah.",
        "image": "assets/images/U06_BUKTI_1.webp"
      },
      {
        "icon": "🚰",
        "label": "Paip elok di pagar dewan; laluan kering.",
        "image": "assets/images/U06_BUKTI_2.webp"
      },
      {
        "icon": "💧",
        "label": "Paip bocor berhampiran pagar dewan; laluan basah.",
        "image": "assets/images/U06_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 2,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Apakah tujuan nasihat Encik Lim?",
      "options": [
        "Mengelakkan kemalangan pada laluan yang licin",
        "Mengajak Sara membantu menyiram pokok bunga",
        "Mengingatkan Sara tentang waktu buka dewan",
        "Memberitahu Sara tempat membeli paip baharu"
      ],
      "correct": 0,
      "explanation": "Encik Lim mahu mengelakkan kemalangan akibat laluan yang licin."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 1036,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-06.png"
  },
  {
    "id": 7,
    "title": "Heboh Hari Sukan Kejiranan!",
    "characters": [
      "Ravi",
      "Kak Nisha"
    ],
    "dialog": [
      {
        "speaker": "Ravi",
        "text": "Kak Nisha, saya nampak poster Hari Sukan Kejiranan. Bilakah acara itu diadakan?"
      },
      {
        "speaker": "Kak Nisha",
        "text": "Acara itu diadakan pada hari Sabtu, pukul lapan pagi, di padang komuniti. Bawa botol air sendiri dan pakai kasut sukan."
      },
      {
        "speaker": "Ravi",
        "text": "Baik, kak. Saya akan memberitahu keluarga tentang masa dan tempat acara itu."
      }
    ],
    "audio": "assets/audio/A2_U07_DIALOG.mp3",
    "scene": "assets/images/U07_SITUASI.webp",
    "questions": [
      {
        "prompt": "Pada hari apakah acara itu diadakan?",
        "options": [
          "Ahad",
          "Sabtu",
          "Jumaat",
          "Isnin"
        ],
        "correct": 1,
        "explanation": "Kak Nisha menyatakan acara diadakan pada hari Sabtu."
      },
      {
        "prompt": "Pukul berapakah acara bermula?",
        "options": [
          "Lapan malam",
          "Sepuluh pagi",
          "Lapan pagi",
          "Enam petang"
        ],
        "correct": 2,
        "explanation": "Acara bermula pada pukul lapan pagi."
      },
      {
        "prompt": "Di manakah Hari Sukan Kejiranan berlangsung?",
        "options": [
          "Di padang komuniti",
          "Di taman permainan",
          "Di dewan sekolah",
          "Di perpustakaan mini"
        ],
        "correct": 0,
        "explanation": "Tempat acara ialah padang komuniti."
      }
    ],
    "evidence": [
      {
        "icon": "🏅",
        "label": "Hari Sukan Kejiranan · Sabtu · 8.00 pagi · Padang komuniti",
        "image": "assets/images/U07_BUKTI_1.webp"
      },
      {
        "icon": "🏅",
        "label": "Hari Sukan Kejiranan · Ahad · 8.00 pagi · Padang komuniti",
        "image": "assets/images/U07_BUKTI_2.webp"
      },
      {
        "icon": "🏅",
        "label": "Hari Sukan Kejiranan · Sabtu · 8.00 malam · Dewan komuniti",
        "image": "assets/images/U07_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 0,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Apakah tujuan penerangan Kak Nisha?",
      "options": [
        "Untuk mengumumkan keputusan acara hari sukan",
        "Untuk mengajak Ravi membeli kasut yang sama",
        "Untuk menerangkan peraturan setiap acara",
        "Untuk memaklumkan butiran hari sukan itu"
      ],
      "correct": 3,
      "explanation": "Kak Nisha memaklumkan hari, masa, tempat dan persediaan untuk acara kejiranan."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 1205,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-07.png"
  },
  {
    "id": 8,
    "title": "Awas, Hujan Akan Turun!",
    "characters": [
      "Faris",
      "Puan Ramlah"
    ],
    "dialog": [
      {
        "speaker": "Faris",
        "text": "Puan Ramlah, awan sudah gelap dan angin bertiup kuat. Pakaian puan masih ada di ampaian."
      },
      {
        "speaker": "Puan Ramlah",
        "text": "Terima kasih, Faris. Saya sedang menyiram pokok dan tidak perasan perubahan cuaca."
      },
      {
        "speaker": "Faris",
        "text": "Lebih baik puan angkat pakaian sekarang sebelum hujan turun."
      },
      {
        "speaker": "Puan Ramlah",
        "text": "Baiklah, saya akan mengangkatnya sekarang."
      }
    ],
    "audio": "assets/audio/A2_U08_DIALOG.mp3",
    "scene": "assets/images/U08_SITUASI.webp",
    "questions": [
      {
        "prompt": "Apakah tanda hujan akan turun?",
        "options": [
          "Langit cerah dan panas",
          "Bintang kelihatan terang",
          "Awan gelap dan angin kuat",
          "Udara tenang tanpa awan"
        ],
        "correct": 2,
        "explanation": "Faris menyebut awan gelap dan angin yang bertiup kuat."
      },
      {
        "prompt": "Apakah yang masih berada di ampaian?",
        "options": [
          "Pakaian Puan Ramlah",
          "Buku cerita Faris",
          "Kasut sukan Ravi",
          "Beg sekolah Aina"
        ],
        "correct": 0,
        "explanation": "Faris melihat pakaian Puan Ramlah masih dijemur."
      },
      {
        "prompt": "Apakah yang sedang dilakukan oleh Puan Ramlah?",
        "options": [
          "Menyusun buku",
          "Menyiram pokok",
          "Membaiki basikal",
          "Memasak di dapur"
        ],
        "correct": 1,
        "explanation": "Puan Ramlah sedang menyiram pokok sehingga tidak menyedari perubahan cuaca."
      }
    ],
    "evidence": [
      {
        "icon": "☀️",
        "label": "Langit cerah, angin tenang dan pakaian di dalam almari.",
        "image": "assets/images/U08_BUKTI_1.webp"
      },
      {
        "icon": "🌧️",
        "label": "Awan gelap, angin kuat dan pakaian masih dijemur.",
        "image": "assets/images/U08_BUKTI_2.webp"
      },
      {
        "icon": "🌙",
        "label": "Langit malam berbintang dan ampaian kosong.",
        "image": "assets/images/U08_BUKTI_3.webp"
      }
    ],
    "evidenceCorrect": 1,
    "evidenceExplanation": "Bukti ini sepadan dengan maklumat yang disebut dalam dialog.",
    "intent": {
      "prompt": "Mengapakah Faris memberikan peringatan itu?",
      "options": [
        "Supaya puan menambah pakaian pada ampaian",
        "Supaya puan terus menyiram pokok di taman",
        "Supaya puan mengangkat pakaian sebelum hujan",
        "Supaya puan keluar berjalan bersama jiran"
      ],
      "correct": 2,
      "explanation": "Faris mengingatkan Puan Ramlah supaya mengangkat pakaian sebelum terkena hujan."
    },
    "cover": {
      "src": "assets/images/laman-utama-a2.png",
      "x": 1384,
      "y": 601,
      "width": 127,
      "height": 77
    },
    "background": "assets/images/latar-unit-08.png"
  }
];
