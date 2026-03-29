# 🚀 ClaimFlow Pro - OdooX VIT Pune Hackathon

**Enterprise Expense Reimbursement System with AI-Powered Receipt Scanning & Approval Workflows**

---

## 🎯 Problem Statement

Manual expense reimbursement processes are slow, error-prone, and lack transparency. Employees struggle with receipt management, finance teams drown in approval emails, and managers have no visibility into spending patterns.

## 💡 Our Solution

**ClaimFlow Pro** - A full-stack expense management system featuring:

- 📸 **AI Receipt Scanning** - OCR automatically extracts amount, date, merchant from receipts
- ✅ **Smart Approval Workflows** - Configurable multi-level approval chains  
- 💱 **Auto Currency Conversion** - Real-time exchange rates for international expenses
- 📊 **Analytics Dashboard** - Real-time insights into company spending
- 🔐 **Enterprise Security** - JWT auth, role-based access, audit trails
- 🐳 **Docker Ready** - One-command deployment with PostgreSQL

---

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Lightning-fast dev server)
- TailwindCSS + shadcn/ui components
- React Router for navigation
- Recharts for analytics

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL database
- JWT authentication
- Tesseract.js for OCR
- Zod validation

### DevOps
- Docker + Docker Compose
- GitHub Actions (CI/CD ready)

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 16+ OR Docker Desktop

### Option 1: Docker (Recommended - 2 minutes)

```bash
# Clone and enter directory
git clone https://github.com/ESHANK1507/OdooX-VIT-Pune-Hackathon.git
cd OdooX-VIT-Pune-Hackathon

# Start everything with one command
docker-compose up --build -d

# Check status
docker-compose ps
docker-compose logs -f
```

✅ **Backend:** http://localhost:5000  
✅ **Database:** PostgreSQL on port 5432

### Option 2: Manual Setup

#### Backend (Terminal 1)
```bash
cd backend

# Install dependencies
npm install

# Setup environment
copy .env.example .env
# Edit DATABASE_URL in .env

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start server
npm run dev
```

#### Frontend (Terminal 2)
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ **Frontend:** http://localhost:8080

---

## 📁 Project Structure

```
OdooX-VIT-Pune-Hackathon/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middlewares/    # Auth, validation
│   │   └── utils/          # Helpers
│   ├── prisma/
│   │   └── schema.prisma   # Database models
│   ├── Dockerfile
│   └── README.md
├── src/                    # React frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── hooks/
├── docker-compose.yml      # Docker orchestration
├── DOCKER_START.md         # Docker guide
└── README.md              # This file
```

---

## 🎭 User Roles

### 👤 Employee
- Submit expense claims
- Upload receipts (auto-OCR)
- Track approval status
- View personal expense history

### 👨‍💼 Manager
- Approve/reject team expenses
- View team spending analytics
- Configure approval workflows

### 👑 Admin
- Full system access
- User management
- Company settings
- Audit logs
- Advanced analytics

---

## 🔥 Key Features

### 1. Smart Receipt Scanner
Upload a receipt → OCR extracts:
- Amount
- Date
- Merchant name
- Category
- Confidence score

### 2. Approval Workflow Engine
Configure custom approval chains:
- **Sequential:** Manager → Finance → Director
- **Conditional:** 60% approvers must approve
- **Hybrid:** Manager required + 2 of 3 finance team

### 3. Multi-Currency Support
- Auto-detect country currency
- Real-time exchange rates
- Store both original & converted amounts

### 4. Analytics Dashboard
Real-time insights:
- Monthly spending trends
- Category breakdown
- Top spenders
- Approval bottlenecks

---

## 🗄️ Database Schema

Core tables:
- `companies` - Organization data
- `users` - All login users with roles
- `expense_claims` - Submitted expenses
- `approval_rules` - Workflow configuration
- `approval_steps` - Ordered approval steps
- `approval_actions` - Approval decisions
- `audit_logs` - System audit trail
- `notifications` - In-app alerts

---

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new company + admin
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Current user profile

### Expenses
- `GET /api/expenses` - List expenses
- `POST /api/expenses` - Create expense claim
- `POST /api/expenses/:id/submit` - Submit for approval
- `POST /api/expenses/:id/approve` - Approve expense
- `POST /api/expenses/:id/reject` - Reject expense

### OCR
- `POST /api/ocr/receipt` - Upload & scan receipt

### Analytics
- `GET /api/analytics/summary` - Dashboard summary
- `GET /api/analytics/monthly` - Monthly trends
- `GET /api/analytics/bottlenecks` - Approval delays

📖 **Full API docs:** [backend/README.md](backend/README.md)

---

## 🐛 Troubleshooting

### Port already in use
```bash
# Change PORT in backend/.env
PORT=5001

# Change database port in docker-compose.yml
ports:
  - "5433:5432"
```

### Database connection error
```bash
# Make sure PostgreSQL is running
# Or use Docker:
docker-compose up postgres -d
```

### Permission denied (uploads)
```bash
# Create uploads directory
mkdir -p backend/uploads/receipts
```

---

## 🚀 Deployment

### Production Environment Variables

```env
# backend/.env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/claimpilot
JWT_ACCESS_SECRET=strong_random_secret
JWT_REFRESH_SECRET=another_strong_secret
FRONTEND_URL=https://yourdomain.com
```

### Deploy with Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this project for your hackathon!

---

## 👥 Team

Built with ❤️ for OdooX VIT Pune Hackathon 2024

---

## 🎯 Demo Credentials

### Admin Account
- Email: admin@company.com
- Password: admin123

### Manager Account  
- Email: manager@company.com
- Password: manager123

### Employee Account
- Email: employee@company.com
- Password: employee123

---

## 📞 Support

- Documentation: `/backend/README.md`
- Docker Guide: `/DOCKER_START.md`
- Issues: GitHub Issues tab

---

**Made with ⚡ Node.js, React, PostgreSQL, and lots of ☕**

Good luck for the hackathon! 🚀
