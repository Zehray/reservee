# ReserVee API Referansı

## 📋 İçindekiler
1. [JavaScript Functions API](#javascript-functions-api)
2. [LocalStorage API](#localstorage-api)
3. [Event System API](#event-system-api)
4. [Utility Functions](#utility-functions)
5. [Component APIs](#component-apis)

## 🔧 JavaScript Functions API

### Utils Module (`utils.js`)

#### `formatCurrency(amount)`
Para formatını Türk Lirası olarak formatlar.

```javascript
// Kullanım
formatCurrency(1234.56)
// Çıktı: "₺1.234,56"

// Parametreler
amount: number - Formatlanacak miktar

// Dönüş değeri
string - Formatlanmış para birimi
```

#### `formatDate(dateString)`
Tarih string'ini okunabilir formata çevirir.

```javascript
// Kullanım
formatDate("2024-01-15")
// Çıktı: "15 Ocak 2024"

// Parametreler
dateString: string - ISO tarih formatı (YYYY-MM-DD)

// Dönüş değeri
string - Formatlanmış tarih
```

#### `formatTime(timeString)`
Saat string'ini 24 saat formatında gösterir.

```javascript
// Kullanım
formatTime("19:30")
// Çıktı: "19:30"

// Parametreler
timeString: string - Saat formatı (HH:MM)

// Dönüş değeri
string - Formatlanmış saat
```

#### `isValidEmail(email)`
Email adresinin geçerliliğini kontrol eder.

```javascript
// Kullanım
isValidEmail("user@example.com")
// Çıktı: true

isValidEmail("invalid-email")
// Çıktı: false

// Parametreler
email: string - Kontrol edilecek email adresi

// Dönüş değeri
boolean - Geçerlilik durumu
```

#### `isValidPhone(phone)`
Türkiye telefon numarası formatını kontrol eder.

```javascript
// Kullanım
isValidPhone("+90 555 123 4567")
// Çıktı: true

isValidPhone("123456")
// Çıktı: false

// Parametreler
phone: string - Kontrol edilecek telefon numarası

// Dönüş değeri
boolean - Geçerlilik durumu
```

#### `generateId()`
Unique ID üretir.

```javascript
// Kullanım
generateId()
// Çıktı: "1704123456789-abc123"

// Parametreler
Yok

// Dönüş değeri
string - Unique identifier
```

#### `debounce(func, delay)`
Fonksiyon çağrılarını geciktirir.

```javascript
// Kullanım
const debouncedFunction = debounce(() => {
  console.log("Debounced!");
}, 300);

// Parametreler
func: function - Geciktirilecek fonksiyon
delay: number - Gecikme süresi (ms)

// Dönüş değeri
function - Debounced fonksiyon
```

### Storage Module (`utils.js`)

#### `storage.get(key)`
LocalStorage'dan veri okur.

```javascript
// Kullanım
const reservations = storage.get("reservations");

// Parametreler
key: string - Storage anahtarı

// Dönüş değeri
any|null - Saklanan veri veya null
```

#### `storage.set(key, value)`
LocalStorage'a veri yazar.

```javascript
// Kullanım
storage.set("reservations", reservationArray);

// Parametreler
key: string - Storage anahtarı
value: any - Saklanacak veri

// Dönüş değeri
boolean - İşlem başarı durumu
```

#### `storage.remove(key)`
LocalStorage'dan veri siler.

```javascript
// Kullanım
storage.remove("reservations");

// Parametreler
key: string - Silinecek anahtar

// Dönüş değeri
boolean - İşlem başarı durumu
```

## 🏠 Home Module (`home.js`)

#### `initHomePage()`
Ana sayfayı başlatır.

```javascript
// Kullanım
initHomePage();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `loadRestaurants()`
Restoran verilerini yükler.

```javascript
// Kullanım
loadRestaurants();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `filterRestaurants(location)`
Restoranları lokasyona göre filtreler.

```javascript
// Kullanım
filterRestaurants("Beşiktaş");

// Parametreler
location: string - Filtrelenecek lokasyon

// Dönüş değeri
void
```

## 📅 Reservation Module (`reservation.js`)

#### `initReservationForm()`
Rezervasyon formunu başlatır.

```javascript
// Kullanım
initReservationForm();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `validateField(field)`
Form alanını doğrular.

```javascript
// Kullanım
const isValid = validateField(emailInput);

// Parametreler
field: HTMLElement - Doğrulanacak form alanı

// Dönüş değeri
boolean - Doğrulama sonucu
```

#### `saveReservation(reservation)`
Rezervasyonu LocalStorage'a kaydeder.

```javascript
// Kullanım
saveReservation({
  id: "unique-id",
  fullName: "John Doe",
  email: "john@example.com",
  // ... diğer alanlar
});

// Parametreler
reservation: object - Rezervasyon verisi

// Dönüş değeri
void
```

## 👨‍💼 Admin Module (`admin.js`)

#### `initAdminDashboard()`
Admin panelini başlatır.

```javascript
// Kullanım
initAdminDashboard();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `deleteReservation(id)`
Belirtilen rezervasyonu siler.

```javascript
// Kullanım
deleteReservation("reservation-id-123");

// Parametreler
id: string - Silinecek rezervasyon ID'si

// Dönüş değeri
void
```

#### `filterByDate()`
Rezervasyonları tarihe göre filtreler.

```javascript
// Kullanım
filterByDate();

// Parametreler
Yok (dateFilter input'undan değer alır)

// Dönüş değeri
void
```

## 🧮 Tools Module (`tools.js`)

#### `initCafeTools()`
Tüm hesaplama araçlarını başlatır.

```javascript
// Kullanım
initCafeTools();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `initTipCalculator()`
Bahşiş hesaplayıcısını başlatır.

```javascript
// Kullanım
initTipCalculator();

// Parametreler
Yok

// Dönüş değeri
void
```

## 🏪 Restaurant Module (`restaurant.js`)

#### `initRestaurantPage()`
Restoran detay sayfasını başlatır.

```javascript
// Kullanım
initRestaurantPage();

// Parametreler
Yok

// Dönüş değeri
void
```

#### `getRestaurantIdFromUrl()`
URL'den restoran ID'sini alır.

```javascript
// Kullanım
const restaurantId = getRestaurantIdFromUrl();

// Parametreler
Yok

// Dönüş değeri
string|null - Restoran ID'si
```

## 📡 Event System API

### Global Events

#### `DOMContentLoaded`
Sayfa yüklendiğinde tetiklenir.

```javascript
// Kullanım
document.addEventListener("DOMContentLoaded", initFunction);
```

#### `storage`
LocalStorage değişikliklerinde tetiklenir.

```javascript
// Kullanım
window.addEventListener("storage", handleStorageChange);
```

### Custom Events

#### `reservationSaved`
Rezervasyon kaydedildiğinde tetiklenir.

```javascript
// Tetikleme
const event = new CustomEvent('reservationSaved', {
  detail: { reservation: reservationData }
});
document.dispatchEvent(event);

// Dinleme
document.addEventListener('reservationSaved', (event) => {
  console.log('Reservation saved:', event.detail.reservation);
});
```

## 🎯 Component APIs

### Restaurant Card Component

#### Data Structure
```javascript
const restaurantData = {
  id: "rest_1",
  name: "ReserVee Beşiktaş",
  image: "https://example.com/image.jpg",
  rating: 4.5,
  cuisine: "Turkish Coffee & Pastries",
  address: "Barbaros Bulvarı No:15, Beşiktaş",
  phone: "+90 212 555 0101",
  email: "besiktas@reservee.com",
  priceRange: "Moderate (₺15-30 per person)",
  priceSymbol: "₺₺",
  features: ["WiFi", "Outdoor Seating", "Pet Friendly"],
  description: "Restaurant description...",
  openingHours: {
    weekdays: "8:00 AM - 10:00 PM",
    weekends: "9:00 AM - 11:00 PM"
  },
  menuItems: [
    {
      name: "Turkish Coffee",
      price: "₺12",
      image: "https://example.com/coffee.jpg"
    }
  ],
  reviews: [
    {
      name: "Ahmet K.",
      rating: 5,
      comment: "Excellent coffee!",
      date: "2024-01-15"
    }
  ]
};
```

### Reservation Data Structure
```javascript
const reservationData = {
  id: "unique-id",
  restaurantId: "rest_1",
  fullName: "John Doe",
  phoneNumber: "+90 555 123 4567",
  email: "john@example.com",
  date: "2024-01-15",
  time: "19:00",
  guests: "4",
  specialRequests: "Window table please",
  createdAt: "2024-01-10T10:30:00.000Z"
};
```

## 🔒 Error Handling

### Error Types
```javascript
// Validation Error
{
  type: "VALIDATION_ERROR",
  field: "email",
  message: "Please enter a valid email address"
}

// Storage Error
{
  type: "STORAGE_ERROR",
  operation: "set",
  message: "Failed to save data to localStorage"
}

// Network Error
{
  type: "NETWORK_ERROR",
  message: "Failed to load restaurant data"
}
```

### Error Handling Functions
```javascript
// Global error handler
const handleError = (error, context) => {
  console.error(`Error in ${context}:`, error);
  // Error reporting logic
};

// Validation error display
const showFieldError = (field, message) => {
  const errorElement = document.getElementById(`${field.name}Error`);
  if (errorElement) {
    errorElement.textContent = message;
    field.classList.add('error');
  }
};
```

## 📊 Performance APIs

### Debounce Implementation
```javascript
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
```

### Lazy Loading
```javascript
const lazyLoad = (selector) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Load content
        observer.unobserve(entry.target);
      }
    });
  });
  
  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
};
```

---

**API Versiyonu**: 1.0.0
**Son Güncelleme**: Ocak 2024
