const express = require('express');
const multer = require('multer');
const path = require('path');
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 3000;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.redirect('/register'));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../views/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '../views/dashboard.html')));

app.post('/api/register', upload.single('foto'), authController.register);
app.post('/api/login', authController.login);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
