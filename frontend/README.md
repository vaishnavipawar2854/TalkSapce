# TalkSpace Client - React Frontend

A responsive contact form application built with React for the TalkSpace contact management system.

## Features

- ✅ **Functional React Component** with useState hooks
- ✅ **Real-time Form Validation** with clear error messages
- ✅ **Responsive Design** - Works on all devices
- ✅ **Smart Submit Button** - Disabled when form is invalid
- ✅ **Success/Error Messages** - Clear user feedback
- ✅ **Auto Form Reset** - After successful submission
- ✅ **Character Counter** - For message field
- ✅ **Loading State** - Shows spinner during submission

## Form Fields

1. **Name** (Required) - Max 100 characters
2. **Email** (Required) - Valid email format
3. **Phone** (Required) - Valid phone format (e.g., 123-456-7890)
4. **Message** (Optional) - Max 500 characters with counter

## Validation Rules

### Client-Side Validation
- Name: Required, trimmed, max 100 characters
- Email: Required, valid email format
- Phone: Required, valid phone format
- Message: Optional, max 500 characters

### Visual Feedback
- Red border and background for invalid fields
- Error messages appear below fields
- Submit button disabled until all required fields are valid
- Success message displayed after successful submission

## Installation

```bash
cd client
npm install
```

## Running the App

### Development Mode
```bash
npm start
```

The app will open at `http://localhost:3000`

### Production Build
```bash
npm run build
```

## API Integration

The form connects to the backend at `http://localhost:5000/api/contacts`

Make sure the backend server is running before submitting the form.

## Component Structure

```
src/
├── App.js                    # Main app component
├── App.css                   # App styling
├── index.js                  # React entry point
├── index.css                 # Global styles
└── components/
    ├── ContactForm.js        # Contact form component
    └── ContactForm.css       # Form styling
```

## Technologies Used

- **React 18** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with animations
- **React Hooks** - useState for state management

## User Experience Features

1. **Real-time Validation** - Errors clear as user types
2. **Visual Feedback** - Color-coded success/error messages
3. **Loading States** - Spinner during submission
4. **Auto-clear** - Success message disappears after 5 seconds
5. **Disabled State** - Button disabled during submission
6. **Smooth Animations** - Professional transitions and effects

## Responsive Breakpoints

- Mobile: < 480px
- Tablet: < 768px
- Desktop: ≥ 768px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
