import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import './ListaEspecies.css'; // Importamos el archivo CSS

const ListaEspecies = () => {
  const [especies, setEspecies] = useState([]);

  useEffect(() => {
    const obtenerEspecies = async () => {
      const querySnapshot = await getDocs(collection(db, "especies"));
      const especiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEspecies(especiesData);
    };

    obtenerEspecies();
  }, []);

  return (
    <div className="lista-especies-container">
      <h2 className="titulo">Lista de Especies</h2>
      {especies.map((especie) => (
        <div key={especie.id} className="especie-item">
          <p><strong>Nombre Científico:</strong> {especie.nombreCientifico}</p>
          <p><strong>Nombre Común:</strong> {especie.nombreComun}</p>
          <p><strong>Familia:</strong> {especie.familia}</p>
          <p><strong>Cantidad de Muestras:</strong> {especie.cantidadMuestras}</p>
          <p><strong>Estado de la Planta:</strong> {especie.estadoPlanta}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListaEspecies;
