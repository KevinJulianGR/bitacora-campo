import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapaMuestreos = ({ coordenadas }) => {
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={coordenadas} zoom={10}>
        <Marker position={coordenadas} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapaMuestreos;
