import React, { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const EditarEliminarBitacora = ({ idBitacora }) => {
  const [bitacora, setBitacora] = useState(null);

  useEffect(() => {
    const cargarBitacora = async () => {
      const docRef = doc(db, "bitacoras", idBitacora);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBitacora(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    cargarBitacora();
  }, [idBitacora]);

  const actualizarBitacora = async () => {
    const docRef = doc(db, "bitacoras", idBitacora);
    await updateDoc(docRef, {
      titulo: bitacora.titulo,
      observaciones: bitacora.observaciones,
    });
    alert("Bitácora actualizada con éxito");
  };

  const eliminarBitacora = async () => {
    await deleteDoc(doc(db, "bitacoras", idBitacora));
    alert("Bitácora eliminada con éxito");
  };

  if (!bitacora) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Editar Bitácora</h2>
      <input
        value={bitacora.titulo}
        onChange={(e) => setBitacora({ ...bitacora, titulo: e.target.value })}
      />
      <textarea
        value={bitacora.observaciones}
        onChange={(e) => setBitacora({ ...bitacora, observaciones: e.target.value })}
      />
      <button onClick={actualizarBitacora}>Actualizar Bitácora</button>
      <button onClick={eliminarBitacora}>Eliminar Bitácora</button>
    </div>
  );
};

export default EditarEliminarBitacora;
