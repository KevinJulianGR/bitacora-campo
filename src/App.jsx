
import React from 'react';
import NuevaBitacora from './components/NuevaBitacora';
import ListaBitacoras from './components/ListaBitacoras';

function App() {
  return (
    <div className="App">
      <h1>Bitácora de Campo</h1>
      <NuevaBitacora />
      <ListaBitacoras />
    </div>
  );
}

export default App;
