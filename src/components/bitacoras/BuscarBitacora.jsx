import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const BuscarBitacoras = () => {
  const [titulo, setTitulo] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarPorTitulo = async () => {
    const q = query(collection(db, "bitacoras"), where("titulo", "==", titulo));
    const querySnapshot = await getDocs(q);
    const bitacorasEncontradas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setResultados(bitacorasEncontradas);
  };

  return (
    <div>
      <h2>Buscar Bitácoras</h2>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la bitácora"
      />
      <button onClick={buscarPorTitulo}>Buscar</button>
      <ul>
        {resultados.map((bitacora) => (
          <li key={bitacora.id}>{bitacora.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default BuscarBitacoras;
