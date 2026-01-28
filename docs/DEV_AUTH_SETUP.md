# Dev Auth Setup

This document describes the environment configuration required for development authentication.

## Backend Requirements

### Required Environment Variables

Add these to `backend/.env.local`:

```bash
# Database
DATABASE_URL="postgresql://fortunetell_dev_user:devpassword@localhost:5432/fortunetell_dev"

# Auth (REQUIRED)
SUPABASE_JWT_SECRET="your-secret-key-here"
SUPABASE_JWT_ISSUER="fortunetell-dev"

# App
NODE_ENV="development"
PORT=5000
```

### Environment File Precedence

The backend uses different environment files based on `NODE_ENV`:
- **Development** (default): Loads `backend/.env.local`
- **Test**: Loads `backend/.env.test`
- **Production**: Loads `backend/.env.local` if present; platform environment variables take precedence

**Important:** `.env.local` is gitignored and must be created manually on each developer's machine. Use `backend/.env.example` as a template.

### CORS Configuration

Backend is configured to accept requests from all origins in development (`origin: true` in `backend/src/app.ts`).
Frontend at `http://localhost:3000` can access backend at `http://localhost:5000/api/v1`.

### Running Backend

```bash
cd backend
npm install
npm run dev
```

Backend will start on port 5000.

## Frontend Requirements

### Required Environment Variables

Add these to `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

**Important:** The `NEXT_PUBLIC_TEST_TOKEN` variable should be commented out or removed to use real auth instead of testhelper auto-login.

### Running Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on port 3000.

## Auth Endpoints

- **POST /api/v1/auth/register**
  - Body: `{ email: string, password: string }`
  - Returns: `{ data: { success: boolean } }`
  - Password must be at least 8 characters

- **POST /api/v1/auth/login**
  - Body: `{ email: string, password: string }`
  - Returns: `{ data: { token: string } }`
  - Token is a JWT valid for 7 days

- **GET /api/v1/auth/me** (requires auth)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ data: { user: { id, email, tier, profile } } }`

## Verification Steps

1. **Register a new account:**
   - Open http://localhost:3000
   - Click "Sign Up" tab
   - Enter email and password (min 8 chars)
   - Submit form

2. **Login persists across reload:**
   - After successful login, verify you see the main app
   - Reload the page (F5)
   - Verify you're still logged in (no login screen)

3. **Create account and transaction:**
   - Complete first-run onboarding (starting balance, bill, payout)
   - Verify account and transactions are created

4. **Trigger projection:**
   - Navigate through calendar to view projection
   - Verify projection data loads correctly

5. **Protected endpoints work:**
   - All API calls should include `Authorization: Bearer <token>` header
   - Check browser DevTools Network tab to verify auth headers

## Troubleshooting

- **"Authentication not configured" error:**
  - Ensure `backend/.env.local` exists and contains both `SUPABASE_JWT_SECRET` and `SUPABASE_JWT_ISSUER`
  - The backend loads `.env.local` by default in development mode
  - If you don't have `.env.local`, copy from `backend/.env.example` and fill in the values
- **CORS error:** Verify backend is running on port 5000 and frontend on port 3000
- **"Invalid token" error:** Token may be expired (7 day expiry) - logout and login again
- **Still seeing testhelper behavior:** Verify `NEXT_PUBLIC_TEST_TOKEN` is commented out in frontend `.env.local`
