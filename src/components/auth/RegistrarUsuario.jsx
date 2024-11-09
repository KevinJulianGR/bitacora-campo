import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const RegistrarUsuario = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [activo, setActivo] = useState(true); // Por defecto activo
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "usuarios"), {
        correo,
        nombre,
        contrasena, // Puedes encriptar la contraseña antes de almacenarla
        rol,
        activo,
      });
      setSuccess("Usuario registrado con éxito");
      setError("");
      setCorreo("");
      setNombre("");
      setContrasena("");
      setRol("");
    } catch (error) {
      setError("Hubo un error al registrar el usuario: " + error.message);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={registrarUsuario}>
      <h2>Registrar Usuario</h2>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        required
      />
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <select value={rol} onChange={(e) => setRol(e.target.value)} required>
        <option value="">Seleccionar Rol</option>
        <option value="admin">Administrador</option>
        <option value="investigador">Investigador</option>
        <option value="colaborador">Colaborador</option>
      </select>
      <button type="submit">Registrar Usuario</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default RegistrarUsuario;

