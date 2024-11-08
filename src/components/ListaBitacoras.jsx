import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";  // Asegúrate de que la configuración de Firebase es correcta
import { collection, getDocs } from "firebase/firestore";

const ListaBitacoras = () => {
  const [bitacoras, setBitacoras] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener los documentos de la colección "bitacoras"
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "bitacoras"));
      
      // Mapear los datos de los documentos obtenidos y agregarlos al estado
      const bitacorasArray = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      // Actualizar el estado con los datos de las bitácoras
      setBitacoras(bitacorasArray);
    };

    // Llamar a la función para cargar los datos cuando el componente se monta
    fetchData();
  }, []);  // El array vacío significa que solo se ejecutará al montar el componente

  return (
    <div>
      <h2>Lista de Bitácoras</h2>
      <ul>
        {/* Mapear las bitácoras obtenidas y mostrarlas */}
        {bitacoras.length > 0 ? (
          bitacoras.map((bitacora) => (
            <li key={bitacora.id}>
              {/* Convertir el timestamp de fecha a formato legible */}
              <p>Fecha: {bitacora.fecha?.toDate()?.toLocaleString()}</p>
              {/* Verificar que 'location' existe y tiene los datos correctos */}
              <p>Ubicación: Latitud: {bitacora.location?._lat}, Longitud: {bitacora.location?._long}</p>
              {/* Agregar más información si es necesario */}
            </li>
          ))
        ) : (
          <p>No hay bitácoras disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default ListaBitacoras;
