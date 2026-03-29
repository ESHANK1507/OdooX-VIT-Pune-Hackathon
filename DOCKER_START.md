# 🐳 ClaimFlow Pro - Docker Quick Start

## ✅ Files Created

1. **`backend/Dockerfile`** - Backend container configuration
2. **`docker-compose.yml`** - Multi-container orchestration
3. **`backend/.dockerignore`** - Exclude unnecessary files

---

## 🚀 STEP-BY-STEP: Run with Docker

### **STEP 1: Make Sure Docker Desktop is Running**
- Check system tray for Docker whale icon 🐳
- Wait until it shows "Docker Desktop is running"

### **STEP 2: Navigate to Project Root**
```powershell
cd c:\Users\SARTHAK\Downloads\claimflow-pro-main\claimflow-pro-main
```

### **STEP 3: Build & Run Containers**
```powershell
docker-compose up --build
```

**OR in background (recommended):**
```powershell
docker-compose up --build -d
```

### **STEP 4: Check Container Status**
```powershell
docker-compose ps
```

You should see:
- ✅ `claimpilot-postgres` - PostgreSQL database
- ✅ `claimpilot-backend` - Backend API

### **STEP 5: View Logs**
```powershell
# All logs
docker-compose logs -f

# Backend logs only
docker-compose logs -f backend

# PostgreSQL logs only
docker-compose logs -f postgres
```

---

## 🔥 RESULT

### **👉 Docker Desktop Me:**
- **Containers** tab me dikhega:
  - `claimpilot-postgres` (running)
  - `claimpilot-backend` (running)

### **👉 Browser Me:**
- **Backend API:** http://localhost:5000
- **Health check:** http://localhost:5000/health

---

## 📊 Architecture

```
┌─────────────────┐
│   Frontend      │  (Run separately with npm run dev)
│  localhost:8080 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Backend      │  (Docker container)
│  localhost:5000 │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │  (Docker container)
│  localhost:5432 │
└─────────────────┘
```

---

## ⚡ Common Commands

### **Stop Containers**
```powershell
docker-compose down
```

### **Stop & Remove Volumes (Fresh Start)**
```powershell
docker-compose down -v
```

### **Restart Containers**
```powershell
docker-compose restart
```

### **Rebuild After Code Changes**
```powershell
docker-compose up -d --build
```

### **Access Backend Container**
```powershell
docker exec -it claimpilot-backend sh
```

### **Access PostgreSQL Container**
```powershell
docker exec -it claimpilot-postgres psql -U postgres -d claimpilot
```

---

## 🔧 Environment Variables

All configured in `docker-compose.yml`:
- `DATABASE_URL` → Auto-connected to PostgreSQL container
- `PORT=5000` → Mapped to localhost:5000
- JWT secrets → Pre-configured

---

## ❗ Troubleshooting

### **Port Already in Use**
If port 5000 or 5432 is busy:
```yaml
# In docker-compose.yml, change ports:
ports:
  - "5001:5000"  # Backend on port 5001
  - "5433:5432"  # Postgres on port 5433
```

### **Docker Desktop Not Starting**
1. Check if virtualization is enabled in BIOS
2. Restart Docker Desktop app
3. Check Windows Features: Enable "Hyper-V" and "Containers"

### **Database Connection Error**
Wait 30 seconds for PostgreSQL to fully start, then:
```powershell
docker-compose restart backend
```

---

## 🎯 Development Workflow

### **Option 1: Hot Reload (Recommended)**
Code changes automatically reflect in container:
```powershell
docker-compose up -d
# Edit code in VS Code → Auto reloads
```

### **Option 2: Full Rebuild**
For dependency changes:
```powershell
docker-compose down
docker-compose up --build
```

---

## 📌 IMPORTANT NOTES

1. **Frontend NOT in Docker** - Run separately:
   ```powershell
   npm run dev
   ```

2. **Data Persistence** - Database stored in Docker volume:
   - Data survives container restarts
   - Delete with: `docker-compose down -v`

3. **First Run** - Takes 2-3 minutes for:
   - Downloading PostgreSQL image
   - Installing dependencies
   - Running migrations

---

## 🎉 Success Checklist

- [ ] Docker Desktop running
- [ ] `docker-compose up --build` completed
- [ ] Both containers show "healthy" status
- [ ] Backend accessible at http://localhost:5000
- [ ] No error messages in logs

---

## 🚀 Quick Commands Summary

```powershell
# Start everything
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Fresh start
docker-compose down -v; docker-compose up --build -d
```

Happy coding! 🎊
