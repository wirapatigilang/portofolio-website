# Requirements Document

## Introduction

Website portfolio pribadi untuk menampilkan dua bidang keahlian utama: **Software Engineering** (developer skills, proyek, tech stack) dan **Creative Work** (Fotografer, Videografer, Video Editor). Website ini berfungsi sebagai representasi profesional diri pemilik kepada calon klien, rekruter, dan kolaborator — dengan navigasi yang jelas antara dua domain yang berbeda namun tetap terpadu dalam satu identitas personal.

---

## Glossary

- **Website**: Aplikasi web portfolio pribadi yang menjadi subjek dokumen ini.
- **Visitor**: Pengguna yang mengakses website portfolio.
- **Owner**: Pemilik website portfolio (Gilang Wirapati).
- **Hero_Section**: Bagian utama di halaman landing yang menampilkan identitas dan tagline pemilik.
- **Navigation_Bar**: Komponen navigasi utama yang memungkinkan Visitor berpindah antar halaman.
- **Domain_Switcher**: Komponen UI yang memungkinkan Visitor beralih antara tampilan Software Engineering dan Creative Work.
- **Project_Card**: Komponen UI yang menampilkan ringkasan satu proyek (software atau creative).
- **Gallery**: Komponen yang menampilkan kumpulan karya foto atau video dalam format grid atau masonry.
- **Tech_Stack_Section**: Bagian yang menampilkan daftar teknologi dan tools yang dikuasai Owner.
- **Contact_Form**: Formulir yang memungkinkan Visitor mengirim pesan langsung kepada Owner.
- **Filter**: Komponen UI yang memungkinkan Visitor menyaring konten berdasarkan kategori atau tag.
- **Lightbox**: Overlay yang menampilkan foto atau video dalam ukuran penuh saat diklik.
- **CTA**: Call-to-Action, elemen UI yang mendorong Visitor melakukan tindakan tertentu (misal: menghubungi Owner).

---

## Requirements

### Requirement 1: Halaman Landing (Home)

**User Story:** Sebagai Visitor, saya ingin melihat halaman utama yang memperkenalkan identitas pemilik dan dua bidang keahliannya, sehingga saya dapat memahami siapa pemilik website dan memilih domain yang relevan dengan kebutuhan saya.

#### Acceptance Criteria

1. WHEN Visitor membuka halaman utama, THE Website SHALL menampilkan Hero_Section yang memuat nama Owner, foto profil, dan tagline yang menyebutkan kedua bidang keahlian secara eksplisit (Software Engineering dan Creative Work).
2. WHEN Visitor membuka halaman utama, THE Website SHALL menampilkan dua pilihan domain (Software Engineering dan Creative Work) sebagai entry point yang diberi label dengan nama domain yang tepat dan terlihat di viewport tanpa perlu scroll.
3. WHEN Visitor mengklik salah satu entry point domain, THE Website SHALL mengarahkan Visitor ke halaman atau seksi yang sesuai dengan domain tersebut dalam waktu kurang dari 3 detik.
4. WHEN Visitor membuka halaman utama, THE Website SHALL menampilkan ringkasan singkat tentang Owner (bio pendek, maksimal 3 kalimat) di luar Hero_Section.
5. WHEN Visitor membuka halaman utama, THE Website SHALL menampilkan elemen CTA yang dapat diklik dan mengarahkan Visitor ke halaman atau seksi Contact.
6. WHEN Visitor mengakses halaman utama, THE Website SHALL memuat seluruh konten Hero_Section dalam waktu kurang dari 3 detik pada koneksi broadband standar (≥10 Mbps).

---

### Requirement 2: Navigasi Utama

**User Story:** Sebagai Visitor, saya ingin navigasi yang intuitif dan konsisten di seluruh halaman, sehingga saya dapat berpindah antar halaman dan antar domain dengan mudah tanpa kebingungan.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL selalu terlihat (sticky/fixed) saat Visitor melakukan scroll ke bawah maupun ke atas pada semua halaman.
2. THE Navigation_Bar SHALL memuat tautan ke: Home, Software Engineering, Creative Work, About, dan Contact — dan semua tautan tersebut harus dapat diklik serta mengarah ke halaman yang benar.
3. WHEN Visitor berada di halaman tertentu, THE Navigation_Bar SHALL menampilkan indikator visual yang berbeda secara visual (misal: warna, underline, atau bold) pada tautan halaman yang sedang aktif dibandingkan tautan lainnya.
4. WHEN Visitor mengakses website dari perangkat dengan lebar layar ≤ 768px, THE Navigation_Bar SHALL menyembunyikan tautan navigasi dan menampilkan ikon hamburger (tiga garis horizontal) yang dapat diklik.
5. WHEN Visitor mengklik ikon hamburger, THE Website SHALL menampilkan seluruh tautan navigasi (Home, Software Engineering, Creative Work, About, Contact) dalam tampilan vertikal yang dapat diklik; WHEN Visitor mengklik ikon hamburger kembali atau mengklik tautan navigasi, THE Website SHALL menutup menu tersebut.
6. THE Navigation_Bar SHALL menampilkan nama atau logo Owner di sisi kiri sebagai tautan yang mengarahkan Visitor kembali ke halaman utama (/).

---

### Requirement 3: Halaman Software Engineering

**User Story:** Sebagai rekruter atau calon klien teknis, saya ingin melihat keahlian software engineering Owner secara terstruktur, sehingga saya dapat mengevaluasi kemampuan teknis dan pengalaman proyeknya.

#### Acceptance Criteria

1. THE Website SHALL menampilkan halaman khusus Software Engineering yang memuat: ringkasan profesional, Tech_Stack_Section, dan daftar proyek.
2. THE Tech_Stack_Section SHALL menampilkan teknologi dan tools yang dikuasai Owner, dikelompokkan berdasarkan kategori (misal: Frontend, Backend, Database, DevOps, Tools).
3. THE Website SHALL menampilkan setiap proyek software dalam bentuk Project_Card yang memuat: nama proyek, deskripsi singkat (maksimal 150 karakter), tech stack yang digunakan, tautan ke repository atau demo live, dan thumbnail/screenshot; IF thumbnail tidak tersedia, THEN THE Website SHALL menampilkan gambar placeholder.
4. WHEN Visitor mengklik sebuah Project_Card, THE Website SHALL menampilkan halaman atau modal detail proyek yang memuat: deskripsi lengkap (maksimal 1000 karakter), tantangan yang dihadapi, solusi yang diterapkan, dan tautan ke repository dan/atau demo live jika tersedia.
5. WHILE Visitor berada di halaman Software Engineering, THE Website SHALL menampilkan Filter berdasarkan kategori proyek (misal: Web App, Mobile App, API, Open Source).
6. WHEN Visitor memilih kategori pada Filter, THE Website SHALL menampilkan hanya Project_Card yang sesuai dengan kategori tersebut tanpa memuat ulang halaman; IF tidak ada kategori yang dipilih, THEN THE Website SHALL menampilkan semua Project_Card.
7. IF tidak ada proyek yang sesuai dengan Filter yang dipilih, THEN THE Website SHALL menampilkan pesan yang menyatakan tidak ada proyek ditemukan untuk kategori tersebut.

---

### Requirement 4: Halaman Creative Work — Fotografi

**User Story:** Sebagai calon klien fotografer atau penikmat karya, saya ingin melihat portofolio foto Owner dalam tampilan yang estetis dan mudah dinavigasi, sehingga saya dapat menilai gaya dan kualitas karya fotografinya.

#### Acceptance Criteria

1. THE Website SHALL menampilkan Gallery foto dalam format grid atau masonry layout pada halaman Creative Work seksi Fotografi; layout yang dipilih SHALL konsisten di seluruh Gallery.
2. THE Gallery SHALL menampilkan foto dalam resolusi thumbnail yang dioptimasi untuk web (ukuran file ≤ 200KB per thumbnail, dimensi maksimal 600px pada sisi terpanjang).
3. WHEN Visitor mengklik sebuah foto di Gallery, THE Website SHALL membuka Lightbox yang menampilkan foto dalam resolusi penuh (minimal 1200px pada sisi terpanjang) dengan tombol navigasi ke foto sebelumnya dan berikutnya.
4. WHEN Visitor berada di foto pertama dalam Lightbox dan mengklik navigasi "sebelumnya", THEN THE Lightbox SHALL menonaktifkan atau menyembunyikan tombol navigasi tersebut; WHEN Visitor berada di foto terakhir dan mengklik navigasi "berikutnya", THEN THE Lightbox SHALL menonaktifkan atau menyembunyikan tombol navigasi tersebut.
5. WHEN Visitor menekan tombol Escape atau mengklik area di luar Lightbox, THE Website SHALL menutup Lightbox dan mengembalikan fokus ke foto yang diklik sebelumnya.
6. THE Website SHALL menampilkan Filter berdasarkan kategori foto (misal: Portrait, Landscape, Event, Street, Product) pada Gallery fotografi.
7. WHEN Visitor memilih kategori pada Filter, THE Gallery SHALL menampilkan hanya foto yang sesuai dengan kategori tersebut tanpa memuat ulang halaman.
8. IF tidak ada foto yang sesuai dengan Filter yang dipilih, THEN THE Website SHALL menampilkan pesan yang menyatakan tidak ada foto ditemukan untuk kategori tersebut.

---

### Requirement 5: Halaman Creative Work — Videografi & Video Editing

**User Story:** Sebagai calon klien videografer atau video editor, saya ingin melihat portofolio video Owner, sehingga saya dapat menilai kualitas sinematografi dan kemampuan editing-nya.

#### Acceptance Criteria

1. THE Website SHALL menampilkan daftar karya video dalam bentuk Project_Card yang memuat: thumbnail video, judul, deskripsi singkat (maksimal 150 karakter), dan kategori (Videografi atau Video Editing).
2. WHEN Visitor mengklik sebuah Project_Card video, THE Website SHALL memutar video melalui embed player (YouTube, Vimeo, atau player native) di dalam halaman tanpa mengarahkan Visitor keluar dari website.
3. THE Website SHALL menampilkan Filter berdasarkan kategori video (misal: Cinematic, Commercial, Event, Short Film, Motion Graphics) pada halaman video.
4. WHEN Visitor memilih kategori pada Filter, THE Website SHALL menampilkan hanya Project_Card video yang sesuai tanpa memuat ulang halaman; IF tidak ada kategori yang dipilih, THEN THE Website SHALL menampilkan semua Project_Card video.
5. THE Website SHALL menampilkan informasi tambahan pada setiap karya video: tools yang digunakan (misal: Premiere Pro, After Effects, DaVinci Resolve) dan peran Owner dalam proyek tersebut (misal: Director, Editor, Cinematographer).
6. IF embed player gagal dimuat atau koneksi Visitor tidak mendukung pemutaran video embed, THEN THE Website SHALL menampilkan tautan langsung yang dapat diklik ke platform video eksternal (YouTube atau Vimeo) sebagai fallback.
7. IF tidak ada video yang sesuai dengan Filter yang dipilih, THEN THE Website SHALL menampilkan pesan yang menyatakan tidak ada video ditemukan untuk kategori tersebut.

---

### Requirement 6: Halaman About

**User Story:** Sebagai Visitor, saya ingin mengetahui lebih dalam tentang latar belakang, perjalanan, dan kepribadian Owner, sehingga saya dapat membangun kepercayaan sebelum memutuskan untuk berkolaborasi.

#### Acceptance Criteria

1. THE Website SHALL menampilkan halaman About yang memuat: foto Owner, biografi lengkap, perjalanan karir/pendidikan, dan pernyataan nilai-nilai atau filosofi kerja Owner.
2. THE Website SHALL menampilkan timeline atau daftar pengalaman kerja dan pendidikan Owner pada halaman About, diurutkan dari yang terbaru ke yang terlama.
3. IF Owner menyediakan data penghargaan, sertifikasi, atau pencapaian notable, THEN THE Website SHALL menampilkan daftar tersebut pada halaman About; IF tidak ada data yang tersedia, THEN THE Website SHALL tidak menampilkan seksi tersebut.
4. THE Website SHALL menampilkan elemen CTA di bagian bawah halaman About yang dapat diklik dan mengarahkan Visitor ke halaman atau seksi Contact.
5. WHERE Owner menyediakan file CV, THE Website SHALL menampilkan tombol unduh CV yang mengunduh file PDF ke perangkat Visitor tanpa membuka tab baru.

---

### Requirement 7: Halaman Contact

**User Story:** Sebagai Visitor yang tertarik berkolaborasi, saya ingin dapat menghubungi Owner dengan mudah melalui berbagai saluran, sehingga saya dapat memulai diskusi tentang proyek atau kolaborasi.

#### Acceptance Criteria

1. THE Website SHALL menampilkan Contact_Form yang memuat field: nama lengkap (maksimal 100 karakter), alamat email (maksimal 254 karakter), subjek (dengan pilihan: Software Project, Photography, Videography, Video Editing, Other), dan pesan (maksimal 2000 karakter).
2. IF Visitor mencoba mengirim Contact_Form dengan satu atau lebih field wajib (nama, email, subjek, pesan) yang kosong, THEN THE Website SHALL memblokir pengiriman dan menampilkan pesan error inline di bawah setiap field yang kosong.
3. IF Visitor mengisi field email dengan format yang tidak valid (tidak mengandung karakter '@' atau tidak memiliki domain dengan ekstensi), THEN THE Website SHALL menampilkan pesan error yang spesifik pada field email tersebut.
4. WHEN Contact_Form berhasil dikirim, THE Website SHALL menampilkan pesan konfirmasi kepada Visitor dan mengosongkan semua field form.
5. IF pengiriman Contact_Form gagal karena kesalahan server, THEN THE Website SHALL menampilkan pesan error yang menyatakan pengiriman gagal dan meminta Visitor untuk mencoba kembali, serta mempertahankan semua isian Visitor di dalam form.
6. THE Website SHALL menampilkan tautan ke profil media sosial dan platform profesional Owner (misal: LinkedIn, GitHub, Instagram, Behance) pada halaman Contact; setiap tautan SHALL membuka halaman profil di tab baru.
7. THE Website SHALL menampilkan alamat email Owner sebagai tautan mailto yang dapat diklik pada halaman Contact.

---

### Requirement 8: Responsivitas dan Aksesibilitas

**User Story:** Sebagai Visitor yang mengakses dari berbagai perangkat, saya ingin website dapat digunakan dengan nyaman di desktop, tablet, maupun mobile, sehingga pengalaman saya tidak terganggu oleh ukuran layar.

#### Acceptance Criteria

1. THE Website SHALL menampilkan layout yang responsif pada lebar layar: ≥1280px (desktop), 768px–1279px (tablet), dan <768px (mobile) — tanpa horizontal scroll, tanpa elemen yang saling tumpang tindih, dan dengan ukuran font minimal 16px pada semua breakpoint.
2. THE Website SHALL memastikan semua teks memiliki rasio kontras warna minimal 4.5:1 terhadap latar belakangnya sesuai standar WCAG 2.1 Level AA.
3. THE Website SHALL memastikan semua elemen interaktif (tombol, tautan, form) dapat diakses dan dioperasikan menggunakan keyboard saja, dengan urutan tab yang logis dan indikator fokus yang terlihat (minimal outline 2px).
4. THE Website SHALL menyediakan atribut alt yang deskriptif pada semua elemen gambar; gambar dekoratif SHALL menggunakan alt="" agar diabaikan oleh screen reader.
5. WHEN Visitor menggunakan screen reader, THE Website SHALL menyampaikan struktur konten yang logis melalui penggunaan elemen HTML semantik yang benar: heading h1–h6 secara hierarkis, landmark regions (header, nav, main, footer), dan elemen list untuk konten berbentuk daftar.
6. THE Website SHALL memastikan ukuran touch target pada perangkat mobile minimal 44x44 piksel untuk semua elemen interaktif.

---

### Requirement 9: Performa Website

**User Story:** Sebagai Visitor, saya ingin website memuat dengan cepat, sehingga saya tidak perlu menunggu lama untuk melihat konten portofolio.

#### Acceptance Criteria

1. THE Website SHALL mencapai skor Lighthouse Performance minimal 85 pada halaman utama untuk kondisi desktop dan minimal 70 untuk kondisi mobile.
2. THE Website SHALL memiliki Largest Contentful Paint (LCP) tidak lebih dari 2.5 detik pada kondisi desktop dengan koneksi broadband standar (≥10 Mbps).
3. THE Website SHALL menggunakan format gambar modern (WebP atau AVIF) dengan fallback ke JPEG/PNG untuk browser yang tidak mendukung format tersebut.
4. THE Website SHALL menerapkan lazy loading pada semua gambar yang berada di luar viewport awal.
5. WHEN Visitor mengakses halaman yang sama untuk kedua kalinya, THE Website SHALL memuat aset statis (CSS, JavaScript, gambar) dari cache browser dengan cache TTL minimal 1 hari untuk mengurangi waktu muat.
6. THE Website SHALL mengompresi semua aset teks first-party (HTML, CSS, JavaScript) menggunakan Gzip atau Brotli compression.

---

### Requirement 10: SEO dan Metadata

**User Story:** Sebagai Owner, saya ingin website saya mudah ditemukan melalui mesin pencari, sehingga calon klien dan rekruter dapat menemukan portofolio saya secara organik.

#### Acceptance Criteria

1. THE Website SHALL menyertakan meta tag berikut pada setiap halaman sebelum halaman di-render ke Visitor: `title` (50–60 karakter), `description` (50–160 karakter), `og:title`, `og:description`, `og:image`, dan `og:url`.
2. THE Website SHALL menggunakan tepat satu elemen H1 per halaman dan memastikan tidak ada level heading yang dilewati (misal: H1 → H3 tanpa H2 di antaranya).
3. THE Website SHALL menyertakan file sitemap.xml yang dapat diakses di path `/sitemap.xml` dan mencantumkan semua halaman publik website.
4. THE Website SHALL menyertakan file robots.txt yang dapat diakses di path `/robots.txt` dan tidak memblokir crawler mesin pencari dari mengindeks halaman publik manapun.
5. WHEN konten halaman diperbarui, THE Website SHALL memperbarui meta tag `description` dan `title` sesuai dengan konten terbaru halaman tersebut sebelum halaman tersebut di-render ke Visitor.
6. IF sebuah halaman tidak memiliki gambar spesifik, THEN THE Website SHALL menggunakan gambar fallback default Owner (misal: foto profil atau logo) sebagai nilai `og:image` untuk halaman tersebut.
