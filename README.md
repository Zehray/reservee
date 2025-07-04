# ReserVee - Café Rezervasyon Sistemi

## 📋 Proje Genel Bakış

ReserVee, modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir café rezervasyon sistemidir. Müşterilerin kolayca rezervasyon yapabilmesi, admin paneli üzerinden rezervasyonların yönetilmesi ve çeşitli hesaplama araçları sunan responsive bir web uygulamasıdır.

## 🚀 Canlı Demo

**Demo URL:** `http://localhost:5173` (Vite dev server)

## 🛠️ Teknoloji Stack

### Frontend
- **HTML5** - Semantic markup
- **SCSS/CSS3** - Modern styling with variables and mixins
- **JavaScript ES6+** - Function-based modular architecture
- **Bootstrap 5.3.2** - Responsive UI framework
- **Vite** - Build tool and dev server

### Data Storage
- **LocalStorage** - Client-side data persistence
- **JSON** - Data format

### Architecture
- **Function-based JavaScript** - Modular, testable code structure
- **Component-based SCSS** - Organized styling
- **Responsive Design** - Mobile-first approach

## 📁 Proje Yapısı

```
reserVee/
├── index.html              # Ana sayfa
├── reservation.html        # Rezervasyon formu
├── restaurant.html         # Restoran detay sayfası
├── admin.html             # Admin paneli
├── tools.html             # Hesaplama araçları
├── src/
│   └── assets/
│       ├── js/
│       │   ├── main.js           # Ana JavaScript dosyası
│       │   ├── home.js           # Ana sayfa işlevleri
│       │   ├── reservation.js    # Rezervasyon form işlevleri
│       │   ├── restaurant.js     # Restoran detay işlevleri
│       │   ├── admin.js          # Admin panel işlevleri
│       │   ├── tools.js          # Hesaplama araçları
│       │   └── utils.js          # Yardımcı fonksiyonlar
│       └── scss/
│           ├── main.scss         # Ana SCSS dosyası
│           ├── _variables.scss   # SCSS değişkenleri
│           ├── _reset.scss       # CSS reset
│           ├── _layout.scss      # Layout stilleri
│           ├── _components.scss  # Komponent stilleri
│           ├── _pages.scss       # Sayfa-özel stiller
│           └── _bootstrap-navbar.scss # Bootstrap navbar özelleştirmeleri
├── package.json           # NPM dependencies
├── vite.config.js        # Vite konfigürasyonu
└── README.md             # Bu dosya
```

## 🎯 Sistem Özellikleri

### 1. Ana Sayfa (index.html)
- **Hero Section**: Çekici giriş bölümü
- **Restoran Listesi**: Filtrelenebilir restoran kartları
- **Lokasyon Filtreleme**: Şehir bazında filtreleme
- **Responsive Design**: Tüm cihazlarda uyumlu görünüm

### 2. Rezervasyon Sistemi (reservation.html)
- **Akıllı Form Validasyonu**: Real-time doğrulama
- **Tarih/Saat Kontrolü**: Geçmiş tarih engelleme
- **Restoran Seçimi**: URL parametresi ile otomatik seçim
- **LocalStorage Entegrasyonu**: Veri kalıcılığı

### 3. Restoran Detay Sayfası (restaurant.html)
- **Dinamik İçerik**: URL parametresine göre restoran bilgileri
- **Menü Önizlemesi**: Görsel menü öğeleri
- **Müşteri Yorumları**: Yıldız puanlama sistemi
- **Rezervasyon Entegrasyonu**: Direkt rezervasyon linki

### 4. Admin Paneli (admin.html)
- **Rezervasyon Yönetimi**: Tüm rezervasyonları görüntüleme
- **Filtreleme & Sıralama**: Tarih, isim, misafir sayısı bazında
- **CRUD İşlemleri**: Rezervasyon silme ve toplu temizleme
- **Real-time Güncelleme**: 30 saniyede bir otomatik yenileme

### 5. Hesaplama Araçları (tools.html)
- **Bahşiş Hesaplayıcı**: Hesap ve bahşiş oranı hesaplama
- **Hesap Bölme**: Kişi başı ödeme hesaplama
- **İndirim Hesaplayıcı**: Yüzde bazında indirim hesaplama
- **Rezervasyon Maliyet Tahmini**: Misafir sayısı ve ek hizmetler
- **Sadakat Puanı Hesaplayıcı**: Harcama bazında puan hesaplama

## 🔧 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v16 veya üzeri)
- NPM veya Yarn

### Kurulum Adımları

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd reserVee
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Development server'ı başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:5173
```

### Build İşlemi

**Production build:**
```bash
npm run build
```

**Build önizlemesi:**
```bash
npm run preview
```

## 📱 Responsive Tasarım

### Breakpoint'ler
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px

### Bootstrap Navbar
- **Desktop**: Horizontal navigation
- **Mobile**: Collapsible hamburger menu
- **Accessibility**: ARIA labels ve keyboard navigation

## 🎨 Tasarım Sistemi

### Renk Paleti
```scss
$primary-color: #2c3e50;      // Ana renk
$secondary-color: #3498db;    // İkincil renk
$accent-color: #e74c3c;       // Vurgu rengi
$success-color: #27ae60;      // Başarı rengi
$warning-color: #f39c12;      // Uyarı rengi
$text-color: #2c3e50;         // Metin rengi
$background-color: #ecf0f1;   // Arka plan rengi
```

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headings**: 700 font-weight
- **Body**: 400 font-weight
- **Line Height**: 1.6

## 🔒 Veri Yönetimi

### LocalStorage Yapısı
```javascript
// Rezervasyonlar
{
  "reservations": [
    {
      "id": "unique-id",
      "restaurantId": "rest_1",
      "fullName": "John Doe",
      "phoneNumber": "+90 555 123 4567",
      "email": "john@example.com",
      "date": "2024-01-15",
      "time": "19:00",
      "guests": "4",
      "specialRequests": "Pencere kenarı masa",
      "createdAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### Veri Güvenliği
- Client-side validation
- XSS koruması
- Input sanitization
- Error handling

## 🧪 Test Senaryoları

### Rezervasyon Testi
1. Form validasyonu kontrolü
2. Geçmiş tarih engelleme
3. Email format doğrulama
4. Telefon numarası validasyonu
5. LocalStorage kaydetme

### Admin Panel Testi
1. Rezervasyon listesi yükleme
2. Tarih filtreleme
3. Sıralama işlevleri
4. Rezervasyon silme
5. Toplu veri temizleme

### Responsive Test
1. Mobile görünüm kontrolü
2. Tablet uyumluluğu
3. Desktop layout
4. Navbar toggle işlevi
5. Touch interaction'lar

## 🚀 Deployment

### Netlify Deployment
```bash
npm run build
# dist/ klasörünü Netlify'a upload edin
```

### Vercel Deployment
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# dist/ içeriğini gh-pages branch'ine push edin
```

## 🔮 Gelecek Geliştirmeler

### Planlanan Özellikler
- [ ] Backend API entegrasyonu
- [ ] Kullanıcı authentication sistemi
- [ ] Email bildirim sistemi
- [ ] SMS onay sistemi
- [ ] Ödeme entegrasyonu
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] PWA (Progressive Web App) desteği
- [ ] Real-time rezervasyon durumu
- [ ] Rezervasyon düzenleme
- [ ] Müşteri profil sistemi
- [ ] Restoran sahipleri için panel

### Teknik İyileştirmeler
- [ ] TypeScript migration
- [ ] Unit test coverage
- [ ] E2E testing
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Accessibility enhancements
- [ ] Code splitting
- [ ] Service Worker implementation

## 📞 Destek ve İletişim

### Geliştirici Bilgileri
- **Proje**: ReserVee Café Rezervasyon Sistemi
- **Versiyon**: 1.0.0
- **Lisans**: MIT

### Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.
