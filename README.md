# AgroTECH - Agricultural Services Platform

A modern web application for connecting farmers with agricultural service providers.

## Features

- **Service Listing**: Verified agricultural services from trusted providers
- **Service Addition**: Users can add their services with admin verification
- **Email Verification**: Admin receives email notifications for new service approvals
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Engaging design with animations and gradients
- **Search Functionality**: Find services easily
- **Admin Panel**: Verify and manage services

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set up MongoDB**:
   - Install MongoDB locally or use MongoDB Atlas
   - Update the connection string in `server.js` if needed

3. **Configure Email** (for verification):
   - Update the email credentials in `server.js`
   - Replace `'your-email@gmail.com'` and `'your-password'` with actual Gmail credentials
   - For production, use environment variables

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the App**:
   - Open `http://localhost:3000` in your browser

## Admin Access

- Username: `admin`
- Password: `admin`

## Project Structure

```
├── views/              # EJS templates
│   ├── home.ejs
│   ├── addService.ejs
│   ├── viewServices.ejs
│   ├── verify.ejs
│   └── login.ejs
├── public/             # Static files
│   └── uploads/        # Uploaded service images
├── server.js           # Main application file
├── package.json        # Dependencies
└── README.md           # This file
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templates, CSS3, Font Awesome
- **Email**: Nodemailer
- **File Upload**: Multer

## Key Routes

- `/` - Home page
- `/add-service` - Add new service
- `/view-services` - View all verified services
- `/admin/verify/:id` - Admin verification page
- `/login` - Admin login

## Security Notes

- Implement proper authentication for production
- Use environment variables for sensitive data
- Add input validation and sanitization
- Implement rate limiting for API endpoints

## Future Enhancements

- User registration and authentication
- Payment integration
- Service booking system
- Reviews and ratings
- Advanced search and filtering
- Mobile app development