import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const NuevoUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [activo, setActivo] = useState(false);
  const [rol, setRol] = useState("");

  const agregarUsuario = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "usuarios"), {
        nombre,
        correo,
        contrasena,
        activo,
        rol,
      });

      setNombre("");
      setCorreo("");
      setContrasena("");
      setActivo(false);
      setRol("");

      alert("Usuario agregado con éxito");
    } catch (error) {
      console.error("Error agregando usuario: ", error);
    }
  };

  return (
    <form onSubmit={agregarUsuario}>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
      <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" required />
      <input value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Contraseña" required />
      <select value={rol} onChange={(e) => setRol(e.target.value)} required>
        <option value="">Selecciona un rol</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <label>
        <input type="checkbox" checked={activo} onChange={() => setActivo(!activo)} />
        Activo
      </label>
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default NuevoUsuario;
