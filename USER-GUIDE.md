# ReserVee Kullanım Kılavuzu

## 📖 İçindekiler
1. [Sistem Genel Bakış](#sistem-genel-bakış)
2. [Ana Sayfa Kullanımı](#ana-sayfa-kullanımı)
3. [Rezervasyon Yapma](#rezervasyon-yapma)
4. [Restoran Detayları](#restoran-detayları)
5. [Admin Paneli](#admin-paneli)
6. [Hesaplama Araçları](#hesaplama-araçları)
7. [Mobil Kullanım](#mobil-kullanım)
8. [Sorun Giderme](#sorun-giderme)

## 🏠 Sistem Genel Bakış

ReserVee, kullanıcı dostu arayüzü ile café rezervasyonlarını kolaylaştıran modern bir web uygulamasıdır. Sistem 5 ana bölümden oluşur:

- **Ana Sayfa**: Restoran keşfi ve filtreleme
- **Rezervasyon**: Online rezervasyon formu
- **Restoran Detayları**: Detaylı restoran bilgileri
- **Admin Paneli**: Rezervasyon yönetimi
- **Araçlar**: Hesaplama araçları

## 🏠 Ana Sayfa Kullanımı

### Restoran Keşfi
1. **Ana sayfayı açın**: `http://localhost:5173`
2. **Hero bölümü**: Hoş geldin mesajı ve hızlı rezervasyon butonu
3. **Restoran listesi**: Mevcut restoranları görüntüleyin

### Filtreleme Özellikleri
```
📍 Lokasyon Filtresi:
- Tüm Lokasyonlar
- Beşiktaş
- Kadıköy
- Ortaköy
```

### Restoran Kartları
Her restoran kartında:
- **Restoran adı** ve **görsel**
- **Yıldız puanı** (5 üzerinden)
- **Mutfak türü** (Turkish Coffee, International, vb.)
- **Adres bilgisi**
- **Fiyat aralığı** (₺, ₺₺, ₺₺₺)
- **Özellikler** (WiFi, Outdoor Seating, vb.)
- **"Detayları Gör"** butonu
- **"Rezervasyon Yap"** butonu

### Hızlı İşlemler
- **Detay görüntüleme**: Restoran kartındaki "Detayları Gör" butonuna tıklayın
- **Direkt rezervasyon**: "Rezervasyon Yap" butonu ile hızlı rezervasyon

## 📅 Rezervasyon Yapma

### Rezervasyon Formu Erişimi
1. **Ana sayfadan**: Restoran kartındaki "Rezervasyon Yap" butonu
2. **Restoran detayından**: "Make Reservation" butonu
3. **Direkt URL**: `reservation.html?restaurant=rest_1`

### Form Alanları
```
👤 Kişisel Bilgiler:
- Ad Soyad (zorunlu, min 2 karakter)
- Telefon Numarası (zorunlu, format kontrolü)
- E-posta (zorunlu, format kontrolü)

📅 Rezervasyon Detayları:
- Tarih (zorunlu, gelecek tarih)
- Saat (zorunlu, gelecek zaman)
- Misafir Sayısı (1-20 arası)

📝 Ek Bilgiler:
- Özel İstekler (isteğe bağlı)
```

### Validasyon Kuralları
- **Tarih**: Bugünden önceki tarihler seçilemez
- **Saat**: Bugün için geçmiş saatler seçilemez
- **Telefon**: Türkiye telefon formatı (+90 5XX XXX XXXX)
- **E-posta**: Geçerli email formatı (user@domain.com)

### Rezervasyon Süreci
1. **Form doldurma**: Tüm zorunlu alanları doldurun
2. **Validasyon**: Real-time hata kontrolü
3. **Gönderme**: "Make Reservation" butonuna tıklayın
4. **Onay**: Başarı mesajı ve rezervasyon detayları
5. **Yeni rezervasyon**: "Make Another Reservation" butonu

### Başarı Mesajı
```
✅ Rezervasyon Onaylandı!
"4 kişi için 15 Ocak 2024 tarihinde 19:00 saatindeki 
rezervasyonunuz onaylanmıştır."
```

## 🏪 Restoran Detayları

### Detay Sayfası Erişimi
- **Ana sayfadan**: "Detayları Gör" butonu
- **URL**: `restaurant.html?id=rest_1`

### Restoran Bilgileri
```
📋 Temel Bilgiler:
- Restoran adı ve görseli
- Yıldız puanı ve değerlendirme
- Mutfak türü
- Adres bilgisi

📞 İletişim:
- Telefon numarası
- E-posta adresi
- Tam adres

⏰ Çalışma Saatleri:
- Hafta içi saatleri
- Hafta sonu saatleri

🏷️ Özellikler:
- WiFi, Otopark, Pet Friendly vb.
- Fiyat aralığı göstergesi
```

### Menü Önizlemesi
- **Görsel menü öğeleri**
- **Fiyat bilgileri**
- **Popüler ürünler**

### Müşteri Yorumları
```
⭐ Yorum Sistemi:
- Müşteri adı
- Yıldız puanı (1-5)
- Yorum metni
- Tarih bilgisi
```

### Hızlı Rezervasyon
- **"Make Reservation"** butonu
- **"View Menu"** butonu (menü bölümüne scroll)

## 👨‍💼 Admin Paneli

### Admin Paneli Erişimi
- **URL**: `admin.html`
- **Navbar**: "Admin" linki

### Dashboard Özellikleri
```
📊 İstatistikler:
- Toplam rezervasyon sayısı
- Filtrelenmiş rezervasyon sayısı

🔍 Filtreleme:
- Tarihe göre filtreleme
- Tüm tarihler veya belirli tarih

📈 Sıralama Seçenekleri:
- Tarihe göre (varsayılan)
- İsme göre (A-Z)
- Misafir sayısına göre (çoktan aza)
- Saate göre (erken-geç)
```

### Rezervasyon Tablosu
| Sütun | Açıklama |
|-------|----------|
| Ad Soyad | Müşteri adı |
| Telefon | İletişim numarası |
| E-posta | E-posta adresi |
| Tarih | Rezervasyon tarihi |
| Saat | Rezervasyon saati |
| Misafir | Kişi sayısı |
| Özel İstekler | Ek notlar |
| İşlemler | Silme butonu |

### Admin İşlemleri
```
🗑️ Rezervasyon Silme:
1. Tabloda "Delete" butonuna tıklayın
2. Onay dialogunu kabul edin
3. Rezervasyon silinir

🧹 Toplu Temizleme:
1. "Clear All Data" butonuna tıklayın
2. Onay dialogunu kabul edin
3. Tüm rezervasyonlar silinir
```

### Otomatik Yenileme
- **30 saniyede bir** otomatik güncelleme
- Yeni rezervasyonlar otomatik görünür

## 🧮 Hesaplama Araçları

### Araçlar Sayfası Erişimi
- **URL**: `tools.html`
- **Navbar**: "Tools" linki

### 1. Bahşiş Hesaplayıcı
```
📝 Girdiler:
- Hesap tutarı (₺)
- Bahşiş yüzdesi (%)

📊 Çıktılar:
- Bahşiş tutarı
- Toplam ödeme
```

### 2. Hesap Bölme Hesaplayıcı
```
📝 Girdiler:
- Toplam hesap (₺)
- Kişi sayısı
- Bahşiş yüzdesi (%)

📊 Çıktılar:
- Kişi başı tutar (bahşiş hariç)
- Kişi başı tutar (bahşiş dahil)
```

### 3. İndirim Hesaplayıcı
```
📝 Girdiler:
- Orijinal fiyat (₺)
- İndirim yüzdesi (%)

📊 Çıktılar:
- İndirim tutarı
- İndirimli fiyat
```

### 4. Rezervasyon Maliyet Tahmini
```
📝 Girdiler:
- Misafir sayısı
- Kişi başı ortalama (₺)
- İçecek upgrade (₺)

📊 Çıktılar:
- Temel maliyet
- Upgrade maliyeti
- Tahmini toplam
```

### 5. Sadakat Puanı Hesaplayıcı
```
📝 Girdiler:
- Harcama tutarı (₺)
- Üyelik seviyesi (1x, 1.5x, 2x)
- Mevcut puanlar

📊 Çıktılar:
- Kazanılan puanlar
- Toplam puanlar
- Ödül değeri (100 puan = 5₺)
```

### Real-time Hesaplama
- **Debounce**: 300ms gecikme ile hesaplama
- **Otomatik güncelleme**: Input değişikliklerinde
- **Format**: Türk Lirası formatında gösterim

## 📱 Mobil Kullanım

### Responsive Tasarım
```
📱 Mobile (< 768px):
- Tek sütun layout
- Büyük dokunma alanları
- Collapsible navbar

📟 Tablet (768px - 991px):
- İki sütun layout
- Orta boyut elementler

🖥️ Desktop (≥ 992px):
- Çok sütun layout
- Hover efektleri
- Horizontal navbar
```

### Mobil Özellikler
- **Touch-friendly**: Büyük butonlar ve linkler
- **Swipe navigation**: Kolay gezinme
- **Responsive images**: Otomatik boyutlandırma
- **Fast loading**: Optimize edilmiş performans

### Navbar Mobil Davranışı
```
🍔 Hamburger Menu:
1. Mobilde navbar otomatik collapse olur
2. Hamburger ikonu görünür
3. Tıklayınca menü açılır/kapanır
4. Menu item'lara tıklayınca menü kapanır
```

## 🔧 Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### 1. Rezervasyon Kaydedilmiyor
```
❌ Sorun: Form gönderilmiyor
✅ Çözüm:
- Tüm zorunlu alanları doldurun
- Geçerli email formatı kullanın
- Gelecek tarih/saat seçin
- Browser console'u kontrol edin
```

#### 2. Admin Panelinde Veri Görünmüyor
```
❌ Sorun: Rezervasyon listesi boş
✅ Çözüm:
- En az bir rezervasyon yapın
- Tarih filtresini kontrol edin
- LocalStorage'ı kontrol edin
- Sayfayı yenileyin (F5)
```

#### 3. Hesaplama Araçları Çalışmıyor
```
❌ Sorun: Hesaplamalar güncellenmiyor
✅ Çözüm:
- Sayısal değerler girin
- Negatif değer girmeyin
- Input alanlarını temizleyip tekrar deneyin
```

#### 4. Mobil Görünüm Sorunları
```
❌ Sorun: Layout bozuk görünüyor
✅ Çözüm:
- Sayfayı yenileyin
- Browser cache'ini temizleyin
- Farklı browser deneyin
- Viewport meta tag'ini kontrol edin
```

#### 5. Navbar Toggle Çalışmıyor
```
❌ Sorun: Hamburger menu açılmıyor
✅ Çözüm:
- Bootstrap JS yüklendiğini kontrol edin
- Console error'ları kontrol edin
- Sayfayı yenileyin
```

### Browser Uyumluluğu
```
✅ Desteklenen Browserlar:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

❌ Desteklenmeyen:
- Internet Explorer
- Eski mobile browserlar
```

### Performance İpuçları
- **Cache**: Browser cache'ini düzenli temizleyin
- **LocalStorage**: Çok fazla veri biriktirmeyin
- **Images**: Görseller otomatik optimize edilir
- **JavaScript**: Modern ES6+ syntax kullanılır

### Veri Yedekleme
```
💾 LocalStorage Yedekleme:
1. Browser Developer Tools açın (F12)
2. Application/Storage tab'ine gidin
3. Local Storage'ı seçin
4. Verileri kopyalayın/export edin
```

### Destek ve Yardım
- **Console Logs**: Browser console'unu kontrol edin
- **Error Messages**: Hata mesajlarını okuyun
- **Documentation**: Bu kılavuzu tekrar inceleyin
- **GitHub Issues**: Sorunları raporlayın

---

## 📞 İletişim

Bu kılavuzda yer almayan sorularınız için:
- **GitHub Repository**: Issues bölümünü kullanın
- **Documentation**: README.md dosyasını inceleyin
- **Code Review**: Kaynak kodları inceleyebilirsiniz

**Son Güncelleme**: Ocak 2024
**Versiyon**: 1.0.0
