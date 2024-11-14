const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your-firebase-adminsdk.json');

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com'
});

const db = admin.firestore();

// Rutas para la gestión de usuarios y bitácoras
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;
    await db.collection('usuarios').add({
      nombre, correo, contrasena, rol, activo: true
    });
    res.status(200).send('Usuario creado');
  } catch (error) {
    res.status(500).send('Error al crear usuario');
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
