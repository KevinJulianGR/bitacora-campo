import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase'; // Ajusta la ruta según tu estructura

export const registerUser = async (nombre, correo, contrasena, rol = 'usuario') => {
  try {
    // 1. Crear usuario en Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
    const user = userCredential.user;

    // 2. Crear documento en la colección usuarios de Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      nombre,
      correo,
      rol,
      activo: true
    });

    return user;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

export const loginUser = async (correo, contrasena) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Usuario no encontrado en base de datos');
    }

    const userData = userDoc.data();
    
    if (!userData.activo) {
      throw new Error('Usuario desactivado');
    }

    return {
      ...userData,
      uid: user.uid
    };
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};