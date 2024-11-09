import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const RegistrarEspecie = () => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombreComun, setNombreComun] = useState("");
  const [familia, setFamilia] = useState("");
  const [cantidadMuestras, setCantidadMuestras] = useState("");
  const [estadoPlanta, setEstadoPlanta] = useState("");
  const [fotosEspecie, setFotosEspecie] = useState([]);

  const manejarCambioFotos = (e) => {
    const archivos = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setFotosEspecie(archivos);
  };

  const registrarEspecie = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "especies"), {
        nombreCientifico,
        nombreComun,
        familia,
        cantidadMuestras,
        estadoPlanta,
        fotosEspecie
      });

      alert("Especie registrada con éxito");
      // Limpiar el formulario
      setNombreCientifico("");
      setNombreComun("");
      setFamilia("");
      setCantidadMuestras("");
      setEstadoPlanta("");
      setFotosEspecie([]);
    } catch (error) {
      console.error("Error registrando especie: ", error);
    }
  };

  return (
    <form onSubmit={registrarEspecie}>
      <h2>Registrar Especie</h2>
      <input
        type="text"
        value={nombreCientifico}
        onChange={(e) => setNombreCientifico(e.target.value)}
        placeholder="Nombre Científico"
        required
      />
      <input
        type="text"
        value={nombreComun}
        onChange={(e) => setNombreComun(e.target.value)}
        placeholder="Nombre Común"
        required
      />
      <input
        type="text"
        value={familia}
        onChange={(e) => setFamilia(e.target.value)}
        placeholder="Familia"
        required
      />
      <input
        type="text"
        value={cantidadMuestras}
        onChange={(e) => setCantidadMuestras(e.target.value)}
        placeholder="Cantidad de Muestras"
        required
      />
      <input
        type="text"
        value={estadoPlanta}
        onChange={(e) => setEstadoPlanta(e.target.value)}
        placeholder="Estado de la Planta"
        required
      />
      <input type="file" multiple onChange={manejarCambioFotos} />
      <button type="submit">Registrar Especie</button>
    </form>
  );
};

export default RegistrarEspecie;
