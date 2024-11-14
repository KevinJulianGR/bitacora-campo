import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const NuevaEspecie = () => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [familia, setFamilia] = useState("");
  const [cantidadMuestras, setCantidadMuestras] = useState("");
  const [estadoPlanta, setEstadoPlanta] = useState("");
  const [fotosEspecies, setFotosEspecies] = useState([]);

  const agregarEspecie = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "especies"), {
        nombreCientifico,
        nombreComun,
        familia,
        cantidadMuestras,
        estadoPlanta,
        fotosEspecies,
      });

      setNombreCientifico("");
      setNombreComun("");
      setFamilia("");
      setCantidadMuestras("");
      setEstadoPlanta("");
      setFotosEspecies([]);

      alert("Especie agregada con éxito");
    } catch (error) {
      console.error("Error agregando especie: ", error);
    }
  };

  return (
    <form onSubmit={agregarEspecie}>
      <input value={nombreCientifico} onChange={(e) => setNombreCientifico(e.target.value)} placeholder="Nombre Científico" required />
      <input value={nombreComun} onChange={(e) => setNombreComun(e.target.value)} placeholder="Nombre Común" required />
      <input value={familia} onChange={(e) => setFamilia(e.target.value)} placeholder="Familia" required />
      <input value={cantidadMuestras} onChange={(e) => setCantidadMuestras(e.target.value)} placeholder="Cantidad de Muestras" required />
      <input value={estadoPlanta} onChange={(e) => setEstadoPlanta(e.target.value)} placeholder="Estado de la Planta" required />
      <button type="submit">Agregar Especie</button>
    </form>
  );
};

export default NuevaEspecie;
