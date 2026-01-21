# ТЕХНИК ТОПШИРИКНОМА (TZ)
## Call Center Operator Ranking Dashboard - Backend API Talablari

---

## 1. LOYIHA HAQIDA UMUMIY MA'LUMOT

### 1.1 Loyiha Nomi
**Call Center Operator Ranking Dashboard** - Call center operatorlarini baholash va reytinglash tizimi

### 1.2 Maqsad
Ushbu frontend ilovasi call center operatorlarining real vaqt ko'rsatkichlarini ko'rsatish, reytinglash va tahlil qilish uchun mo'ljallangan. Backend API operatorlar ma'lumotlarini boshqarish, statistikalarni hisoblash va frontend bilan integratsiya qilish uchun kerak.

### 1.3 Frontend Texnologiyalari
- **Framework:** React 19.1.0 + TypeScript
- **Routing:** React Router v7
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS 4.x
- **Charts:** Recharts
- **i18n:** react-i18next (Uzbek, Russian, English, Cymraeg)
- **Build Tool:** Vite 7

---

## 2. ARXITEKTURA VA INTEGRATION

### 2.1 Backend Requirements
- **API Type:** RESTful API (JSON format)
- **Authentication:** Token-based (JWT recommended)
- **CORS:** Frontend domain'lar uchun ochiq bo'lishi kerak
- **Response Format:** JSON
- **Error Handling:** Standard HTTP status kodlari bilan

### 2.2 Environment Variables
Frontend `.env` faylida quyidagilar bo'ladi:
```env
VITE_APP_URL_PROD="https://api.yourdomain.com"
VITE_APP_URL_DEV="http://localhost:3000"
```

### 2.3 Base URL Structure
```
Production: https://api.yourdomain.com/api/v1
Development: http://localhost:3000/api/v1
```

---

## 3. DATA MODELS (TypeScript Interfaces)

### 3.1 Operator Model
```typescript
interface Operator {
  id: string;                    // Unique identifier (e.g., "1", "2", "248")
  name: string;                  // To'liq ism (e.g., "Rixsiyeva Shaxnoza Ravshan qizi")
  avatar: string;                // Rasm URL yoki path (e.g., "/operatorImg/operator.jpg")
  rank: number;                  // Joriy reyting pozitsiyasi (1, 2, 3, ...)
  points: number;                // Umumiy ball (e.g., 1204)
  count: number;                 // Oy davomidagi qo'ng'iroqlar soni (e.g., 104)
  kpi: number;                   // KPI ko'rsatkichi (0-100, e.g., 89.5)
  average: string | number;      // O'rtacha vaqt ("02:24" formatda yoki soniya)
  behavior: number;              // Xulq-atvor bali (1-10)
  stars?: number;                // Yulduzlar soni (optional, 1-5)
  rankChange?: number;           // Reyting o'zgarishi (+2, -1, 0 yoki null)
  activityData?: number[];       // 24 soatlik faollik ma'lumotlari (optional)
  monthlyRankings?: number[];    // 12 oylik reyting tarixi (optional)
  dailyRankings?: number[];      // 23 kunlik reyting tarixi (optional)
  topMedalCount?: number;        // Yil davomida top 3 ga kirgan hollar soni (optional)
}
```

### 3.2 Operator Group Model
```typescript
interface OperatorGroup {
  id: string;                    // Guruh ID (e.g., "group-1", "group-2")
  title: string;                 // Guruh nomi (e.g., "TOP 10 OPERATORS", "TOP 11-20 OPERATORS")
  operators: Operator[];         // Guruh ichidagi operatorlar ro'yxati
}
```

### 3.3 Filters & Parameters
```typescript
type Quarter = '1' | '2' | '3' | '4';
type MonthFilter = 'last-month' | 'current-month' | 'select-month';
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
```

---

## 4. API ENDPOINTS

### 4.1 Operatorlar Ro'yxatini Olish
**Endpoint:** `GET /api/v1/operators`

**Query Parameters:**
- `quarter` (optional): `1` | `2` | `3` | `4` - Chorak bo'yicha filterlash
- `month` (optional): `01`-`12` - Oy bo'yicha filterlash
- `monthFilter` (optional): `last-month` | `current-month` | `select-month`
- `limit` (optional): number - Natijalar soni (default: 100)
- `offset` (optional): number - Pagination uchun (default: 0)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Rixsiyeva Shaxnoza Ravshan qizi",
      "avatar": "/operatorImg/operator_1.jpg",
      "rank": 1,
      "points": 1204,
      "count": 104,
      "kpi": 89.5,
      "average": "01:45",
      "behavior": 9,
      "rankChange": 2,
      "dailyRankings": [5, 1, 4, 6, 12, 11, 13, 5, 7, 4, 9, 4, 6, 7, 8, 5, 6, 4, 3, 2, 1, 2, 1],
      "monthlyRankings": [1, 5, 5, 4, 4, 5, 6, 4, 8, 4, 4, 2],
      "topMedalCount": 10
    }
  ],
  "pagination": {
    "total": 248,
    "limit": 100,
    "offset": 0,
    "hasMore": true
  }
}
```

**Status Codes:**
- `200 OK` - Muvaffaqiyatli
- `400 Bad Request` - Noto'g'ri parametrlar
- `401 Unauthorized` - Autentifikatsiya xatosi
- `500 Internal Server Error` - Server xatosi

---

### 4.2 Guruhlangan Operatorlar Ro'yxati
**Endpoint:** `GET /api/v1/operators/groups`

**Query Parameters:**
- `quarter` (optional): `1` | `2` | `3` | `4`
- `month` (optional): `01`-`12`
- `groupSize` (optional): number - Har bir guruhdagi operatorlar soni (default: 10)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": "group-1",
      "title": "TOP 10 OPERATORS",
      "operators": [
        {
          "id": "1",
          "name": "Rixsiyeva Shaxnoza Ravshan qizi",
          "rank": 1,
          // ... operator fields
        }
      ]
    },
    {
      "id": "group-2",
      "title": "TOP 11-20 OPERATORS",
      "operators": [...]
    }
  ]
}
```

---

### 4.3 Bitta Operator Ma'lumotlari
**Endpoint:** `GET /api/v1/operators/:id`

**URL Parameters:**
- `id` (required): string - Operator ID

**Response Example:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Rixsiyeva Shaxnoza Ravshan qizi",
    "avatar": "/operatorImg/operator_1.jpg",
    "rank": 1,
    "points": 1204,
    "count": 104,
    "kpi": 89.5,
    "average": "01:45",
    "behavior": 9,
    "rankChange": 2,
    "dailyRankings": [5, 1, 4, 6, 12, 11, 13, 5, 7, 4, 9, 4, 6, 7, 8, 5, 6, 4, 3, 2, 1, 2, 1],
    "monthlyRankings": [1, 5, 5, 4, 4, 5, 6, 4, 8, 4, 4, 2],
    "topMedalCount": 10,
    "activityData": [45, 52, 48, 61, 58, 55, 62, 59, 56, 64, 61, 58, 65, 62, 59, 66, 63, 60, 67, 64, 61, 68, 65, 62]
  }
}
```

**Status Codes:**
- `200 OK` - Muvaffaqiyatli
- `404 Not Found` - Operator topilmadi
- `401 Unauthorized` - Autentifikatsiya xatosi

---

### 4.4 Operator Statistikasi (Kecha)
**Endpoint:** `GET /api/v1/operators/:id/yesterday-stats`

**Response Example:**
```json
{
  "success": true,
  "data": {
    "operatorId": "1",
    "date": "2026-01-12",
    "dailyCount": 98,
    "dailyAverage": "01:52",
    "dailyKpi": 87.2
  }
}
```

---

### 4.5 Operator Faollik Ma'lumotlari
**Endpoint:** `GET /api/v1/operators/:id/activity`

**Query Parameters:**
- `period` (optional): `daily` | `weekly` | `monthly` (default: `daily`)
- `date` (optional): YYYY-MM-DD format

**Response Example:**
```json
{
  "success": true,
  "data": {
    "operatorId": "1",
    "period": "daily",
    "date": "2026-01-13",
    "activityData": [45, 52, 48, 61, 58, 55, 62, 59, 56, 64, 61, 58, 65, 62, 59, 66, 63, 60, 67, 64, 61, 68, 65, 62]
  }
}
```

---

### 4.6 Dashboard Umumiy Statistika
**Endpoint:** `GET /api/v1/dashboard/stats`

**Query Parameters:**
- `quarter` (optional): `1` | `2` | `3` | `4`
- `month` (optional): `01`-`12`

**Response Example:**
```json
{
  "success": true,
  "data": {
    "totalOperators": 248,
    "activeOperators": 235,
    "averageKpi": 85.4,
    "totalCalls": 24567,
    "averageCallTime": "02:15",
    "topPerformer": {
      "id": "1",
      "name": "Rixsiyeva Shaxnoza Ravshan qizi",
      "rank": 1,
      "points": 1204
    }
  }
}
```

---

## 5. MA'LUMOTLAR HISOBLASH LOGIKASI

### 5.1 KPI Hisoblash
KPI (Key Performance Indicator) quyidagi omillarga asoslanadi:
- **Qo'ng'iroqlar soni** (count): ko'proq qo'ng'iroqlar = yuqori ball
- **O'rtacha vaqt** (average): qisqaroq vaqt = yuqori ball
- **Xulq-atvor** (behavior): 1-10 oralig'ida
- **Mijoz baxti** (agar mavjud bo'lsa)

**Tavsiya etilgan formula:**
```
KPI = (count_weight * normalized_count + 
       time_weight * normalized_time + 
       behavior_weight * (behavior/10)) * 100

Bu yerda:
- count_weight = 0.4 (40%)
- time_weight = 0.3 (30%)
- behavior_weight = 0.3 (30%)
```

### 5.2 Reyting Hisoblash
Operatorlar KPI asosida tartiblangan bo'lishi kerak:
- Eng yuqori KPI = Rank 1
- Teng KPI bo'lsa, qo'shimcha omillar: points, count

### 5.3 Rank Change Hisoblash
- Bugungi rank - Kechagi rank = rankChange
- Positive qiymat (+2) = ko'tarildi
- Negative qiymat (-1) = tushdi
- 0 = o'zgarmadi

### 5.4 Top Medal Count
Yil davomida operatorning top 3 (rank 1, 2, 3) ga kirgan kunlar soni

---

## 6. RASMLAR VA MEDIA

### 6.1 Operator Avatar
- **Format:** JPG, PNG, WebP
- **Recommended Size:** 200x200px minimum
- **Max File Size:** 500KB
- **Storage:** Backend server yoki CDN (S3, Cloudinary, etc.)

**URL Pattern:**
```
/operatorImg/{operator_name}_{id}.jpg
Yoki
https://cdn.yourdomain.com/operators/{id}/avatar.jpg
```

### 6.2 Background Images
Frontend o'z background rasmlarini saqlaydi, backend tarafida background rasmlar kerak emas.

---

## 7. FILTERLASH VA QIDIRUV

### 7.1 Vaqt Bo'yicha Filterlash
- **Chorak** (Quarter): Q1 (01-03), Q2 (04-06), Q3 (07-09), Q4 (10-12)
- **Oy** (Month): 01-12
- **Oldingi/Joriy oy** (Month Filter): `last-month`, `current-month`

### 7.2 Qidiruv
**Endpoint:** `GET /api/v1/operators/search`

**Query Parameters:**
- `q` (required): string - Qidiruv so'zi
- `limit` (optional): number (default: 20)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Rixsiyeva Shaxnoza Ravshan qizi",
      "avatar": "/operatorImg/operator_1.jpg",
      "rank": 1
    }
  ]
}
```

---

## 8. REAL-TIME UPDATES (OPTIONAL)

Agar real-time yangilanishlar kerak bo'lsa:

### 8.1 WebSocket Connection
```
wss://api.yourdomain.com/ws
```

### 8.2 WebSocket Events
```json
// Operator yangilandi
{
  "event": "operator:updated",
  "data": {
    "id": "1",
    "rank": 1,
    "points": 1205,
    "kpi": 89.6
  }
}

// Reyting o'zgardi
{
  "event": "ranking:changed",
  "data": {
    "operatorId": "1",
    "oldRank": 2,
    "newRank": 1
  }
}
```

---

## 9. ERROR HANDLING

### 9.1 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "OPERATOR_NOT_FOUND",
    "message": "Operator with ID '999' not found",
    "details": {}
  }
}
```

### 9.2 Error Codes
- `OPERATOR_NOT_FOUND` - Operator topilmadi
- `INVALID_PARAMETERS` - Noto'g'ri parametrlar
- `UNAUTHORIZED` - Autentifikatsiya kerak
- `FORBIDDEN` - Ruxsat yo'q
- `SERVER_ERROR` - Ichki server xatosi
- `RATE_LIMIT_EXCEEDED` - So'rovlar soni oshib ketdi

---

## 10. AUTHENTICATION & AUTHORIZATION

### 10.1 JWT Token
**Login Endpoint:** `POST /api/v1/auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  }
}
```

### 10.2 Token Usage
Frontend har bir so'rovda token yuboradi:
```
Authorization: Bearer {token}
```

### 10.3 Token Refresh
**Endpoint:** `POST /api/v1/auth/refresh`

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 11. PERFORMANCE REQUIREMENTS

### 11.1 Response Time
- **List endpoints:** < 500ms
- **Single operator:** < 200ms
- **Search:** < 300ms
- **Dashboard stats:** < 400ms

### 11.2 Caching Strategy
- **Redis** yoki boshqa cache system ishlatish tavsiya etiladi
- Operators list: 5 daqiqa cache
- Single operator: 2 daqiqa cache
- Dashboard stats: 10 daqiqa cache

### 11.3 Rate Limiting
- **Per IP:** 100 requests/minute
- **Per User:** 200 requests/minute

---

## 12. DATA VALIDATION

### 12.1 Operator Data Validation
```typescript
{
  id: string (required, unique),
  name: string (required, 3-100 chars),
  rank: number (required, > 0),
  points: number (required, >= 0),
  count: number (required, >= 0),
  kpi: number (required, 0-100),
  average: string | number (required, format: "MM:SS" or seconds),
  behavior: number (required, 1-10),
  avatar: string (valid URL or path)
}
```

---

## 13. TESTING REQUIREMENTS

### 13.1 Backend Testing
- **Unit Tests:** Har bir endpoint uchun
- **Integration Tests:** Ma'lumotlar bazasi bilan
- **Load Testing:** 1000+ concurrent users
- **API Documentation:** Swagger/OpenAPI

### 13.2 Test Data
Backend development uchun test ma'lumotlar:
- Minimum 248 operator
- Har xil rank, points, kpi qiymatlari
- Historical data (dailyRankings, monthlyRankings)

---

## 14. DEPLOYMENT & INFRASTRUCTURE

### 14.1 Backend Stack (Tavsiya)
- **Runtime:** Node.js 18+ / Python 3.11+ / Go 1.21+
- **Framework:** Express/Fastify (Node.js), FastAPI (Python), Gin (Go)
- **Database:** PostgreSQL 14+ yoki MongoDB 6+
- **Cache:** Redis 7+
- **File Storage:** AWS S3 / Azure Blob / MinIO

### 14.2 Database Schema (SQL Example)
```sql
-- Operators table
CREATE TABLE operators (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  avatar VARCHAR(255),
  rank INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  count INTEGER DEFAULT 0,
  kpi DECIMAL(5,2) DEFAULT 0,
  average VARCHAR(10),
  behavior INTEGER CHECK (behavior >= 1 AND behavior <= 10),
  rank_change INTEGER,
  top_medal_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily rankings (history)
CREATE TABLE daily_rankings (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(50) REFERENCES operators(id),
  rank INTEGER NOT NULL,
  date DATE NOT NULL,
  points INTEGER,
  kpi DECIMAL(5,2),
  UNIQUE(operator_id, date)
);

-- Monthly rankings (history)
CREATE TABLE monthly_rankings (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(50) REFERENCES operators(id),
  rank INTEGER NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  points INTEGER,
  kpi DECIMAL(5,2),
  UNIQUE(operator_id, year, month)
);

-- Activity data
CREATE TABLE activity_data (
  id SERIAL PRIMARY KEY,
  operator_id VARCHAR(50) REFERENCES operators(id),
  date DATE NOT NULL,
  hour INTEGER CHECK (hour >= 0 AND hour <= 23),
  call_count INTEGER DEFAULT 0,
  UNIQUE(operator_id, date, hour)
);

-- Indexes for performance
CREATE INDEX idx_operators_rank ON operators(rank);
CREATE INDEX idx_operators_points ON operators(points DESC);
CREATE INDEX idx_operators_kpi ON operators(kpi DESC);
CREATE INDEX idx_daily_rankings_date ON daily_rankings(date DESC);
CREATE INDEX idx_daily_rankings_operator ON daily_rankings(operator_id);
```

### 14.3 Environment Variables (Backend)
```env
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/operators_db
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# File Storage
S3_BUCKET=operators-avatars
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

# CORS
CORS_ORIGIN=https://yourdomain.com,http://localhost:5173
```

---

## 15. MUHIM ESLATMALAR

### 15.1 Ma'lumotlar Yangilanishi
- Operatorlar ma'lumotlari har kuni yangilanishi kerak
- Reyting har soatda qayta hisoblanishi mumkin
- Real-time yangilanishlar ixtiyoriy

### 15.2 Xavfsizlik
- SQL Injection, XSS himoyasi
- Rate limiting
- Input validation
- HTTPS majburiy

### 15.3 Monitoring
- API response time monitoring
- Error tracking (Sentry, Bugsnag)
- Database performance monitoring
- Server health checks

---

## 16. KELGUSIDA QO'SHIMCHA QILINADIGAN FUNKSIYALAR

### 16.1 Phase 2 Features
- Export to Excel/PDF
- Email notifications
- Advanced analytics
- Team/Department grouping
- Custom date range filters

### 16.2 Phase 3 Features
- AI-powered insights
- Predictive analytics
- Gamification features
- Mobile app backend

---

## 17. CONTACT & SUPPORT

### 17.1 Frontend Developer
- **Team:** Frontend Development
- **Tech Stack:** React 19 + TypeScript
- **Current Status:** UI Ready, Need Backend Integration

### 17.2 Backend Developer
- **Required:** Full API implementation
- **Timeline:** TBD
- **Priority:** High

---

## 18. TEXNIK HUJJATLAR

### 18.1 Qo'shimcha Hujjatlar
Loyihada mavjud hujjatlar:
- `BACKEND_INTEGRATION.md` - Integratsiya yo'riqnomasi
- `LANGUAGE_FUNCTIONALITY.md` - Tillar funksionalligini
- `MEDAL_ICONS.md` - Medal ikonalari haqida
- `SCROLLING_IMPLEMENTATION.md` - Scrolling tafsilotlari

### 18.2 API Documentation
Backend tayyor bo'lgach Swagger/OpenAPI dokumentatsiya talab qilinadi:
```
https://api.yourdomain.com/api-docs
```

---

## 19. DASTLABKI INTEGRATSIYA QADAMLARI

### 19.1 Backend Developer Uchun
1. ✅ Ushbu TZ ni o'qish va tushunish
2. ✅ Savollar va tushunmovchiliklar bo'yicha muhokama
3. ⏳ Database schema yaratish
4. ⏳ API endpoints implement qilish
5. ⏳ Test data bilan testing
6. ⏳ Frontend bilan integratsiya
7. ⏳ Production deployment

### 19.2 Frontend Developer Uchun
1. ✅ API service layer yaratish (`src/shared/api/operatorsApi.ts`)
2. ✅ Environment variables sozlash
3. ⏳ Backend tayyor bo'lgach API calls implement qilish
4. ⏳ Error handling va loading states
5. ⏳ Testing va debugging

---

## 20. XULOSA

Ushbu texnik topshiriqnoma Call Center Operator Ranking Dashboard loyihasining backend qismini implement qilish uchun to'liq yo'riqnoma beradi. 

**Asosiy talablar:**
- ✅ RESTful API (JSON)
- ✅ JWT authentication
- ✅ PostgreSQL/MongoDB database
- ✅ Redis caching
- ✅ File storage (S3/similar)
- ✅ Rate limiting va security
- ✅ API documentation

**Natija:**
Frontend-Backend integratsiyasi orqali to'liq ishlaydigan operator reytinglash tizimi.

---

**Versiya:** 1.0  
**Sana:** 2026-01-13  

---

## SAVOLLAR VA TAKLIFLAR

