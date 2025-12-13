# Authentication System

Simple password-based authentication system for blog admin access using JWT tokens and HTTP-only cookies.

## Overview

The authentication system protects:
- Blog creation page (`/blogs/create`)
- Admin dashboard (`/admin/*` except login)
- Blog API routes (`/api/blogs/draft`, `/api/blogs/save`)
- Upload API (`/api/upload`)

## Architecture

### Components

1. **JWT Tokens** - Secure session tokens
2. **HTTP-only Cookies** - XSS protection
3. **Middleware** - Route protection
4. **Login Page** - User authentication interface

### Security Features

✅ HTTP-only cookies (prevent XSS)  
✅ Secure flag in production (HTTPS only)  
✅ 7-day token expiry  
✅ Rate limiting (1s delay on wrong password)  
✅ Password environment variable  
✅ Session verification on protected routes  

## Setup

### 1. Environment Variables

Add to your `.env.local`:

```bash
# Required: Set a strong password for admin access
BLOG_ADMIN_PASSWORD=your_secure_password_here

# Optional: Custom JWT secret (auto-generated if not set)
JWT_SECRET=your_jwt_secret_key_change_in_production
```

### 2. Generate Strong Secrets

**For production, generate strong random strings:**

```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Use a password manager for BLOG_ADMIN_PASSWORD
```

## Usage

### Login

Navigate to: `http://localhost:3000/admin/login`

Enter the password set in `BLOG_ADMIN_PASSWORD`.

On successful login:
- JWT token created and stored in HTTP-only cookie
- Redirects to callback URL or `/blogs/create`
- Session valid for 7 days

### Logout

Click the "Logout" button in the blog editor header, or call:

```typescript
await fetch('/api/auth/logout', { method: 'POST' });
```

### Check Authentication Status

```typescript
const response = await fetch('/api/auth/session');
const { authenticated } = await response.json();

if (authenticated) {
  // User is logged in
}
```

## API Routes

### POST /api/auth/verify-password

Verify password and create session.

**Request:**
```json
{
  "password": "your_password"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Authentication successful",
  "session": {
    "authenticated": true,
    "role": "admin"
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid password"
}
```

### POST /api/auth/logout

Remove authentication session.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/session

Check current authentication status.

**Response:**
```json
{
  "authenticated": true,
  "role": "admin"
}
```

## Server-Side Authentication

### In API Routes

```typescript
import { requireAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await requireAuth(); // Throws if not authenticated
    
    // Protected logic here
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
}
```

### In Server Components

```typescript
import { isAuthenticated } from '@/lib/auth';

export default async function ProtectedPage() {
  const authenticated = await isAuthenticated();
  
  if (!authenticated) {
    redirect('/admin/login');
  }
  
  return <div>Protected content</div>;
}
```

## Middleware Protection

The middleware automatically protects these routes:

```typescript
const protectedRoutes = [
  '/blogs/create',      // Blog creation page
  '/admin',             // Admin dashboard
  '/api/blogs/draft',   // Draft saving API
  '/api/blogs/save',    // Publish API
  '/api/upload',        // Image upload API
];
```

**Behavior:**
- **Pages**: Redirects to `/admin/login?callbackUrl=original-url`
- **API Routes**: Returns `401 Unauthorized` JSON response

## Utilities

### `requireAuth()`
Throws error if not authenticated (for API routes).

### `isAuthenticated()`
Returns boolean indicating auth status.

### `verifyAuthFromRequest(request)`
Verify authentication from middleware request.

### `redirectToLogin(request)`
Create redirect response to login page.

## Security Considerations

### Current Implementation

✅ **Password Protection** - Single admin password  
✅ **JWT Tokens** - Cryptographically signed  
✅ **HTTP-only Cookies** - XSS protection  
✅ **Secure in Production** - HTTPS only cookies  
✅ **Token Expiry** - 7-day automatic expiry  
✅ **Rate Limiting** - 1s delay on failed attempts  

### Production Recommendations

For production deployment, consider:

1. **Environment Security**
   - Use strong, unique passwords
   - Rotate JWT secret regularly
   - Never commit `.env.local` to git

2. **Enhanced Security**
   - Add CSRF protection
   - Implement IP-based rate limiting
   - Add 2FA for admin access
   - Log authentication attempts
   - Add session activity monitoring

3. **Multi-User Support** (if needed)
   - User database table
   - Hashed passwords with bcrypt
   - User roles and permissions
   - Individual user sessions

4. **Monitoring**
   - Track failed login attempts
   - Alert on suspicious activity
   - Session audit logs

## Troubleshooting

### "Authentication required" error

**Cause:** Session expired or invalid token.  
**Fix:** Login again at `/admin/login`.

### Can't login

**Cause:** `BLOG_ADMIN_PASSWORD` not set or incorrect.  
**Fix:** Check `.env.local` file and restart dev server.

### Redirected to login on page refresh

**Cause:** Cookie not persisting (development issue).  
**Fix:** Clear browser cookies and login again.

### 401 error on API calls

**Cause:** Token expired or missing.  
**Fix:** Login again to refresh session.

## Testing

### Manual Testing

1. Visit `/blogs/create` (should redirect to login)
2. Enter wrong password (should show error)
3. Enter correct password (should redirect to blog editor)
4. Refresh page (should stay authenticated)
5. Click logout (should redirect to login)
6. Try to access `/api/blogs/draft` without auth (should get 401)

### Test Credentials

In development, set in `.env.local`:

```bash
BLOG_ADMIN_PASSWORD=test123
```

**⚠️ Change this for production!**

## Migration Guide

### From No Auth to Auth

If you previously had unprotected routes:

1. Add environment variables
2. Deploy middleware and auth routes
3. Login to create new sessions
4. Update any scripts/tools that call APIs

### Changing Password

1. Update `BLOG_ADMIN_PASSWORD` in `.env.local`
2. Restart server
3. All existing sessions will be invalidated
4. Users must login with new password

## Future Enhancements

Potential improvements:

- [ ] Multi-user support with user database
- [ ] OAuth integration (Google, GitHub)
- [ ] Two-factor authentication
- [ ] API keys for programmatic access
- [ ] Session management dashboard
- [ ] Activity logging and audit trail
- [ ] Remember me functionality
- [ ] Password reset flow

