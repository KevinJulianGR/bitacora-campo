import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ListaBitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);

  useEffect(() => {
    const obtenerBitacoras = async () => {
      const querySnapshot = await getDocs(collection(db, "bitacoras"));
      const bitacorasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBitacoras(bitacorasData);
    };

    obtenerBitacoras();
  }, []);

  return (
    <div>
      <h2>Lista de Bitácoras</h2>
      {bitacoras.map((bitacora) => (
        <div key={bitacora.id}>
          <p>
            <strong>Título:</strong> {bitacora.titulo || "Sin título"}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {bitacora.fecha
              ? new Date(bitacora.fecha.seconds * 1000).toLocaleString()
              : "Sin fecha"}
          </p>
          <p>
            <strong>Condición climática:</strong>
            <br />
            Clima: {bitacora["condicion-climatica"]?.clima || "No especificado"}
            <br />
            Humedad: {bitacora["condicion-climatica"]?.humedad || "No especificado"}
            <br />
            Temperatura: {bitacora["condicion-climatica"]?.temperatura || "No especificado"}
          </p>
          <p>
            <strong>Ubicación:</strong> Latitud: {bitacora.localizacion?.lat || "No especificado"}, 
            Longitud: {bitacora.localizacion?.lng || "No especificado"}
          </p>
          <p>
            <strong>Hábitat:</strong> {bitacora.habitat || "No especificado"}
          </p>
          <p>
            <strong>Observaciones:</strong> {bitacora.observaciones || "Sin observaciones"}
          </p>
          <p>
            <strong>Especies:</strong> {bitacora.detallesEspecie?.length > 0
              ? bitacora.detallesEspecie.map((especie, index) => (
                  <span key={index}>{especie.idEspecie}, </span>
                ))
              : "No hay especies registradas"}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListaBitacoras;
