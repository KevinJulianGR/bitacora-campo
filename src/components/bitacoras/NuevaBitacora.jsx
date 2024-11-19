import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import './NuevaBitacora.css'; 

const NuevaBitacora = () => {
  const [titulo, setTitulo] = useState("");
  const [clima, setClima] = useState("");
  const [humedad, setHumedad] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [habitat, setHabitat] = useState("");
  const [localizacion, setLocalizacion] = useState({ lat: "", lng: "" });
  const [observaciones, setObservaciones] = useState("");
  const [idEspecie, setIdEspecie] = useState("");

  const agregarBitacora = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bitacoras"), {
        titulo,
        "condicion-climatica": {
          clima,
          humedad,
          temperatura,
        },
        detallesEspecie: [{ idEspecie }],
        habitat,
        localizacion: { lat: parseFloat(localizacion.lat), lng: parseFloat(localizacion.lng) },
        observaciones,
        fecha: Timestamp.fromDate(new Date()), // Guarda fecha actual
      });

      // Limpia el formulario
      setTitulo("");
      setClima("");
      setHumedad("");
      setTemperatura("");
      setHabitat("");
      setLocalizacion({ lat: "", lng: "" });
      setObservaciones("");
      setIdEspecie("");

      alert("Bitácora agregada con éxito");
    } catch (error) {
      console.error("Error agregando bitácora: ", error);
    }
  };

  return (
    <form onSubmit={agregarBitacora} className="formulario-bitacora">
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
      <input value={clima} onChange={(e) => setClima(e.target.value)} placeholder="Clima" required />
      <input value={humedad} onChange={(e) => setHumedad(e.target.value)} placeholder="Humedad" required />
      <input value={temperatura} onChange={(e) => setTemperatura(e.target.value)} placeholder="Temperatura" required />
      <input value={habitat} onChange={(e) => setHabitat(e.target.value)} placeholder="Hábitat" required />
      <input
        value={localizacion.lat}
        onChange={(e) => setLocalizacion({ ...localizacion, lat: e.target.value })}
        placeholder="Latitud"
        required
      />
      <input
        value={localizacion.lng}
        onChange={(e) => setLocalizacion({ ...localizacion, lng: e.target.value })}
        placeholder="Longitud"
        required
      />
      <input value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Observaciones" required />
      <input value={idEspecie} onChange={(e) => setIdEspecie(e.target.value)} placeholder="ID Especie" required />
      <button type="submit">Agregar Bitácora</button>
    </form>
  );
};

export default NuevaBitacora;
