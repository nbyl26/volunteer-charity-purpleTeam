# PurpleCare – Volunteer & Charity Platform

PurpleCare adalah platform berbasis web yang menghubungkan **volunteer, donatur, dan penyelenggara acara sosial** dalam satu tempat.  
Dibangun dengan teknologi modern **React + Vite + Tailwind CSS**, PurpleCare memudahkan pengguna untuk **bergabung sebagai relawan, berdonasi, dan melihat dampak nyata dari kegiatan sosial** di seluruh komunitas.

---

## 🌐 Demo Preview
*Demo URL: [Coming Soon]*

---

## 📄 **Daftar Halaman (Pages)**

### **Public Pages**
1. **Home (`/`)** - Landing page dengan hero, about, get involved, dan preview events
2. **About (`/about`)** - Informasi lengkap tentang PurpleCare, misi, dan nilai-nilai
3. **Get Involved (`/get-involved`)** - Cara untuk terlibat sebagai volunteer atau donatur
4. **Events (`/events`)** - Daftar semua event volunteer dengan filter dan search
5. **Event Detail (`/events/:id`)** - Detail lengkap event tertentu
6. **Campaigns (`/campaigns`)** - Daftar campaign donasi yang sedang berjalan
7. **Campaign Detail (`/campaigns/:id`)** - Detail campaign donasi tertentu
8. **Contact (`/contact`)** - Halaman kontak dengan form dan informasi kontak
9. **Terms (`/terms`)** - Syarat dan ketentuan platform
10. **Privacy (`/privacy`)** - Kebijakan privasi platform

### **Authentication Pages**
11. **Login (`/login`)** - Halaman login untuk user
12. **Register (`/register`)** - Halaman registrasi akun baru
13. **Forgot Password (`/forgot-password`)** - Form untuk reset password
14. **Reset Password (`/reset-password`)** - Form untuk set password baru

### **User Pages** (Protected - Butuh Login)
15. **Dashboard (`/dashboard`)** - Dashboard user dengan statistik aktivitas
16. **Join Event (`/join-event/:id`)** - Form pendaftaran volunteer untuk event
17. **Donate (`/campaigns/:id/donate`)** - Form donasi untuk campaign tertentu

### **Admin Pages** (Protected - Admin Only)
18. **Admin Dashboard (`/admin`)** - Overview statistik platform
19. **Admin Events (`/admin/events`)** - Kelola semua event (CRUD)
20. **Admin Volunteers (`/admin/volunteers`)** - Kelola pendaftaran volunteer
21. **Admin Campaigns (`/admin/campaigns`)** - Kelola campaign donasi (CRUD)
22. **Admin Donations (`/admin/donations`)** - Verifikasi dan kelola donasi
23. **Admin Users (`/admin/users`)** - Kelola pengguna platform
24. **Admin Analytics (`/admin/analytics`)** - Laporan dan statistik platform
25. **Event Registrations (`/admin/events/:id/registrations`)** - Detail pendaftaran volunteer per event

---

## 🪝 **React Hooks yang Digunakan**

### **1. Built-in React Hooks**

#### **`useState`**
Digunakan di hampir semua komponen untuk mengelola state lokal.

**Contoh Penggunaan:**
```jsx
// State untuk form input
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// State untuk loading & error
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// State untuk modal visibility
const [showModal, setShowModal] = useState(false);

// State untuk filter dan search
const [searchTerm, setSearchTerm] = useState("");
const [category, setCategory] = useState("all");
```

**Total Penggunaan:** ~80+ komponen

---

#### **`useEffect`**
Untuk side effects seperti fetching data, subscriptions, dan cleanup.

**Contoh Penggunaan:**
```jsx
// Fetch data saat component mount
useEffect(() => {
    fetchEvents();
}, []);

// Fetch data saat dependency berubah
useEffect(() => {
    fetchEventDetails(id);
}, [id]);

// Cleanup function
useEffect(() => {
    return () => {
        document.body.style.overflow = "unset";
    };
}, [isOpen]);

// Scroll listener
useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Total Penggunaan:** ~60+ komponen

---

#### **`useContext`**
Untuk mengakses global state dari Context API.

**Contoh Penggunaan:**
```jsx
// Di AuthContext.jsx
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Di komponen lain
const { user, logout, loading } = useContext(AuthContext);
```

**Digunakan di:**
- `AuthContext` - Autentikasi global
- Semua komponen yang butuh user info (~40+ komponen)

---

#### **`useMemo`**
Untuk memoization dan optimasi performa filtering/sorting.

**Contoh Penggunaan:**
```jsx
// Filtering events berdasarkan search & category
const filteredEvents = useMemo(() => {
    return events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === "all" || event.category === category;
        return matchesSearch && matchesCategory;
    });
}, [events, searchTerm, category]);

// Sorting events berdasarkan tanggal
const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
        return sort === "newest" 
            ? new Date(b.event_date) - new Date(a.event_date)
            : new Date(a.event_date) - new Date(b.event_date);
    });
}, [filteredEvents, sort]);
```

**Digunakan di:**
- `Events.jsx` - Filtering & sorting events
- `Campaigns.jsx` - Filtering campaigns
- `AdminDashboard.jsx` - Statistik calculations

---

### **2. Custom Hooks**

#### **`useAuth`**
Custom hook untuk mengakses AuthContext dengan mudah.

**File:** `frontend/src/hooks/useAuth.js`

```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
```

**Digunakan di:** ~45+ komponen yang butuh autentikasi

**Contoh Penggunaan:**
```jsx
const { user, login, logout, loading } = useAuth();

if (loading) return <Loader />;
if (!user) return <Navigate to="/login" />;
```

---

### **3. Router Hooks**

#### **`useNavigate`**
Untuk navigasi programmatic.

**Contoh Penggunaan:**
```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Navigate ke halaman lain
const handleSubmit = async () => {
    await submitForm();
    navigate("/dashboard");
};

// Navigate back
const goBack = () => navigate(-1);
```

**Digunakan di:** ~35+ komponen

---

#### **`useParams`**
Untuk mengakses URL parameters.

**Contoh Penggunaan:**
```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();

useEffect(() => {
    fetchEventDetails(id);
}, [id]);
```

**Digunakan di:**
- `EventDetail.jsx`
- `CampaignDetail.jsx`
- `JoinEvent.jsx`
- `Donate.jsx`
- `EventRegistrations.jsx`

---

#### **`useLocation`**
Untuk mendapatkan informasi lokasi saat ini.

**Contoh Penggunaan:**
```jsx
import { useLocation } from "react-router-dom";

const location = useLocation();

const isActive = (path) => location.pathname === path;
```

**Digunakan di:**
- `Navbar.jsx` - Active link highlighting
- `AdminSidebar.jsx` - Active sidebar item

---

#### **`useSearchParams`**
Untuk mengakses dan memanipulasi query parameters.

**Contoh Penggunaan:**
```jsx
import { useSearchParams } from "react-router-dom";

const [searchParams] = useSearchParams();

const token = searchParams.get("token");
const email = searchParams.get("email");

useEffect(() => {
    if (!token || !email) {
        navigate("/forgot-password");
    }
}, [token, email]);
```

**Digunakan di:**
- `ResetPassword.jsx` - Ambil token & email dari URL

---

## 🧩 **Folder Structure Detail**

```
src/
├── assets/                          # Static files (images, SVG, icons)
│   ├── bg-hero.svg
│   ├── bg-globe.svg
│   ├── hero-img.jpg
│   ├── logo.png
│   └── event1.jpg, event2.jpg, event3.jpg
│
├── components/                      # Reusable UI components
│   ├── about/                       # About page components
│   │   ├── AboutHero.jsx
│   │   ├── AboutContent.jsx
│   │   └── AboutValues.jsx
│   │
│   ├── admin/                       # Admin panel components
│   │   ├── dashboard/
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   ├── PendingReviews.jsx
│   │   │   └── PlatformSummary.jsx
│   │   ├── events/
│   │   │   ├── EventStats.jsx
│   │   │   ├── EventTable.jsx
│   │   │   └── EventFormModal.jsx
│   │   ├── volunteers/
│   │   │   ├── VolunteerStats.jsx
│   │   │   ├── VolunteerEventCard.jsx
│   │   │   └── RegistrationModal.jsx
│   │   ├── campaigns/
│   │   │   ├── CampaignStats.jsx
│   │   │   ├── CampaignTable.jsx
│   │   │   └── CampaignFormModal.jsx
│   │   ├── donations/
│   │   │   ├── DonationStats.jsx
│   │   │   ├── DonationTable.jsx
│   │   │   ├── DonationFilters.jsx
│   │   │   └── DonationDetailModal.jsx
│   │   ├── users/
│   │   │   ├── UserStats.jsx
│   │   │   ├── UserTable.jsx
│   │   │   └── UserDetailModal.jsx
│   │   ├── analytics/
│   │   │   ├── StatCard.jsx
│   │   │   ├── CampaignPerformanceChart.jsx
│   │   │   ├── EventStatusChart.jsx
│   │   │   └── ActivitySummary.jsx
│   │   ├── event-registrations/
│   │   │   ├── EventHeader.jsx
│   │   │   ├── RegistrationStats.jsx
│   │   │   ├── RegistrationFilters.jsx
│   │   │   └── RegistrationTable.jsx
│   │   └── layout/
│   │       ├── AdminSidebar.jsx
│   │       └── AdminNavbar.jsx
│   │
│   ├── auth/                        # Authentication components
│   │   ├── AuthInput.jsx
│   │   ├── AuthHero.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ForgotPasswordForm.jsx
│   │
│   ├── campaign-detail/             # Campaign detail page components
│   │   ├── CampaignHero.jsx
│   │   ├── CampaignAbout.jsx
│   │   ├── CampaignStats.jsx
│   │   ├── RecentDonations.jsx
│   │   ├── CampaignInfo.jsx
│   │   └── DonateCard.jsx
│   │
│   ├── campaigns/                   # Campaigns listing components
│   │   ├── CampaignHeader.jsx
│   │   ├── CampaignFilters.jsx
│   │   ├── CampaignCard.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── contact/                     # Contact page components
│   │   ├── ContactInfo.jsx
│   │   ├── ContactForm.jsx
│   │   └── OperatingHours.jsx
│   │
│   ├── dashboard/                   # User dashboard components
│   │   ├── StatsCard.jsx
│   │   ├── EventRegistrationList.jsx
│   │   ├── DonationHistoryList.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ActivitySummary.jsx
│   │   ├── DocumentationUpload.jsx
│   │   └── QuickActions.jsx
│   │
│   ├── donate/                      # Donation form components
│   │   ├── DonationForm.jsx
│   │   └── SuccessMessage.jsx
│   │
│   ├── event-detail/                # Event detail page components
│   │   ├── EventHero.jsx
│   │   ├── EventInfo.jsx
│   │   ├── EventAbout.jsx
│   │   └── ImageModal.jsx
│   │
│   ├── events/                      # Events listing components
│   │   ├── EventsHeader.jsx
│   │   ├── EventsFilters.jsx
│   │   ├── EventsGrid.jsx
│   │   ├── EventCard.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── get-involved/                # Get involved page components
│   │   ├── GetInvolvedHero.jsx
│   │   ├── InvolvementOptions.jsx
│   │   └── CallToAction.jsx
│   │
│   ├── home/                        # Home page components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── GetInvolved.jsx
│   │   └── Events.jsx
│   │
│   ├── join-event/                  # Join event components
│   │   ├── EventSummary.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── SuccessMessage.jsx
│   │
│   └── layout/                      # Layout components
│       ├── Navbar.jsx
│       └── Footer.jsx
│
├── config/                          # Configuration files
│   └── api.js                       # Axios config & API endpoints
│
├── context/                         # React Context
│   └── AuthContext.jsx              # Authentication context
│
├── hooks/                           # Custom hooks
│   └── useAuth.js                   # Auth hook wrapper
│
├── pages/                           # Main pages
│   ├── Home.jsx
│   ├── About.jsx
│   ├── GetInvolved.jsx
│   ├── Events.jsx
│   ├── EventDetail.jsx
│   ├── Campaigns.jsx
│   ├── CampaignDetail.jsx
│   ├── Contact.jsx
│   ├── Terms.jsx
│   ├── Privacy.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   ├── ResetPassword.jsx
│   ├── Dashboard.jsx
│   ├── JoinEvent.jsx
│   ├── Donate.jsx
│   └── Admin/
│       ├── AdminDashboard.jsx
│       ├── EventsPage.jsx
│       ├── EventRegistrations.jsx
│       ├── VolunteersPage.jsx
│       ├── CampaignsPage.jsx
│       ├── DonationsPage.jsx
│       ├── UsersPage.jsx
│       └── AnalyticsPage.jsx
│
├── App.jsx                          # Root component & routing
└── main.jsx                         # Entry point
```

---

## ⚙️ **Tech Stack**

| **Category** | **Technology** |
|-------------|----------------|
| **Frontend Framework** | [React.js 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Form Handling** | Native React (useState + controlled components) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **State Management** | React Context API + Hooks |
| **Date Formatting** | Native JavaScript `Date` & `toLocaleDateString` |
| **Image Optimization** | Native `<img>` + WebP format |
| **Font** | Google Fonts (Poppins, Inter) |

---

## 🚀 **Fitur Utama (Frontend)**

### **Public Features**
✅ Landing page dinamis dengan hero, about, events preview  
✅ Browse events dengan filter (kategori, search, sort)  
✅ Browse campaigns donasi dengan progress tracking  
✅ Detail event & campaign dengan informasi lengkap  
✅ Contact form dengan integrasi email (via backend)  
✅ Responsive design (mobile-first approach)  

### **User Features**
✅ Registrasi & login dengan JWT authentication  
✅ Forgot & reset password dengan token system  
✅ User dashboard dengan statistik aktivitas  
✅ Join event sebagai volunteer  
✅ Donasi ke campaign dengan upload bukti transfer  
✅ Track status pendaftaran volunteer & donasi  
✅ Upload dokumentasi kegiatan volunteer  

### **Admin Features**
✅ Admin dashboard dengan overview statistik  
✅ CRUD Events (Create, Read, Update, Delete)  
✅ CRUD Campaigns  
✅ Approve/Reject volunteer registrations  
✅ Verify/Reject donations  
✅ User management  
✅ Analytics & reports dengan charts  
✅ Mark event registrations as completed  
✅ View volunteer documentation  

### **UI/UX Features**
✅ Smooth animations dengan Framer Motion  
✅ Loading states & skeleton screens  
✅ Error handling dengan toast notifications  
✅ Form validation dengan error messages  
✅ Modal untuk CRUD operations  
✅ Responsive tables dengan mobile-friendly view  
✅ Dark mode sidebar di admin panel  

---

## 🧠 **User Flow**

```
Visitor (Not Logged In)
├── Landing Page → View Events/Campaigns → Login/Register to Join/Donate
└── Contact → Send Message

User (Logged In)
├── Dashboard → View Stats
├── Events → Event Detail → Join as Volunteer
├── Campaigns → Campaign Detail → Donate
├── Upload Documentation (after event completion)
└── Track Volunteer Registrations & Donations

Admin (Logged In)
├── Admin Dashboard → Quick Actions
├── Manage Events → Create/Edit/Delete
├── Manage Campaigns → Create/Edit/Delete
├── Review Volunteers → Approve/Reject
├── Verify Donations → Approve/Reject
├── View Users → User Details
├── View Volunteer Documentation
└── Analytics → View Reports & Charts
```

---

## 🛡️ **Protected Routes**

```jsx
// Public Routes (No Auth Required)
/ → Home
/about → About
/get-involved → Get Involved
/events → Events List
/events/:id → Event Detail
/campaigns → Campaigns List
/campaigns/:id → Campaign Detail
/contact → Contact
/terms → Terms & Conditions
/privacy → Privacy Policy
/login → Login
/register → Register
/forgot-password → Forgot Password
/reset-password → Reset Password

// User Routes (Login Required)
/dashboard → User Dashboard
/join-event/:id → Join Event Form
/campaigns/:id/donate → Donate Form

// Admin Routes (Admin Role Required)
/admin → Admin Dashboard
/admin/events → Events Management
/admin/events/:id/registrations → Event Registrations
/admin/volunteers → Volunteers Management
/admin/campaigns → Campaigns Management
/admin/donations → Donations Management
/admin/users → Users Management
/admin/analytics → Analytics & Reports
```

---

## 📦 **Setup & Installation**

### **Prerequisites**
- Node.js (v18+ recommended)
- npm or yarn
- Backend API running di `http://localhost:8080`

### **Installation Steps**

```bash
# 1. Clone repository
git clone https://github.com/nbyl26/volunteer-charity-purpleTeam.git
cd volunteer-charity-purpleTeam/frontend

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env dan sesuaikan VITE_API_BASE_URL

# 4. Run development server
npm run dev

# 5. Access app
# Open http://localhost:5173
```

### **Environment Variables**

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 🏗️ **Build & Deployment**

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build output akan ada di folder: dist/
```

**Deployment Options:**
- Vercel (Recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

---

## 🧪 **Testing Checklist**

### **Authentication Flow**
- [ ] Register akun baru
- [ ] Login dengan kredensial valid
- [ ] Login dengan kredensial invalid (error handling)
- [ ] Forgot password → Reset password
- [ ] Logout

### **User Flow**
- [ ] View events → Join event
- [ ] View campaigns → Donate
- [ ] View dashboard → Track registrations & donations
- [ ] Upload proof of payment (donation)
- [ ] Upload documentation (volunteer)

### **Admin Flow**
- [ ] View admin dashboard
- [ ] Create/Edit/Delete event
- [ ] Create/Edit/Delete campaign
- [ ] Approve/Reject volunteer
- [ ] Verify/Reject donation
- [ ] View analytics
- [ ] View volunteer documentation

### **Responsive Design**
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

---

## 👥 **Team**

**Purple Team:**
- **Nabil Pasha** (@nbyl26) - Frontend Developer
- **M. Naufal Rafif Pratama** (@Naufal2376) - Backend Developer

---

## 📄 **License**

© 2025 PurpleTeam. All rights reserved.

---

## 🙏 **Acknowledgments**

- Icons: [Lucide React](https://lucide.dev/)
- Illustrations: Custom SVG
- Images: Unsplash
- Animations: Framer Motion
- UI Framework: Tailwind CSS