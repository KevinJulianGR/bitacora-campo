import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import './NuevaEspecie.css'; 

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
    <form onSubmit={agregarEspecie} className="form-especie">
      <input 
        value={nombreCientifico} 
        onChange={(e) => setNombreCientifico(e.target.value)} 
        placeholder="Nombre Científico" 
        required 
        className="input-field"
      />
      <input 
        value={nombreComun} 
        onChange={(e) => setNombreComun(e.target.value)} 
        placeholder="Nombre Común" 
        required 
        className="input-field"
      />
      <input 
        value={familia} 
        onChange={(e) => setFamilia(e.target.value)} 
        placeholder="Familia" 
        required 
        className="input-field"
      />
      <input 
        value={cantidadMuestras} 
        onChange={(e) => setCantidadMuestras(e.target.value)} 
        placeholder="Cantidad de Muestras" 
        required 
        className="input-field"
      />
      <input 
        value={estadoPlanta} 
        onChange={(e) => setEstadoPlanta(e.target.value)} 
        placeholder="Estado de la Planta" 
        required 
        className="input-field"
      />
      <button type="submit" className="submit-button">Agregar Especie</button>
    </form>
  );
};

export default NuevaEspecie;
