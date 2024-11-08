
import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const NuevaBitacora = () => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [localizacion, setLocalizacion] = useState('');
  const [clima, setClima] = useState('');
  const [habitat, setHabitat] = useState('');
  const [observaciones, setObservaciones] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Guarda la nueva bitácora en Firestore
      await addDoc(collection(db, 'bitacoras'), {
        titulo,
        fecha: serverTimestamp(),  // Guardar la fecha automáticamente
        localizacion,
        clima,
        habitat,
        observaciones,
      });
      alert("¡Bitácora registrada correctamente!");
    } catch (error) {
      console.error("Error al registrar la bitácora:", error);
      alert("Hubo un error al guardar la bitácora.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la bitácora"
      />
      <input
        type="datetime-local"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="text"
        value={localizacion}
        onChange={(e) => setLocalizacion(e.target.value)}
        placeholder="Localización"
      />
      <input
        type="text"
        value={clima}
        onChange={(e) => setClima(e.target.value)}
        placeholder="Clima"
      />
      <input
        type="text"
        value={habitat}
        onChange={(e) => setHabitat(e.target.value)}
        placeholder="Hábitat"
      />
      <textarea
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        placeholder="Observaciones"
      />
      <button type="submit">Registrar Bitácora</button>
    </form>
  );
};

export default NuevaBitacora;
