# ClaimPilot Backend API

Enterprise-grade expense reimbursement backend built with Node.js, TypeScript, Express, Prisma, and MySQL.

## Features

- 🔐 **JWT Authentication** - Secure token-based auth with refresh tokens
- 👥 **Multi-Tenant Architecture** - Company-based workspace isolation
- 🎭 **Role-Based Access Control (RBAC)** - ADMIN, MANAGER, EMPLOYEE roles
- 💰 **Expense Management** - Full CRUD operations for expense claims
- 💱 **Currency Conversion** - Real-time exchange rates via public APIs
- 📸 **OCR Receipt Scanning** - Tesseract.js integration for receipt data extraction
- ✅ **Approval Workflow Engine** - Sequential, Conditional, and Hybrid approval flows
- 📊 **Analytics & Reporting** - Comprehensive expense analytics
- 📝 **Audit Logging** - Complete audit trail for compliance
- 🔔 **Notifications** - In-app notification system

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **ORM:** Prisma 7
- **Database:** MySQL 8.0+
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **File Upload:** Multer
- **OCR:** Tesseract.js
- **External APIs:** REST Countries, ExchangeRate-API

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or bun

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mysql://root:password@localhost:3306/claimpilot
JWT_ACCESS_SECRET=your_super_secret_access_key_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
FRONTEND_URL=http://localhost:3000
UPLOAD_DIR=./uploads
OCR_LANG=eng
```

### 3. Setup MySQL Database

Create the database:

```sql
CREATE DATABASE claimpilot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create all tables in MySQL
- Set up indexes and foreign keys
- Seed initial data (if any)

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── src/
│   ├── config/          # Application configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Auth, validation, error handling
│   ├── validators/      # Zod schemas
│   ├── models/          # Database models (Prisma)
│   ├── utils/           # Helper functions
│   ├── jobs/            # Background tasks
│   ├── types/           # TypeScript types
│   ├── lib/             # Third-party library configs
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── uploads/
│   └── receipts/        # Uploaded receipt images
├── .env                 # Environment variables
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Database Schema

### Core Tables

1. **companies** - Organization/workspace data
2. **users** - All login users with roles
3. **user_manager_map** - Reporting relationships
4. **expense_claims** - Expense submissions
5. **expense_ocr_data** - OCR extracted data
6. **approval_rules** - Company workflow configurations
7. **approval_steps** - Ordered approval steps
8. **approval_actions** - Approval/rejection decisions
9. **audit_logs** - System audit trail
10. **notifications** - User notifications

### User Roles

- **ADMIN** - Full company access, user management, workflow configuration
- **MANAGER** - Team expense oversight, approval authority
- **EMPLOYEE** - Submit and track own expenses

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new company + admin | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Users (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/users` | List company users | ADMIN |
| POST | `/api/users` | Create new user | ADMIN |
| GET | `/api/users/:id` | Get user details | ADMIN |
| PATCH | `/api/users/:id` | Update user | ADMIN |
| DELETE | `/api/users/:id` | Delete user | ADMIN |
| PATCH | `/api/users/:id/role` | Change user role | ADMIN |
| PATCH | `/api/users/:id/manager` | Assign manager | ADMIN |

### Expenses (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/expenses` | List expenses (filtered by role) | All |
| POST | `/api/expenses` | Create expense | EMPLOYEE+ |
| GET | `/api/expenses/:id` | Get expense details | All |
| PATCH | `/api/expenses/:id` | Update draft expense | Owner |
| DELETE | `/api/expenses/:id` | Delete draft expense | Owner |
| POST | `/api/expenses/:id/submit` | Submit for approval | Owner |
| POST | `/api/expenses/:id/approve` | Approve expense | Approver |
| POST | `/api/expenses/:id/reject` | Reject expense | Approver |

### Approval Workflows (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/workflows` | List approval rules | ADMIN |
| POST | `/api/workflows` | Create workflow rule | ADMIN |
| PATCH | `/api/workflows/:id` | Update workflow | ADMIN |
| DELETE | `/api/workflows/:id` | Delete workflow | ADMIN |
| POST | `/api/workflows/:id/steps` | Add approval steps | ADMIN |

### OCR (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/api/ocr/receipt` | Upload & scan receipt | All |

### Analytics (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/analytics/summary` | Dashboard summary | All |
| GET | `/api/analytics/monthly` | Monthly trends | ADMIN+ |
| GET | `/api/analytics/approval-bottlenecks` | Bottleneck analysis | ADMIN |

### Audit Logs (Protected)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/api/audit-logs` | View audit trail | ADMIN |

## API Usage Examples

### Signup (Create Company + Admin)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "password": "securepass123",
    "companyName": "Acme Corp",
    "countryCode": "US"
  }'
```

Response includes:
- User info + access token + refresh token
- Company info with default currency

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@company.com",
    "password": "securepass123"
  }'
```

### Create Expense

```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "amountOriginal": 150.00,
    "currencyOriginal": "USD",
    "category": "MEALS",
    "description": "Client dinner meeting",
    "merchantName": "Restaurant ABC",
    "expenseDate": "2024-03-29"
  }'
```

Auto-converts to company currency using live exchange rates.

### Upload Receipt with OCR

```bash
curl -X POST http://localhost:5000/api/ocr/receipt \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@receipt.jpg"
```

Returns extracted:
- Amount
- Date
- Merchant
- Category
- Raw text + confidence score

### Create Approval Workflow

Sequential: Manager → Finance → Director

```bash
curl -X POST http://localhost:5000/api/workflows \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Standard Approval Flow",
    "ruleType": "SEQUENTIAL",
    "managerFirstEnabled": true,
    "steps": [
      {
        "stepOrder": 1,
        "approverRole": "MANAGER"
      },
      {
        "stepOrder": 2,
        "approverRole": "FINANCE"
      },
      {
        "stepOrder": 3,
        "approverRole": "DIRECTOR",
        "isTerminalStep": true
      }
    ]
  }'
```

## Approval Workflow Engine

### Rule Types

1. **SEQUENTIAL** - Steps must be approved in order
2. **CONDITIONAL** - Percentage-based or specific approver rules
3. **HYBRID** - Combination of both

### Workflow Logic

When an expense is submitted:

1. System finds active approval rule for company
2. Checks if manager-first is enabled
3. Routes to first approver
4. On approval, moves to next step
5. When all steps complete → status = APPROVED
6. If any step rejected → status = REJECTED

### Example Flows

**Sequential:**
```
Employee → Manager → Finance → Director → APPROVED
```

**Conditional (60% threshold):**
```
Approver 1: ✓ Approved
Approver 2: ✗ Rejected  
Approver 3: ✓ Approved
→ 66% approved → AUTO-APPROVED
```

**Hybrid:**
```
Manager (required) → Then 2 of 3 Finance team → APPROVED
```

## Currency Handling

### Country/Currency Detection

During signup, uses [REST Countries API](https://restcountries.com/) to:
- Validate country code
- Fetch primary currency
- Set company default

### Exchange Rate Conversion

Uses [ExchangeRate-API](https://api.exchangerate-api.com/) to:
- Convert expense amounts to company currency
- Store rate at submission time
- Never recalculate historical data

Example:
```json
{
  "amountOriginal": 100,
  "currencyOriginal": "EUR",
  "amountCompanyCurrency": 108.50,
  "companyCurrency": "USD",
  "exchangeRate": 1.085
}
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT access + refresh tokens
- ✅ Role-based middleware protection
- ✅ Company scoping (data isolation)
- ✅ Input validation with Zod
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Rate limiting (100 req/15min)
- ✅ SQL injection prevention (Prisma)

## Testing

Check health:

```bash
curl http://localhost:5000/health
```

## Scripts

```bash
# Development
npm run dev          # Start with hot reload

# Production
npm run build        # Compile TypeScript
npm run start        # Run compiled JS

# Database
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Run migrations (dev)
npm run prisma:migrate:prod # Run migrations (prod)
npm run prisma:studio       # Open Prisma Studio GUI
```

## Troubleshooting

### Database Connection Error

Ensure MySQL is running and `.env` has correct credentials:

```bash
mysql -u root -p
# Check if claimpilot database exists
```

### Port Already in Use

Change `PORT` in `.env`:

```env
PORT=5001
```

### Prisma Client Errors

Regenerate Prisma client:

```bash
npm run prisma:generate
```

## Production Deployment

1. Set strong JWT secrets
2. Use production database URL
3. Set `NODE_ENV=production`
4. Configure CORS for your domain
5. Enable HTTPS
6. Set up proper logging
7. Configure backup strategy
8. Monitor performance

## Next Steps

- [ ] Email notifications (nodemailer/SendGrid)
- [ ] File storage (AWS S3/Azure Blob)
- [ ] Advanced OCR (Google Vision API)
- [ ] Real-time updates (Socket.IO)
- [ ] PDF generation for reports
- [ ] Scheduled jobs (node-cron)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit/Integration tests

## License

ISC
