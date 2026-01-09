# TalkSpace - Contact Management Backend

A RESTful API backend for TalkSpace contact management application built with Node.js, Express, and MongoDB.

## Features

- Create, read, and delete contacts
- MongoDB integration with Mongoose
- Input validation and error handling
- CORS enabled
- RESTful API design

## Folder Structure

```
ContactManagement/
├── server.js              # Main application entry point
├── package.json           # Project dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── config/
│   └── db.js             # Database connection configuration
├── models/
│   └── Contact.js        # Mongoose Contact schema
├── routes/
│   └── contactRoutes.js  # API routes definition
└── controllers/
    └── contactController.js  # Business logic for contacts
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/talkspace
```

3. Make sure MongoDB is running locally or update the connection string for MongoDB Atlas.

## Usage

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Create Contact
**POST** `/api/contacts`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello, I'd like to get in touch!"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello, I'd like to get in touch!",
    "createdAt": "2026-01-09T..."
  }
}
```

### Get All Contacts
**GET** `/api/contacts`

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### Delete Contact
**DELETE** `/api/contacts/:id`

Response:
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## Contact Schema

- **name**: String (required, max 100 characters)
- **email**: String (required, valid email format)
- **phone**: String (required, valid phone format)
- **message**: String (optional, max 500 characters)
- **createdAt**: Date (auto-generated)

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## License

ISC
