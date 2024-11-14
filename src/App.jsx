import React from 'react';
import NuevaBitacora from './components/bitacoras/NuevaBitacora';
import ListaBitacoras from './components/bitacoras/ListaBitacoras';
import NuevaEspecie from './components/especies/NuevaEspecie';
import ListaEspecies from './components/especies/ListaEspecies';
import NuevoUsuario from './components/usuarios/NuevoUsuarios';

function App() {
  return (
    <div className="App">
      <h1>Bitácora de Campo</h1>
      <h2>Agregar Bitácora</h2>
      <NuevaBitacora />
      <h2>Lista de Bitácoras</h2>
      <ListaBitacoras />
      <h2>Agregar Especie</h2>
      <NuevaEspecie />
      <h2>Lista de Especies</h2>
      <ListaEspecies />
      <h2>Agregar Usuario</h2>
      <NuevoUsuario />
    </div>
  );
}

export default App;
