# 🚀 Vercel Frontend Deployment Guide

## ✅ Files Created for Deployment

### 1. Configuration Files
- **vercel.json** - Vercel configuration (optional rewrites)
- **.env.production** - Production environment variables
- **.env.development** - Development environment variables
- **.env.local** - Local testing variables

### 2. Updated Components
- **ContactForm.js** - Now uses `REACT_APP_API_URL`
- **ContactList.js** - Now uses `REACT_APP_API_URL`

## 🎯 Deploy to Vercel - Step by Step

### Step 1: Update Production Environment File

Edit `frontend/.env.production` and replace with your backend URL:

```env
REACT_APP_API_URL=https://your-actual-backend.vercel.app
```

**Example:**
```env
REACT_APP_API_URL=https://talkspace-backend-abc123.vercel.app
```

### Step 2: Deploy Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to frontend directory
cd d:\Project\ContactManagment\frontend

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **talkspace-frontend**
- Directory? **./** (current directory)
- Override settings? **N**

### Step 3: Set Environment Variables in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click your **talkspace-frontend** project
3. Click **Settings** → **Environment Variables**
4. Add:

```
Name: REACT_APP_API_URL
Value: https://your-backend.vercel.app
Environment: Production, Preview, Development (select all)
```

5. Click **Save**

### Step 4: Deploy to Production

```bash
vercel --prod
```

## 🔗 Update Backend CORS

After frontend is deployed, you need to update backend CORS to allow your frontend domain.

Edit `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://talkspace-frontend.vercel.app', // Your Vercel frontend URL
    'https://your-custom-domain.com' // If you have custom domain
  ],
  credentials: true
}));
```

Then redeploy backend:
```bash
cd d:\Project\ContactManagment\backend
git add .
git commit -m "Update CORS for frontend domain"
git push
vercel --prod
```

## 🧪 Test Your Deployment

After deployment, you'll get a URL like:
```
https://talkspace-frontend.vercel.app
```

Test:
1. Visit the URL
2. Fill and submit the contact form
3. Check if contacts appear in the list
4. Try deleting a contact

## 📁 Project Structure

```
frontend/
├── vercel.json              ← Vercel config
├── .env.production          ← Production variables
├── .env.development         ← Development variables
├── .env.local              ← Local testing
├── package.json
└── src/
    └── components/
        ├── ContactForm.js   ← Updated with API_URL
        └── ContactList.js   ← Updated with API_URL
```

## 🔧 How It Works

### Environment Variables
React apps use `REACT_APP_` prefix for environment variables:

```javascript
const API_URL = process.env.REACT_APP_API_URL || '';
```

### Different Environments

**Development (npm start):**
Uses `.env.development`:
```env
REACT_APP_API_URL=http://localhost:5000
```

**Production (vercel):**
Uses `.env.production` or Vercel Dashboard settings:
```env
REACT_APP_API_URL=https://your-backend.vercel.app
```

### API Calls
All axios calls now use the environment variable:

```javascript
// Before:
axios.post('/api/contacts', data)

// After:
axios.post(`${API_URL}/api/contacts`, data)
```

## 🛠️ Troubleshooting

### Error: Network Error / CORS

**Cause:** Backend CORS not configured for frontend domain

**Solution:**
1. Update backend CORS (see "Update Backend CORS" above)
2. Redeploy backend

### Error: API calls failing

**Cause:** Wrong API_URL

**Solution:**
1. Check Vercel Dashboard → Settings → Environment Variables
2. Make sure `REACT_APP_API_URL` is set correctly
3. Redeploy: `vercel --prod`

### Error: Environment variable not found

**Cause:** Environment variable not set in Vercel

**Solution:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add `REACT_APP_API_URL`
4. Redeploy

## 🎨 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `talkspace.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

### Update Environment Variables

After custom domain is set up:
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

## 🔄 Continuous Deployment

### Connect to Git

1. Go to Vercel Dashboard → Your Project
2. Click **Settings** → **Git**
3. Connect to your GitHub/GitLab repository
4. Choose branch: **main**

Now every push to main branch will auto-deploy!

```bash
git add .
git commit -m "Update frontend"
git push
# Vercel automatically deploys! 🎉
```

## 📊 Build Settings

Vercel automatically detects Create React App:

- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`
- **Development Command:** `npm start`

## ✅ Deployment Checklist

- [ ] `.env.production` created with backend URL
- [ ] Updated ContactForm.js with API_URL
- [ ] Updated ContactList.js with API_URL
- [ ] Deployed to Vercel (`vercel --prod`)
- [ ] Environment variable set in Vercel Dashboard
- [ ] Backend CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Tested form submission - works!
- [ ] Tested contact list - works!
- [ ] Tested delete function - works!

## 🎉 Success!

Your frontend is now deployed and connected to your backend!

**Frontend URL:** https://talkspace-frontend.vercel.app
**Backend URL:** https://talkspace-backend.vercel.app

## 📝 Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

## 🔐 Security Best Practices

- ✅ API URL in environment variables (not hardcoded)
- ✅ CORS configured properly
- ✅ No sensitive data in frontend code
- ✅ Environment variables not committed to git
- ✅ HTTPS enabled automatically by Vercel

---

**Your TalkSpace app is now fully deployed! 🚀**

**Local Development:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Production:**
- Frontend: https://your-frontend.vercel.app
- Backend: https://your-backend.vercel.app
