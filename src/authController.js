const db = require('./db');
const bcrypt = require('bcryptjs');

// Modulo 1: Registro
exports.register = async (req, res) => {
  const { nombre, correo, edad, password } = req.body;
  const fotoNombre = req.file ? req.file.filename : 'default.png';
  if (!nombre || nombre.length === 0) {
    return res.status(400).json({ error: 'El nombre es obligatorio.' });
  }

  const regexEmail = /^.+@.+$/;
  if (!correo || !regexEmail.test(correo)) {
    return res.status(400).json({ error: 'Formato de correo invalido.' });
  }

  const edadNum = Number(edad);
  if (isNaN(edadNum) || edad === '') {
    return res.status(400).json({ error: 'La edad debe ser un numero valido.' });
  }

  if (edadNum < 18) {
    return res.status(400).json({ error: 'Debes tener al menos 18 anos.' });
  }

  if (!password) {
    return res.status(400).json({ error: 'La contrasena es obligatoria.' });
  }

  if (password.length <= 8) {
    return res.status(400).json({ error: 'La contrasena debe tener mas de 8 caracteres.' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El correo ya esta registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
  'INSERT INTO users (nombre, correo, edad, password, foto) VALUES (?, ?, ?, ?, ?)',
  [nombre, correo, edadNum, hashedPassword, fotoNombre]
);

    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno en el servidor.' });
  }
};

// Modulo 2: Login
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE correo = ?', [correo]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales invalidas.' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales invalidas.' });
    }

    return res.status(200).json({
      mensaje: 'Autenticacion satisfactoria.',
      usuario: { id: user.id, nombre: user.nombre, correo: user.correo }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno en el servidor.' });
  }
};
