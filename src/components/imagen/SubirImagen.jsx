import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SubirImagen = () => {
  const [archivo, setArchivo] = useState(null);
  const [urlImagen, setUrlImagen] = useState("");

  const storage = getStorage();

  const manejarCambioArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const subirImagen = async () => {
    if (!archivo) return;

    const storageRef = ref(storage, `imagenes/${archivo.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, archivo);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setUrlImagen(downloadURL);
      alert("Imagen subida con éxito");
    } catch (error) {
      console.error("Error subiendo imagen: ", error);
    }
  };

  return (
    <div>
      <h2>Subir Imagen</h2>
      <input type="file" onChange={manejarCambioArchivo} />
      <button onClick={subirImagen}>Subir Imagen</button>
      {urlImagen && <img src={urlImagen} alt="Imagen subida" style={{ width: "300px" }} />}
    </div>
  );
};

export default SubirImagen;
