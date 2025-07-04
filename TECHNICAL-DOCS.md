# ReserVee Teknik Dokümantasyon

## 🏗️ Sistem Mimarisi

### Genel Mimari

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │    Business     │    │      Data       │
│     Layer       │    │     Logic       │    │     Layer       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ HTML Templates  │    │ JavaScript      │    │ LocalStorage    │
│ SCSS Styles     │◄──►│ Functions       │◄──►│ JSON Data       │
│ Bootstrap UI    │    │ Event Handlers  │    │ Browser APIs    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Function-Based Architecture

```javascript
// Modüler fonksiyon yapısı
┌─ utils.js (Yardımcı fonksiyonlar)
├─ main.js (Ana koordinasyon)
├─ home.js (Ana sayfa logic)
├─ reservation.js (Rezervasyon logic)
├─ restaurant.js (Restoran detay logic)
├─ admin.js (Admin panel logic)
└─ tools.js (Hesaplama araçları)
```

## 📁 Dosya Yapısı ve Sorumluluklar

### JavaScript Modülleri

#### `utils.js` - Yardımcı Fonksiyonlar

```javascript
// Exported Functions:
-formatCurrency(amount) - // Para formatı
  formatDate(dateString) - // Tarih formatı
  formatTime(timeString) - // Saat formatı
  isValidEmail(email) - // Email validasyonu
  isValidPhone(phone) - // Telefon validasyonu
  generateId() - // Unique ID üretimi
  debounce(func, delay) - // Debounce utility
  storage.get(key) - // LocalStorage okuma
  storage.set(key, value) - // LocalStorage yazma
  storage.remove(key); // LocalStorage silme
```

#### `main.js` - Ana Koordinasyon

```javascript
// Global Functions:
-initializeApp() - // Uygulama başlatma
  setupGlobalEventListeners() - // Global event'ler
  handleNavigation() - // Sayfa navigasyonu
  updateActiveNavLink(); // Aktif nav link güncelleme
```

#### `home.js` - Ana Sayfa Logic

```javascript
// Core Functions:
-initHomePage() - // Ana sayfa başlatma
  loadRestaurants() - // Restoran verilerini yükleme
  renderRestaurants() - // Restoran kartlarını render etme
  filterRestaurants() - // Restoran filtreleme
  createRestaurantCard() - // Restoran kartı oluşturma
  attachEventListeners(); // Event listener'ları ekleme
```

#### `reservation.js` - Rezervasyon Logic

```javascript
// Form Management:
-initReservationForm() - // Form başlatma
  validateField(field) - // Alan validasyonu
  validateForm() - // Tüm form validasyonu
  handleSubmit(event) - // Form gönderimi
  saveReservation(data) - // Rezervasyon kaydetme
  showSuccess(reservation) - // Başarı mesajı
  resetForm() - // Form sıfırlama
  // Restaurant Integration:
  getRestaurantIdFromUrl() - // URL'den restoran ID'si
  showSelectedRestaurant(); // Seçili restoran gösterimi
```

#### `restaurant.js` - Restoran Detay Logic

```javascript
// Data Management:
-initRestaurantPage() - // Sayfa başlatma
  loadRestaurantData() - // Restoran verilerini yükleme
  loadMenuItems() - // Menü öğelerini yükleme
  loadReviews() - // Yorumları yükleme
  // UI Rendering:
  showRestaurantNotFound() - // Restoran bulunamadı
  attachEventListeners(); // Event listener'lar
```

#### `admin.js` - Admin Panel Logic

```javascript
// Data Operations:
-initAdminDashboard() - // Dashboard başlatma
  loadReservations() - // Rezervasyonları yükleme
  filterByDate() - // Tarih filtreleme
  sortReservations() - // Sıralama
  deleteReservation(id) - // Rezervasyon silme
  clearAllData() - // Tüm veri temizleme
  // UI Management:
  renderReservations() - // Rezervasyon tablosu
  createTableRow(reservation) - // Tablo satırı oluşturma
  updateStats(); // İstatistik güncelleme
```

#### `tools.js` - Hesaplama Araçları

```javascript
// Calculator Functions:
-initCafeTools() - // Araçları başlatma
  initTipCalculator() - // Bahşiş hesaplayıcı
  initBillSplitter() - // Hesap bölme
  initDiscountCalculator() - // İndirim hesaplayıcı
  initReservationCostCalculator() - // Maliyet tahmini
  initLoyaltyPointsCalculator(); // Sadakat puanı
```

### SCSS Yapısı

#### `main.scss` - Ana SCSS Dosyası

```scss
@use "sass:color";
@import "variables"; // SCSS değişkenleri
@import "reset"; // CSS reset
@import "layout"; // Layout stilleri
@import "components"; // Komponent stilleri
@import "pages"; // Sayfa-özel stiller
@import "bootstrap-navbar"; // Bootstrap özelleştirmeleri
```

#### `_variables.scss` - SCSS Değişkenleri

```scss
// Color Palette
$primary-color: #2c3e50;
$secondary-color: #3498db;
$accent-color: #e74c3c;
$success-color: #27ae60;
$warning-color: #f39c12;

// Typography
$font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
$font-size-base: 16px;
$line-height-base: 1.6;

// Spacing
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// Breakpoints
$mobile: 768px;
$tablet: 992px;
$desktop: 1200px;
```

## 🔄 Veri Akışı

### Rezervasyon Veri Akışı

```
1. User Input (reservation.html)
   ↓
2. Form Validation (reservation.js)
   ↓
3. Data Processing (utils.js)
   ↓
4. LocalStorage Save (storage.set)
   ↓
5. Success Feedback (UI Update)
   ↓
6. Admin Panel Display (admin.js)
```

### Restoran Veri Akışı

```
1. Static Data (restaurant.js)
   ↓
2. URL Parameter Processing
   ↓
3. Data Filtering & Selection
   ↓
4. UI Rendering (DOM Manipulation)
   ↓
5. Event Listener Attachment
```

## 🎯 Event Handling Sistemi

### Global Event Listeners

```javascript
// main.js
document.addEventListener("DOMContentLoaded", initializeApp);
window.addEventListener("resize", handleResize);
window.addEventListener("storage", handleStorageChange);
```

### Page-Specific Events

```javascript
// reservation.js
form.addEventListener("submit", handleSubmit);
inputs.forEach((input) => {
  input.addEventListener("blur", validateField);
  input.addEventListener("input", clearError);
});

// admin.js
dateFilter.addEventListener("change", filterByDate);
sortSelect.addEventListener("change", sortReservations);
clearAllButton.addEventListener("click", clearAllData);
```

### Debounced Events

```javascript
// tools.js - Real-time hesaplama
const calculateTip = debounce(() => {
  // Hesaplama logic
}, 300);

billAmount.addEventListener("input", calculateTip);
```

## 💾 Veri Yönetimi

### LocalStorage Schema

```javascript
// Rezervasyon verisi
{
  "reservations": [
    {
      "id": "uuid-v4",                    // Unique identifier
      "restaurantId": "rest_1",           // Restoran referansı
      "fullName": "string",               // Müşteri adı
      "phoneNumber": "string",            // Telefon (format: +90 5XX XXX XXXX)
      "email": "string",                  // Email (format: user@domain.com)
      "date": "YYYY-MM-DD",              // Rezervasyon tarihi
      "time": "HH:MM",                   // Rezervasyon saati
      "guests": "number",                 // Misafir sayısı (1-20)
      "specialRequests": "string|null",   // Özel istekler
      "createdAt": "ISO-8601"            // Oluşturulma zamanı
    }
  ]
}
```

### Storage Utility Functions

```javascript
// utils.js
const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage set error:", error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Storage remove error:", error);
      return false;
    }
  },
};
```

## 🔒 Güvenlik ve Validasyon

### Input Validation

```javascript
// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Turkish format)
const isValidPhone = (phone) => {
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Date validation
const isValidDate = (dateString) => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
};
```

### XSS Protection

```javascript
// HTML encoding for user input
const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

// Safe DOM manipulation
const safeSetTextContent = (element, text) => {
  if (element && typeof text === "string") {
    element.textContent = text;
  }
};
```

### Error Handling

```javascript
// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  // Error reporting logic
});

// Promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});
```

## 🎨 UI/UX Patterns

### Responsive Design Patterns

```scss
// Mobile-first approach
.restaurant-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: $tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $desktop) {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Component Patterns

```scss
// BEM methodology
.restaurant-card {
  &__image {
  }
  &__content {
  }
  &__title {
  }
  &__description {
  }
  &__actions {
  }

  &--featured {
    border: 2px solid $accent-color;
  }
}
```

### State Management

```javascript
// UI state management
const UIState = {
  currentPage: "home",
  isLoading: false,
  filters: {
    location: "all",
    date: null,
  },

  updateState(newState) {
    Object.assign(this, newState);
    this.render();
  },

  render() {
    // UI güncelleme logic
  },
};
```

## 🚀 Performance Optimizations

### Lazy Loading

```javascript
// Image lazy loading
const observerOptions = {
  threshold: 0.1,
  rootMargin: "50px",
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
}, observerOptions);
```

### Debouncing

```javascript
// Search input debouncing
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};
```

### Memory Management

```javascript
// Event listener cleanup
const cleanup = () => {
  // Remove event listeners
  elements.forEach((el) => {
    el.removeEventListener("click", handler);
  });

  // Clear intervals
  clearInterval(autoRefreshInterval);

  // Clear references
  elements = null;
};
```

## 🧪 Testing Strategies

### Unit Testing Approach

```javascript
// Test utility functions
describe("Utils", () => {
  test("formatCurrency should format Turkish Lira", () => {
    expect(formatCurrency(1234.56)).toBe("₺1.234,56");
  });

  test("isValidEmail should validate email format", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
  });
});
```

### Integration Testing

```javascript
// Test form submission flow
describe("Reservation Form", () => {
  test("should save reservation to localStorage", () => {
    // Setup
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      // ...
    };

    // Execute
    saveReservation(formData);

    // Assert
    const saved = storage.get("reservations");
    expect(saved).toContainEqual(expect.objectContaining(formData));
  });
});
```

### E2E Testing Scenarios

```javascript
// Cypress test example
describe("Reservation Flow", () => {
  it("should complete full reservation process", () => {
    cy.visit("/");
    cy.get('[data-testid="restaurant-card"]').first().click();
    cy.get('[data-testid="make-reservation"]').click();
    cy.get("#fullName").type("John Doe");
    cy.get("#email").type("john@example.com");
    // ... fill form
    cy.get('[type="submit"]').click();
    cy.get('[data-testid="success-message"]').should("be.visible");
  });
});
```

## 📊 Monitoring ve Analytics

### Performance Monitoring

```javascript
// Performance metrics
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});

performanceObserver.observe({ entryTypes: ["measure", "navigation"] });
```

### Error Tracking

```javascript
// Error tracking
const trackError = (error, context) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // Send to error tracking service
  console.error("Tracked error:", errorData);
};
```

### User Analytics

```javascript
// User interaction tracking
const trackEvent = (eventName, properties) => {
  const eventData = {
    event: eventName,
    properties: properties,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };

  // Send to analytics service
  console.log("Tracked event:", eventData);
};
```

---

## 🔧 Development Workflow

### Code Standards

- **ES6+ JavaScript**: Modern syntax kullanımı
- **Function-based**: Class yerine function tercih
- **Modular**: Her dosya belirli sorumluluk
- **Commented**: Kritik bölümler açıklanmış
- **Consistent**: Tutarlı naming convention

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-description
git commit -m "fix: resolve bug description"
git push origin fix/bug-description
```

### Build Process

```bash
# Development
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Build preview
npm run lint         # Code linting
```

## 🌐 Deployment Kılavuzu

### Netlify Deployment

```bash
# 1. Build oluştur
npm run build

# 2. Netlify CLI kurulumu
npm install -g netlify-cli

# 3. Netlify'a login
netlify login

# 4. Site oluştur ve deploy et
netlify deploy --prod --dir=dist
```

### Vercel Deployment

```bash
# 1. Vercel CLI kurulumu
npm install -g vercel

# 2. Deploy
vercel --prod

# 3. Domain ayarları
vercel domains add yourdomain.com
```

### GitHub Pages Deployment

```bash
# 1. Build oluştur
npm run build

# 2. gh-pages branch oluştur
git checkout -b gh-pages
git add dist/
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Environment Variables

```bash
# .env.production
VITE_APP_NAME=ReserVee
VITE_API_URL=https://api.reservee.com
VITE_ANALYTICS_ID=GA-XXXXXXXXX
```

## 🔮 Future Roadmap

### Phase 1: Backend Integration

- REST API development
- Database integration (PostgreSQL)
- User authentication system
- Real-time notifications

### Phase 2: Advanced Features

- Payment integration (Stripe/PayPal)
- Email/SMS notifications
- Multi-language support
- Advanced analytics

### Phase 3: Mobile App

- React Native app
- Push notifications
- Offline functionality
- Geolocation services

### Phase 4: Enterprise Features

- Multi-tenant architecture
- Advanced reporting
- Integration APIs
- White-label solutions

**Son Güncelleme**: Ocak 2024
**Versiyon**: 1.0.0
