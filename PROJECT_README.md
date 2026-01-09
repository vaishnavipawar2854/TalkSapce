# TalkSpace - Complete MERN Contact Management App

A full-stack contact management application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🌟 Features

### Backend (Node.js + Express)
- RESTful API with MongoDB integration
- Contact schema with validation
- CRUD operations (Create, Read, Delete)
- CORS enabled
- Error handling and validation

### Frontend (React)
- Contact submission form with real-time validation
- Live contact list with auto-refresh
- Responsive design (desktop & mobile)
- Delete functionality with confirmation
- Loading states and error handling
- Empty state UI
- Success/error notifications

## 📁 Project Structure

```
ContactManagement/
├── server.js                    # Backend server
├── package.json                 # Backend dependencies
├── .env                         # Environment variables
├── config/
│   └── db.js                   # MongoDB connection
├── models/
│   └── Contact.js              # Contact schema
├── routes/
│   └── contactRoutes.js        # API routes
├── controllers/
│   └── contactController.js    # Route handlers
└── client/                      # React frontend
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js              # Main app component
        ├── App.css
        └── components/
            ├── ContactForm.js   # Form component
            ├── ContactForm.css
            ├── ContactList.js   # List component
            └── ContactList.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd D:\Project\ContactManagment
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Install frontend dependencies:**
```bash
cd client
npm install
cd ..
```

4. **Configure environment variables:**
Edit `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/talkspace
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/talkspace?retryWrites=true&w=majority
```

### Running the Application

#### Option 1: Run separately (Development)

**Terminal 1 - Backend:**
```bash
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
App runs on `http://localhost:3000`

#### Option 2: Run concurrently (Optional - see below for setup)

```bash
npm run dev:all
```

## 📋 API Endpoints

### Backend API (`http://localhost:5000`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contacts` | Create a new contact |
| GET | `/api/contacts` | Get all contacts (sorted by newest) |
| DELETE | `/api/contacts/:id` | Delete a contact by ID |

### Example Request (POST)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "message": "Hello, I'd like to connect!"
}
```

### Example Response
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "message": "Hello, I'd like to connect!",
    "createdAt": "2026-01-09T..."
  }
}
```

## 🎨 Features in Detail

### Contact Form Component
- ✅ Real-time validation
- ✅ Email format validation
- ✅ Phone format validation
- ✅ Character counter for message (500 max)
- ✅ Disabled submit button when form is invalid
- ✅ Loading state during submission
- ✅ Success/error notifications
- ✅ Auto-clear form after successful submission
- ✅ Auto-refreshes contact list

### Contact List Component
- ✅ Fetches contacts on mount using useEffect
- ✅ Displays contacts sorted by newest first
- ✅ Table view for desktop
- ✅ Card view for mobile
- ✅ Clickable email (mailto:) and phone (tel:) links
- ✅ Delete button with confirmation dialog
- ✅ Instant UI update after deletion
- ✅ Loading spinner while fetching data
- ✅ Empty state message when no contacts
- ✅ Error handling with retry button
- ✅ Contact counter in header

### Integration Features
- ✅ Form submission triggers list refresh
- ✅ No page reload needed
- ✅ Seamless data flow between components
- ✅ Consistent styling across app
- ✅ Responsive design for all screen sizes

## 📱 Responsive Design

- **Desktop (>768px):** Table layout with all columns
- **Tablet (768px - 1024px):** Optimized table view
- **Mobile (<768px):** Card-based layout

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Hooks** - useState, useEffect
- **CSS3** - Custom styling with animations

## 🎯 Optional Enhancements

### Run Both Servers Concurrently (Optional)

1. Install concurrently:
```bash
npm install --save-dev concurrently
```

2. Update `package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "client": "cd client && npm start",
  "dev:all": "concurrently \"npm run dev\" \"npm run client\""
}
```

3. Run both:
```bash
npm run dev:all
```

## 🐛 Troubleshooting

### Backend not starting?
- Ensure MongoDB is running
- Check `.env` file configuration
- Verify port 5000 is available

### Frontend not connecting?
- Ensure backend is running on port 5000
- Check `client/package.json` has `"proxy": "http://localhost:5000"`
- Clear browser cache and restart

### CORS errors?
- Verify CORS is enabled in `server.js`
- Check backend is running before frontend

### MongoDB connection failed?
- For local: Ensure MongoDB service is running
- For Atlas: Verify connection string and network access
- Check username/password in connection string

## 📝 Development Tips

1. **Start backend first**, then frontend
2. Use **Chrome DevTools** to debug React components
3. Check **Network tab** for API calls
4. Use **MongoDB Compass** to view database
5. Check terminal logs for errors

## 🔒 Security Notes

For production deployment:
- Add input sanitization
- Implement rate limiting
- Add authentication/authorization
- Use environment variables for sensitive data
- Enable HTTPS
- Add CSRF protection

## 📄 License

ISC

## 👥 Support

For issues or questions, please check:
- Backend README: `/README.md`
- Frontend README: `/client/README.md`

---

**Made with ❤️ for TalkSpace Contact Management**
