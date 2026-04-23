const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const multer = require('multer');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/agrotech', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Models
const Service = mongoose.model('Service', {
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  verified: { type: Boolean, default: false },
  userEmail: String
});

// Routes
app.get('/', (req, res) => {
  res.render('home', { messages: req.flash('success') });
});

app.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') });
});

app.post('/login', (req, res) => {
  // Simple login logic (in real app, check database)
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.user = { username: 'admin', role: 'admin' };
    res.redirect('/');
  } else {
    req.flash('error', 'Invalid credentials');
    res.redirect('/login');
  }
});

app.get('/add-service', (req, res) => {
  res.render('addService');
});

app.post('/add-service', upload.single('image'), async (req, res) => {
  const { name, category, price, description, email } = req.body;
  const image = req.file ? req.file.filename : '';

  const service = new Service({
    name,
    category,
    price,
    description,
    image,
    userEmail: email,
    verified: false
  });

  await service.save();

  // Send email to admin for verification
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-password' // Replace with your password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'admin-email@gmail.com', // Replace with admin email
    subject: 'New Service Added - Verification Required',
    text: `A new service has been added: ${name}. Please verify at /admin/verify/${service._id}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  req.flash('success', 'Service added successfully. Awaiting verification.');
  res.redirect('/');
});

app.get('/view-services', async (req, res) => {
  const services = await Service.find({ verified: true });
  res.render('viewServices', { services });
});

app.get('/buy', (req, res) => {
  res.render('buy');
});

app.get('/help', (req, res) => {
  res.render('help');
});

app.post('/process-rental', (req, res) => {
  // Process rental request
  req.flash('success', 'Rental request submitted successfully!');
  res.redirect('/');
});

app.get('/admin/verify/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render('verify', { service });
});

app.put('/admin/verify/:id', async (req, res) => {
  await Service.findByIdAndUpdate(req.params.id, { verified: true });
  res.redirect('/view-services');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});</content>
<parameter name="filePath">c:\Users\YUvVRAJ\Desktop\pooja mam\server.js