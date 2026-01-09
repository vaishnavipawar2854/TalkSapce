# Vercel Deployment Guide for TalkSpace Backend

## ✅ Files Created for Deployment

### 1. vercel.json
Configuration file that tells Vercel how to deploy your Express app as a serverless function.

### 2. Updated Files
- `server.js` - Modified to export app for serverless
- `config/db.js` - Added connection caching for serverless

## 🚀 Deploy to Vercel

### Step 1: Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from Backend Directory
```bash
cd d:\Project\ContactManagment\backend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **talkspace-backend** (or your preferred name)
- Directory? **./** (current directory)
- Override settings? **N**

### Step 4: Set Environment Variables in Vercel

After deployment, you MUST set these environment variables in Vercel Dashboard:

1. Go to your project on Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
MONGODB_URI = your_mongodb_connection_string
NODE_ENV = production
PORT = 5000
```

**Important:** Replace `your_mongodb_connection_string` with your actual MongoDB Atlas connection string.

### Step 5: Redeploy After Adding Variables
```bash
vercel --prod
```

## 🔧 Environment Variables Required

### MONGODB_URI
Your MongoDB connection string from MongoDB Atlas:
```
mongodb+srv://username:password@cluster.mongodb.net/contactManagement?retryWrites=true&w=majority
```

### NODE_ENV
```
production
```

### PORT (Optional)
```
5000
```

## 📝 What Changed

### server.js
- Added conditional server start (only in development)
- Exported app for Vercel serverless
- App now works both locally and on Vercel

### config/db.js
- Added connection caching for serverless
- Improved error handling for production
- Added mongoose connection options for reliability

## 🧪 Test Your Deployment

After deployment, you'll get a URL like:
```
https://talkspace-backend.vercel.app
```

Test these endpoints:

### 1. Root Endpoint
```bash
curl https://your-app.vercel.app/
```

Should return:
```json
{
  "message": "Welcome to TalkSpace API",
  "version": "1.0.0"
}
```

### 2. Get Contacts
```bash
curl https://your-app.vercel.app/api/contacts
```

### 3. Create Contact
```bash
curl -X POST https://your-app.vercel.app/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890"}'
```

## 🔄 Update Frontend API URL

After deployment, update your frontend to use the Vercel backend URL:

### Option 1: Environment Variable (Recommended)
Create `frontend/.env`:
```
REACT_APP_API_URL=https://your-app.vercel.app
```

Then update axios calls in ContactForm.js and ContactList.js:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.post(`${API_URL}/api/contacts`, formData);
```

### Option 2: Direct Update
Replace `'/api/contacts'` with your Vercel URL in:
- `frontend/src/components/ContactForm.js`
- `frontend/src/components/ContactList.js`

## 🛠️ Troubleshooting

### Error: FUNCTION_INVOCATION_FAILED

**Cause:** Missing environment variables

**Solution:** 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add MONGODB_URI
3. Redeploy: `vercel --prod`

### Error: MongoDB Connection Timeout

**Cause:** MongoDB Atlas IP whitelist

**Solution:**
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

### Error: Cannot connect to database

**Cause:** Wrong MongoDB URI

**Solution:**
1. Check your .env file locally
2. Copy exact MONGODB_URI to Vercel
3. Make sure password doesn't have special characters (use URL encoding)

## 📊 Vercel Deployment Settings

### Build Settings
- Build Command: (leave empty)
- Output Directory: (leave empty)
- Install Command: `npm install`

### Framework Preset
- Other (default)

### Root Directory
- ./ (current directory)

## 🔐 Security Checklist

- ✅ Environment variables set in Vercel (not in code)
- ✅ MongoDB Atlas IP whitelist configured
- ✅ CORS configured in server.js
- ✅ .env file in .gitignore
- ✅ No sensitive data in git repository

## 🚀 Redeploy After Changes

Every time you update your backend code:

```bash
cd d:\Project\ContactManagment\backend
git add .
git commit -m "your changes"
git push

# Vercel will auto-deploy if connected to Git
# Or manually deploy:
vercel --prod
```

## 📱 Connect Frontend to Backend

After backend is deployed, update frontend:

1. Update API URLs
2. Deploy frontend to Vercel
3. Test the full application

## ✅ Success Checklist

- [ ] vercel.json created
- [ ] server.js exports app
- [ ] db.js has connection caching
- [ ] Deployed to Vercel (`vercel --prod`)
- [ ] Environment variables set in Vercel Dashboard
- [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0
- [ ] API endpoints tested and working
- [ ] Frontend updated with backend URL

---

**Your backend is now ready for serverless deployment! 🎉**
