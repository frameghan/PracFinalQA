const express = require('express');
const path = require('path');
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.redirect('/register'));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../views/register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../views/login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '../views/dashboard.html')));

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
