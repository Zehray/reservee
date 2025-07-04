# ReserVee Backend Kurulum Kılavuzu

## 🚀 Hızlı Başlangıç

### 1. Backend Bağımlılıklarını Yükle
```bash
cd reserVee/backend
npm install
```

### 2. Backend Sunucusunu Başlat
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Frontend'i Başlat (Ayrı Terminal)
```bash
cd reserVee
npm run dev
```

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Reservations
```
GET    /api/reservations           # Tüm rezervasyonları getir
GET    /api/reservations/:id       # Belirli rezervasyonu getir
POST   /api/reservations           # Yeni rezervasyon oluştur
PUT    /api/reservations/:id       # Rezervasyonu güncelle
DELETE /api/reservations/:id       # Rezervasyonu sil
DELETE /api/reservations           # Tüm rezervasyonları sil
```

### Restaurants
```
GET /api/restaurants               # Tüm restoranları getir
GET /api/restaurants/:id           # Belirli restoranı getir
GET /api/restaurants/:id/reservations  # Restoranın rezervasyonları
GET /api/restaurants/meta/locations    # Mevcut lokasyonlar
GET /api/restaurants/meta/cuisines     # Mevcut mutfak türleri
```

## 🔧 Test Etme

### 1. Backend Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Rezervasyon Oluşturma
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "restaurantId": "rest_1",
    "fullName": "Test User",
    "phoneNumber": "+90 555 123 4567",
    "email": "test@example.com",
    "date": "2024-02-01",
    "time": "19:00",
    "guests": "2"
  }'
```

### 3. Rezervasyonları Listeleme
```bash
curl http://localhost:5000/api/reservations
```

## 🌐 Deploy Seçenekleri

### 1. Render.com (Ücretsiz)
```bash
# 1. GitHub'a push et
git add .
git commit -m "Add backend"
git push origin main

# 2. render.com'da yeni Web Service oluştur
# 3. GitHub repo'yu bağla
# 4. Build Command: cd backend && npm install
# 5. Start Command: cd backend && npm start
```

### 2. Railway (Kolay)
```bash
# 1. Railway CLI kur
npm install -g @railway/cli

# 2. Login ve deploy
railway login
railway init
railway up
```

### 3. Heroku
```bash
# 1. Heroku CLI kur
# 2. Login ve app oluştur
heroku login
heroku create reservee-backend

# 3. Deploy
git subtree push --prefix backend heroku main
```

## 📋 Production Checklist

### Backend
- [ ] Environment variables ayarlandı
- [ ] CORS origins güncellendi
- [ ] Error handling eklendi
- [ ] Logging sistemi kuruldu
- [ ] Rate limiting eklendi
- [ ] Database bağlantısı (opsiyonel)

### Frontend
- [ ] API URL production'a güncellendi
- [ ] Error handling test edildi
- [ ] Fallback mekanizması çalışıyor
- [ ] Loading states eklendi

## 🔒 Güvenlik

### CORS Ayarları
```javascript
// server.js
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-domain.com"
  ],
  credentials: true
}));
```

### Rate Limiting (Opsiyonel)
```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🗄️ Database Entegrasyonu (Opsiyonel)

### MongoDB
```bash
npm install mongoose
```

### PostgreSQL
```bash
npm install pg
```

### SQLite (Basit)
```bash
npm install sqlite3
```

## 📊 Monitoring

### Simple Logging
```javascript
// middleware/logger.js
export const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};
```

### Health Monitoring
```javascript
// routes/health.js
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});
```

## 🚨 Sorun Giderme

### Backend Başlamıyor
```bash
# Port kontrolü
lsof -i :5000

# Node version kontrolü
node --version  # >= 16.0.0 olmalı
```

### CORS Hatası
```javascript
// server.js - CORS ayarlarını kontrol et
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
```

### API Bağlantı Hatası
```bash
# Backend çalışıyor mu?
curl http://localhost:5000/api/health

# Frontend environment variables
cat .env
```

## 📞 Destek

- **Backend Port**: 5000
- **Frontend Port**: 5173
- **API Base URL**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health
