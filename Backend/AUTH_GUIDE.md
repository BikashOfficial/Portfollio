# Access Code Verification Documentation

## Overview

Simple access code verification system. Users enter the access code each time they access the MySpace admin panel. No tokens or persistent sessions required.

## Features

✅ **Simple Access Code** - Enter code every time accessing MySpace  
✅ **No Session Storage** - Code verified on each request  
✅ **No Tokens** - Direct access code verification  
✅ **Quick Setup** - Minimal configuration  
✅ **Stateless** - No server-side session management  

## Environment Variables

Update your `.env` file:

```env
# Access Code for MySpace admin access
ACCESS_CODE="bikash330"
```

## API Endpoint

### Verify Access Code

**Request:**
```http
POST /api/auth/verify
Content-Type: application/json

{
  "accessCode": "bikash330"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Access verified successfully"
}
```

**Invalid Code Response (401):**
```json
{
  "success": false,
  "message": "Invalid access code"
}
```

**Missing Code Response (400):**
```json
{
  "success": false,
  "message": "Access code is required"
}
```

## Frontend Usage

### In MySpace Component

Add an access code modal that appears when accessing MySpace:

```javascript
import React, { useState } from 'react';

const MySpace = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(!isVerified);
  const [error, setError] = useState('');

  const handleVerifyAccess = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accessCode })
      });

      const result = await response.json();

      if (result.success) {
        setIsVerified(true);
        setShowModal(false);
        setError('');
        setAccessCode('');
      } else {
        setError(result.message || 'Invalid access code');
      }
    } catch (error) {
      setError('Error verifying access code');
      console.error('Verification error:', error);
    }
  };

  // Show access code modal if not verified
  if (!isVerified) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--c-bg)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--c-text)'
      }}>
        <div style={{
          background: 'var(--c-surface)',
          padding: 'clamp(30px, 5vw, 50px)',
          borderRadius: 16,
          maxWidth: 400,
          width: '90%',
          border: '2px solid var(--c-border)'
        }}>
          <h2 style={{ 
            fontFamily: 'Syne',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 800,
            marginBottom: 24,
            textAlign: 'center'
          }}>
            🔐 MySpace Admin
          </h2>
          
          <p style={{
            color: 'var(--c-muted)',
            marginBottom: 24,
            textAlign: 'center'
          }}>
            Enter access code to continue
          </p>

          <input
            type="password"
            placeholder="Enter access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleVerifyAccess()}
            style={{
              width: '100%',
              padding: 'clamp(10px, 2vw, 14px)',
              marginBottom: 16,
              background: 'var(--c-bg)',
              border: '1.5px solid var(--c-border)',
              borderRadius: 8,
              color: 'var(--c-text)',
              fontFamily: 'inherit',
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              boxSizing: 'border-box'
            }}
          />

          {error && (
            <p style={{
              color: '#ff6b6b',
              marginBottom: 16,
              fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
              textAlign: 'center'
            }}>
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleVerifyAccess}
            style={{
              width: '100%',
              padding: 'clamp(11px, 2vw, 14px)',
              background: '#c8ff00',
              color: '#0e0e0e',
              border: 'none',
              borderRadius: 10,
              fontFamily: 'Syne',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Verify Access
          </button>
        </div>
      </div>
    );
  }

  // Rest of MySpace component (projects, skills management)
  return (
    <div>
      {/* Your MySpace admin content */}
    </div>
  );
};

export default MySpace;
```

## Simple Implementation

Minimal code example:

```javascript
// When user tries to access MySpace
const verifyAccess = async (code) => {
  const response = await fetch('http://localhost:5000/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessCode: code })
  });
  
  const result = await response.json();
  
  if (result.success) {
    // Allow access to MySpace
    setIsAdmin(true);
  } else {
    // Show error message
    setError(result.message);
  }
};
```

## How It Works

```
User visits /myspace
    ↓
Access code modal shown
    ↓
User enters code and submits
    ↓
Frontend sends: POST /api/auth/verify with code
    ↓
Backend verifies against ACCESS_CODE in .env
    ↓
If valid → User gets access to MySpace UI
If invalid → Error message shown, user can retry
    ↓
User can save projects/skills with x-admin-key header
```

## Testing with cURL

```bash
# Verify correct code
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"accessCode": "bikash330"}'

# Will get: Success response
```

## Testing with Postman

1. Create new POST request
2. URL: `http://localhost:5000/api/auth/verify`
3. Body (raw JSON):
```json
{
  "accessCode": "bikash330"
}
```
4. Send
5. Should get success response

## Changing Access Code

Update in `Backend/.env`:

```env
ACCESS_CODE="your-new-secure-code"
```

Changes take effect immediately after server restart.

## Security Notes

1. **Access Code in .env** - Protect your .env file
2. **HTTPS in Production** - Always use HTTPS
3. **Strong Code** - Use something harder to guess than "bikash330"
4. **Change Regularly** - Update code periodically
5. **No Persistence** - Code verified fresh each time

## Frontend Component Template

Complete access code gate component:

```javascript
import React, { useState } from 'react';

const AccessCodeGate = ({ onVerified, children }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/verify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessCode: code })
        }
      );

      const result = await response.json();

      if (result.success) {
        setIsVerified(true);
        onVerified?.();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Connection error. try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) return children;

  return (
    <div className="access-gate">
      <form onSubmit={handleSubmit}>
        <h2>🔐 Admin Access</h2>
        <input
          type="password"
          placeholder="Enter access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={loading}
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default AccessCodeGate;
```

## Files Modified

- ✅ `controllers/authController.js` - Simplified to just verify access code
- ✅ `routes/auth.js` - Single endpoint for access code verification
- ✅ `app.js` - Updated endpoint list
- ✅ `package.json` - Removed jsonwebtoken dependency
- ✅ `.env` - Removed JWT_SECRET

## No Changes Needed For

- MongoDB/Cloudinary integration - Still works as is
- Projects/Skills endpoints - Use x-admin-key header (independent)
- Contact form - Unchanged
- Health check - Unchanged

## Next Steps

1. No new dependencies to install
2. Update frontend MySpace.jsx with access code modal
3. Users enter code each time accessing /myspace
4. Code is verified with backend
5. If valid, show admin UI for managing projects/skills

