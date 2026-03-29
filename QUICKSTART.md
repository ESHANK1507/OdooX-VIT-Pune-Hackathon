# ClaimPilot Backend - Quick Start Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **MySQL 8.0+** installed and running ([Download](https://dev.mysql.com/downloads/))
- **npm** or **bun** package manager

## Installation Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Update the `.env` file with your MySQL credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/claimpilot
   JWT_ACCESS_SECRET=change_this_to_a_secure_random_string
   JWT_REFRESH_SECRET=change_this_to_another_secure_random_string
   FRONTEND_URL=http://localhost:3000
   UPLOAD_DIR=./uploads
   OCR_LANG=eng
   ```

   **Important:** Replace `YOUR_PASSWORD` with your actual MySQL root password.

### Step 3: Create MySQL Database

Option A: Using MySQL CLI
```bash
mysql -u root -p
CREATE DATABASE claimpilot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

Option B: The migration will create it automatically if permissions allow

### Step 4: Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create all database tables
- Set up indexes and foreign keys
- Initialize the schema

### Step 5: Generate Prisma Client

```bash
npm run prisma:generate
```

### Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on port 5000
📝 Environment: development
🌐 Health check: http://localhost:5000/health
🔑 Auth endpoints: http://localhost:5000/api/auth
```

## Test the API

### 1. Check Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-29T..."
}
```

### 2. Create First Account (Signup)

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Admin User\",
    \"email\": \"admin@company.com\",
    \"password\": \"Admin123!\",
    \"companyName\": \"My Company\",
    \"countryCode\": \"US\"
  }"
```

Response includes:
- Access token
- Refresh token  
- User info
- Company info with default currency (USD for US)

### 3. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"admin@company.com\",
    \"password\": \"Admin123!\"
  }"
```

### 4. Get Current User Profile

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Default Credentials

After signup, use:
- **Email:** The email you provided during signup
- **Password:** The password you chose
- **Role:** ADMIN (automatically assigned to first user)

## Common Issues & Solutions

### Issue: Database Connection Error

**Error:** `Can't connect to MySQL server`

**Solution:**
1. Ensure MySQL service is running:
   ```bash
   # Windows
   services.msc -> MySQL80 -> Start
   
   # macOS
   brew services start mysql
   
   # Linux
   sudo systemctl start mysql
   ```

2. Verify credentials in `.env` match your MySQL installation

### Issue: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change port in `.env`:
   ```env
   PORT=5001
   ```

2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### Issue: Prisma Client Not Generated

**Error:** `Cannot find module '.prisma/client'`

**Solution:**
```bash
npm run prisma:generate
```

### Issue: Migration Errors

**Error:** `Database does not exist` or migration fails

**Solution:**
1. Manually create database:
   ```sql
   CREATE DATABASE claimpilot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Reset migrations:
   ```bash
   npx prisma migrate reset
   npx prisma migrate dev
   ```

## Next Steps

### Explore API Endpoints

See [README.md](./README.md) for complete API documentation.

### Create Users

As ADMIN, you can now:
- Create additional users
- Assign roles (MANAGER, EMPLOYEE)
- Set up manager relationships

### Configure Approval Workflows

Set up sequential or conditional approval flows for your company.

### Submit Expenses

Test the expense submission flow with OCR receipt scanning.

## Development Commands

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Database commands
npm run prisma:generate      # Regenerate Prisma client
npm run prisma:migrate       # Create and apply migration
npm run prisma:studio        # Open Prisma Studio GUI
```

## Project Structure Overview

```
backend/
├── src/
│   ├── config/          # Configuration
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth, validation
│   ├── validators/      # Zod schemas
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript types
│   ├── lib/             # Library configs
│   ├── app.ts           # Express app
│   └── server.ts        # Entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── uploads/
│   └── receipts/        # Uploaded files
└── .env                 # Environment vars
```

## Support

For issues or questions:
1. Check [README.md](./README.md) for detailed documentation
2. Review Prisma schema in `prisma/schema.prisma`
3. Check server logs for error details

## Security Notes

⚠️ **Before deploying to production:**

1. Change all default secrets in `.env`
2. Use strong passwords
3. Enable HTTPS
4. Set proper CORS origins
5. Use environment-specific database credentials
6. Enable rate limiting
7. Monitor and log appropriately

---

**Happy coding! 🚀**
