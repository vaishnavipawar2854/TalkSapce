# 🚨 Backend Connection Fix Guide

## Problem
Your frontend is trying to connect to a placeholder backend URL (`https://your-backend-url.vercel.app`) instead of your actual deployed backend.

## Solution Steps

### Step 1: Get Your Backend URL
1. Go to https://vercel.com/dashboard
2. Find your **backend** project (e.g., "ContactManagement-backend" or "TalkSpace-backend")
3. Copy the deployment URL (e.g., `https://contact-management-backend-xyz.vercel.app`)
   - It should look like: `https://[your-project-name].vercel.app`

### Step 2: Update Frontend Environment Variable in Vercel
1. Go to your **frontend** project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add or update this variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend URL (from Step 1)
   - **Environment**: Select **Production**, **Preview**, and **Development**
4. Click **Save**

### Step 3: Redeploy Frontend
After updating the environment variable, you need to trigger a new deployment:

**Option A - In Vercel Dashboard:**
1. Go to **Deployments** tab
2. Click the three dots (•••) on the latest deployment
3. Click **Redeploy**
4. Select **Use existing Build Cache** and click **Redeploy**

**Option B - From Your Computer:**
```powershell
cd frontend
git add .
git commit --allow-empty -m "Trigger redeployment with updated env vars"
git push
```

### Step 4: Test Your Backend
Before redeploying, verify your backend is working:
1. Open your backend URL in a browser
2. You should see: `{"message":"Welcome to TalkSpace API","version":"1.0.0"}`
3. Test the API endpoint: `https://your-backend-url.vercel.app/api/contacts`
   - Should return: `{"success":true,"data":[...]}`

### Step 5: Verify the Fix
1. Wait 2-3 minutes for the frontend deployment to complete
2. Visit your frontend URL
3. The contacts should now load successfully! ✅

## Quick Reference Commands

### Check Backend Status
```powershell
# Visit these URLs in your browser:
# https://your-backend-url.vercel.app
# https://your-backend-url.vercel.app/api/contacts
```

### If You Need to Deploy Backend First
```powershell
cd backend
vercel --prod
# Copy the deployment URL shown in the terminal
```

### Deploy Frontend After Updating Env Vars
```powershell
cd frontend
vercel --prod
```

## Common Issues

### Issue: Still seeing "Failed to load contacts"
**Solution**: Clear your browser cache or open in incognito mode

### Issue: CORS errors in browser console
**Solution**: Make sure your backend is actually deployed and the URL is correct

### Issue: Backend URL returns 404
**Solution**: Your backend might not be deployed. Run `cd backend && vercel --prod`

### Issue: Environment variable not updating
**Solution**: Make sure you selected all environments (Production, Preview, Development) and triggered a redeploy

## Verification Checklist
- [ ] Backend is deployed and accessible
- [ ] Backend root URL shows welcome message
- [ ] Backend `/api/contacts` endpoint works
- [ ] Environment variable `REACT_APP_API_URL` is set in Vercel
- [ ] Frontend has been redeployed after env var update
- [ ] Contacts are loading on the deployed frontend
- [ ] Can submit new contacts
- [ ] Can delete contacts

## Need More Help?
If the issue persists, check:
1. MongoDB Atlas connection (should have whitelisted 0.0.0.0/0 for Vercel)
2. Backend logs in Vercel Dashboard → Deployments → Latest → Runtime Logs
3. Frontend console errors (F12 → Console tab)
