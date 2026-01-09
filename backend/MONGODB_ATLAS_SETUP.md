# 🔧 MongoDB Atlas Setup for Vercel

## ⚠️ Important!

Your current `.env` uses **local MongoDB** (`localhost:27017`). 

Vercel serverless functions **cannot connect to localhost**. You need **MongoDB Atlas** (free cloud database).

## 🚀 Setup MongoDB Atlas (Free Tier)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (it's FREE)
3. Choose **FREE tier** (M0 Sandbox)

### Step 2: Create a Cluster

1. Click **"Build a Database"**
2. Choose **"FREE"** (M0) tier
3. Select cloud provider (AWS recommended)
4. Choose region closest to you
5. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. Click **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `talkspace` (or any name)
5. Password: Generate or create strong password
6. **⚠️ SAVE THIS PASSWORD!** You'll need it
7. User Privileges: **"Read and write to any database"**
8. Click **"Add User"**

### Step 4: Whitelist IP Addresses

1. Click **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

**Why:** Vercel uses dynamic IPs, so we need to allow all IPs.

### Step 5: Get Connection String

1. Click **"Database"** in left menu
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **4.1 or later**
5. Copy the connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Update Connection String

Replace `<username>` and `<password>` with your credentials:

**Before:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**After (example):**
```
mongodb+srv://talkspace:MyStr0ngP@ssw0rd@cluster0.abc123.mongodb.net/talkspace?retryWrites=true&w=majority
```

**Important:**
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/talkspace` before the `?` (this is your database name)

## 🔐 Update Your .env File

Update `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talkspace?retryWrites=true&w=majority
NODE_ENV=development
```

## 📤 Set Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"**
5. Add:

```
Name: MONGODB_URI
Value: mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/talkspace?retryWrites=true&w=majority
Environment: Production, Preview, Development (select all)
```

```
Name: NODE_ENV
Value: production
Environment: Production
```

6. Click **"Save"**

## 🧪 Test MongoDB Atlas Connection Locally

Update your `.env` with Atlas connection string, then:

```bash
cd d:\Project\ContactManagment\backend
npm start
```

Try creating a contact in your app. If it works locally with Atlas, it will work on Vercel!

## ⚡ Deploy to Vercel

After setting up MongoDB Atlas:

```bash
cd d:\Project\ContactManagment\backend
git add .
git commit -m "Add MongoDB Atlas configuration"
git push
vercel --prod
```

## 🎯 Final Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (FREE tier)
- [ ] Database user created with password saved
- [ ] Network access allows 0.0.0.0/0
- [ ] Connection string obtained
- [ ] Updated local .env with Atlas URI
- [ ] Tested locally - works!
- [ ] Set MONGODB_URI in Vercel Dashboard
- [ ] Set NODE_ENV=production in Vercel
- [ ] Deployed to Vercel
- [ ] Tested Vercel deployment - works!

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
**Cause:** Wrong username or password
**Fix:** Double-check credentials in connection string

### Error: "Connection timeout"
**Cause:** IP not whitelisted
**Fix:** Add 0.0.0.0/0 to Network Access in Atlas

### Error: "Database not found"
**Cause:** Missing database name in URI
**Fix:** Add `/talkspace` before `?` in connection string:
```
...mongodb.net/talkspace?retryWrites...
                ^^^^^^^^
```

## 📊 MongoDB Atlas Free Tier Limits

- Storage: 512 MB (plenty for contacts app)
- Connections: 500 (more than enough)
- Backups: Manual only
- Cost: **FREE** forever!

## 🔄 Migrate Local Data to Atlas (Optional)

If you have existing contacts in local MongoDB:

### Option 1: Manual (if few contacts)
Just recreate them in your app after Atlas is connected.

### Option 2: Export/Import (if many contacts)
```bash
# Export from local
mongodump --db talkspace --out ./backup

# Import to Atlas (get URI from Atlas dashboard)
mongorestore --uri "your_atlas_connection_string" --db talkspace ./backup/talkspace
```

## ✅ Success!

Once you see:
```
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

Your backend is ready for Vercel! 🎉

---

**Next:** Redeploy to Vercel after updating environment variables.
