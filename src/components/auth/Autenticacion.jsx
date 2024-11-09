import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Autenticacion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth();

  // Función para registrar un nuevo usuario
  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Usuario registrado con éxito");
      setError("");
    } catch (error) {
      setError("Error registrando usuario: " + error.message);
      setSuccess("");
    }
  };

  // Función para iniciar sesión
  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Inicio de sesión exitoso");
      setError("");
    } catch (error) {
      setError("Error iniciando sesión: " + error.message);
      setSuccess("");
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setSuccess("Cierre de sesión exitoso");
      setError("");
    } catch (error) {
      setError("Error cerrando sesión: " + error.message);
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Autenticación</h2>
      <form onSubmit={registrarUsuario}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
      <form onSubmit={iniciarSesion}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button onClick={cerrarSesion}>Cerrar Sesión</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Autenticacion;
