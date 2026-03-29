# ClaimPilot Backend Environment Variables

## Required Environment Variables

Copy this to `.env` and fill in your values.

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/claimpilot

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
UPLOAD_DIR=./uploads

# OCR Configuration
OCR_LANG=eng

```

## Variable Descriptions

### PORT
- **Type:** Integer
- **Default:** 5000
- **Description:** Port number for the Express server to listen on
- **Example:** `5000`, `3001`, `8080`

### NODE_ENV
- **Type:** String
- **Default:** development
- **Allowed Values:** `development`, `production`, `test`
- **Description:** Application environment mode
- **Impact:** Controls logging level, error details, etc.

### DATABASE_URL
- **Type:** String (Connection URL)
- **Format:** `mysql://username:password@host:port/database`
- **Required:** Yes
- **Description:** MySQL database connection string
- **Example:** `mysql://root:mypassword@localhost:3306/claimpilot`
- **Notes:** 
  - Replace `YOUR_PASSWORD` with your MySQL password
  - Database must exist or be created before running migrations

### JWT_ACCESS_SECRET
- **Type:** String
- **Minimum Length:** 32 characters recommended
- **Required:** Yes
- **Description:** Secret key for signing JWT access tokens
- **Security:** CHANGE THIS in production! Use a cryptographically secure random string
- **Generate Secure Secret:**
  ```bash
  # Using Node.js
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  
  # Using OpenSSL
  openssl rand -base64 32
  ```

### JWT_REFRESH_SECRET
- **Type:** String
- **Minimum Length:** 32 characters recommended
- **Required:** Yes
- **Description:** Secret key for signing JWT refresh tokens
- **Security:** CHANGE THIS in production! Use a cryptographically secure random string
- **Generate Secure Secret:** Same as above

### FRONTEND_URL
- **Type:** String (URL)
- **Default:** `http://localhost:3000`
- **Description:** Frontend application URL for CORS configuration
- **Production Example:** `https://app.claimpilot.com`
- **Notes:** Must include protocol (http:// or https://)

### UPLOAD_DIR
- **Type:** String (File Path)
- **Default:** `./uploads`
- **Description:** Directory path for storing uploaded receipt images
- **Notes:** Can be absolute or relative path

### OCR_LANG
- **Type:** String
- **Default:** `eng`
- **Description:** Language code for Tesseract.js OCR processing
- **Supported Languages:** See Tesseract.js documentation
- **Examples:** `eng` (English), `spa` (Spanish), `fra` (French)

---

## Production Environment Template

For production deployment, use this template:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (use environment variables from your hosting provider)
DATABASE_URL=mysql://user:password@db.example.com:3306/claimpilot_prod

# JWT Secrets (GENERATE NEW SECURE VALUES!)
JWT_ACCESS_SECRET=<generate_secure_random_string_64_chars>
JWT_REFRESH_SECRET=<generate_secure_random_string_64_chars>

# Frontend URL (your production domain)
FRONTEND_URL=https://app.claimpilot.com

# File Upload (consider cloud storage in production)
UPLOAD_DIR=/var/www/claimpilot/uploads

# OCR Configuration
OCR_LANG=eng

# Additional Production Settings (Optional)
# LOG_LEVEL=info
# RATE_LIMIT_MAX=100
# RATE_LIMIT_WINDOW_MS=900000
```

---

## Security Best Practices

### For Development
1. Use unique secrets even in development
2. Never commit `.env` to version control
3. Add `.env` to `.gitignore`

### For Production
1. **NEVER** use default secrets from examples
2. Generate cryptographically secure random strings
3. Use environment variable management tools:
   - AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault
   - Docker secrets
4. Rotate secrets periodically
5. Use different secrets for each environment
6. Restrict access to production secrets

### Generate Secure Secrets

```bash
# Method 1: Node.js crypto
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 2: OpenSSL
openssl rand -base64 64

# Method 3: Python
python -c "import secrets; print(secrets.token_urlsafe(64))"

# Method 4: Online generator (for initial setup only)
# https://generate-secret.vercel.app/64
```

---

## Troubleshooting

### Error: Invalid DATABASE_URL
- Check MySQL is running
- Verify username/password
- Ensure database exists
- Check host and port are correct

### Error: JWT secret is too short
- Use at least 32 characters
- Prefer 64 characters for better security

### Error: CORS issues
- Verify FRONTEND_URL is correct
- Include full URL with protocol
- Check for trailing slashes

### Error: Cannot write to UPLOAD_DIR
- Ensure directory exists
- Check file permissions
- Use absolute path if needed

---

## Validation Checklist

Before starting the server, verify:

- [ ] `.env` file exists in backend root
- [ ] All required variables are set
- [ ] DATABASE_URL is valid and database exists
- [ ] JWT secrets are at least 32 characters
- [ ] JWT secrets are NOT the default examples
- [ ] FRONTEND_URL includes protocol (http:// or https://)
- [ ] NODE_ENV matches your environment
- [ ] No sensitive data is committed to version control

---

## Quick Setup Commands

```bash
# 1. Copy example file
copy .env.example .env

# 2. Generate secure secrets
node -e "console.log('JWT_ACCESS_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# 3. Edit .env with your values
notepad .env

# 4. Verify .env is ignored by git
git check-ignore .env
# Should output: .env

# 5. Start development server
npm run dev
```

---

## Need Help?

If you encounter issues:

1. Check that MySQL is running
2. Verify database exists
3. Test DATABASE_URL connectivity
4. Review server logs for specific errors
5. Ensure all required packages are installed

See README.md and QUICKSTART.md for more detailed troubleshooting.
