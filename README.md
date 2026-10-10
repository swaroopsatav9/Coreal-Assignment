# COREAL — Commercial Real Estate Platform

> **India's PIN-Code Based Commercial Real Estate Network**  
> A full-stack web application replicating [COREAL](https://www.coreal.in/) with pixel-accurate UI, robust REST APIs, PostgreSQL persistence, and Django Admin management.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS, Lucide React, Axios |
| **Backend** | Python 3.11, Django 4.2+, Django REST Framework (DRF) |
| **Database** | PostgreSQL 16+ via `psycopg2-binary` (database: `coreal_db`) |
| **Authentication**| DRF Token Authentication & Django Session Auth |
| **Design** | Exact COREAL Enterprise UI (`#ffffff`, `#0f172a`, `#2563eb`, `#ff8c00`) |

---

## ✨ Key Features

### 1. Frontend User Interface
- **Fixed Navbar (76px)**: Brand logo (`COREAL — THE PERFECT SPACE`), mega-menu dropdowns for **Solutions** and **Industries**, Partner Login, and Sign Up buttons.
- **Marquee Ticker (44px)**: Infinite marquee ticker of commercial categories with orange diamond separators and a play/pause toggle.
- **Split Hero Section**: Segmented zone-based India network map on left, 3D geodesic wireframe dome on right, locality search bar, and 4 network stat counters.
- **Brand Film Showcase**: 16:9 high-definition video showcase with infinite card marquee and interactive 3D Fibonacci sphere canvas.
- **Network Metrics Band**: Concentric SVG ripple rings, 5 live metric cards (*28 States, 750+ Cities, 11K+ PIN Codes, 65K+ Areas, 175K+ Partners*), and central globe card.
- **8 Core Solution Cards**: Dark Stores, Warehouses, Commercial Offices, Bank Branches & ATMs, Healthcare & Pharma, Retail & High-Street, Logistics Parks, Cold Storage.
- **Verified Commercial Directory**: Filterable directory with live search by PIN code or locality, city selector, space category, and transaction type. Cards display verification badges, area in sq.ft., rate per sq.ft., monthly rent, and direct "Inquire" buttons.
- **How It Works (01–04)**: 4-step card progression and bottom globe carousel.
- **The COREAL Standard (C-O-R-E-A-L)**: Dark principle cards with letter indicators.
- **Cityscape FAQ Section**: 2-column daylight accordion layout dynamically populated from the database.
- **Footer**: 9 squircle social and communication badges (Instagram, Facebook, YouTube, LinkedIn, Phone, WhatsApp, Google Play, Apple Store, Mail), legal disclaimer, and trademark metadata.

### 2. Modals & Enterprise Workflows
- **Partner Login Modal**: Replicated from COREAL (`#loginModal`) with links to external CRM portals (`https://crm.coreal.in:8443/...`) plus direct in-modal token authentication against Django.
- **Enterprise Desk Lead Onboarding Modal**: Dual tabs (**Procure Space** and **Become Partner**), PIN code autofill, 10-digit Indian mobile validation (`^[6-9]\d{9}$`), 6-digit PIN validation (`^\d{6}$`), required terms consent, and 48-Hour Guarantee badge.
- **Floating Contact Widget**: Scroll-to-top (`↑`) button and instant WhatsApp direct chat button.

### 3. Backend & APIs
- Full RESTful API with automated serialization and strict validation rules.
- **Django Admin Portal**: Customized header (`COREAL Administration — The Perfect Space`), search fields, list filters, editable status, and prepopulated slugs.
- **PostgreSQL Exclusivity**: Zero SQLite fallback; directly bound to `coreal_db` on PostgreSQL port 5432.

---

## 📁 Repository Structure

```text
Assignment/
├── backend/
│   ├── api/
│   │   ├── migrations/          # Database migration files
│   │   ├── admin.py             # Django Admin customizations
│   │   ├── models.py            # Solution, Industry, Property, Inquiry, etc.
│   │   ├── serializers.py       # DRF serializers & field validators
│   │   ├── urls.py              # API endpoint routes
│   │   ├── views.py             # ViewSets and authentication views
│   │   └── tests.py             # Automated unit test suite (14 tests)
│   ├── coreal_backend/
│   │   ├── settings.py          # Django project configuration (PostgreSQL)
│   │   ├── urls.py              # Root URL router
│   │   └── wsgi.py              # WSGI entrypoint
│   ├── .env                     # Backend environment configuration
│   ├── .env.example             # Environment template
│   ├── manage.py                # Django CLI utility
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── TickerBar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FilmShowcase.jsx
│   │   │   ├── NetworkMetricsBand.jsx
│   │   │   ├── SolutionsGrid.jsx
│   │   │   ├── PropertySearchSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── CorealStandardSection.jsx
│   │   │   ├── FaqSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PartnerLoginModal.jsx
│   │   │   ├── ProcurePartnerModal.jsx
│   │   │   ├── SuccessModal.jsx
│   │   │   └── ContactWidget.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios API client with token interceptors
│   │   ├── App.jsx              # Application root
│   │   ├── index.css            # Complete design system & responsive CSS
│   │   └── main.jsx             # React DOM entrypoint
│   ├── .env.example             # Frontend environment template
│   ├── package.json             # Node dependencies
│   └── vite.config.js           # Vite build configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.10 or higher
- **Node.js**: 18.x or higher & npm
- **PostgreSQL**: 14 or higher running on `localhost:5432`

---

### Step 1: PostgreSQL Setup
Ensure PostgreSQL is running and create the database (or let Django connect to your existing instance):

```sql
CREATE DATABASE coreal_db;
```

---

### Step 2: Backend Setup (Django)

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. (Optional) Activate your virtual environment:
   ```bash
   # Windows
   ..\.venv\Scripts\activate
   # macOS/Linux
   source ../.venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your `.env` file (copy from `.env.example`):
   ```env
   USE_POSTGRES=true
   POSTGRES_DB=coreal_db
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   ```

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Seed initial platform data (Solutions, Industries, Properties, Metrics, FAQs):
   ```bash
   python manage.py seed_data
   ```

7. (Optional) Create a superuser for Django Admin:
   ```bash
   python manage.py createsuperuser
   ```

8. Start the Django development server:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   Backend will be running at: `http://127.0.0.1:8000/`

---

### Step 3: Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Frontend will be running at: `http://localhost:5173/`

4. To create an optimized production build:
   ```bash
   npm run build
   ```

---

## 📡 API Endpoints Reference

All endpoints return and accept JSON.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/` | Platform status and available API endpoints |
| `GET` | `/api/properties/?q=&city=&space_type=&listing_type=` | List and filter commercial listings by PIN code, city, or category |
| `GET` | `/api/solutions/` | List 8 commercial solution categories |
| `GET` | `/api/industries/` | List 9 industry verticals |
| `GET` | `/api/metrics/` | Nationwide network metrics (States, Cities, PIN Codes, Partners) |
| `GET` | `/api/faqs/?column=left\|right` | FAQ items sorted by column and order |
| `POST` | `/api/inquiries/` | Submit enterprise requirement mandate or partner inquiry |
| `POST` | `/api/auth/login/` | Authenticate partner credentials and receive auth token |
| `POST` | `/api/auth/register/` | Register new associate partner or customer account |
| `GET` | `/api/auth/user/` | Retrieve authenticated profile *(Requires `Token <key>`)* |
| `POST` | `/api/auth/logout/` | Invalidate active auth token *(Requires `Token <key>`)* |

---

## 🧪 Running Automated Tests

Run the test suite against the PostgreSQL database:

```bash
cd backend
python manage.py test api
```

The test suite validates:
- API overview endpoint health
- Property listing and PIN-code filter queries
- Indian mobile number regex validation and sanitization
- 6-digit PIN code validation
- Valid and invalid authentication flows
- Protected endpoint token guards
- FAQ and Network Metrics ordering

---

## 🔐 Admin Portal Credentials (Default)

- **URL**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Username**: `admin`
- **Password**: `admin123`

---

## 📄 License
Developed for the COREAL full-stack technical assignment. Proprietary brand assets and trademarks belong to **IH&MS Infra India Pvt. Ltd.**
