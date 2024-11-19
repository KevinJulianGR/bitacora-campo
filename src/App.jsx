import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; 
import Login from "./components/auth/Login"; 
import NuevoUsuario from "./components/usuarios/NuevoUsuario";
import ListaBitacoras from './components/bitacoras/ListaBitacoras';
import NuevaBitacora from './components/bitacoras/NuevaBitacora';
import ListaEspecies from './components/especies/ListaEspecies';
import NuevaEspecie from './components/especies/NuevaEspecie';
import './App.css'; 
import paisaje from './assets/paisaje.avif';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Router>
      <div className="app-container">
        {authenticated ? (
          <>
            {/* Menú de navegación */}
            <nav className="navbar">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/bitacoras">Lista de Bitácoras</Link></li>
                <li><Link to="/nueva-bitacora">Nueva Bitácora</Link></li>
                <li><Link to="/especies">Lista de Especies</Link></li>
                <li><Link to="/nueva-especie">Nueva Especie</Link></li>
              </ul>
            </nav>

            {/* Rutas */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bitacoras" element={<ListaBitacoras />} />
              <Route path="/nueva-bitacora" element={<NuevaBitacora />} />
              <Route path="/especies" element={<ListaEspecies />} />
              <Route path="/nueva-especie" element={<NuevaEspecie />} />
            </Routes>
          </>
        ) : (
         
          <Routes>
            <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
            <Route path="/nuevo-usuario" element={<NuevoUsuario />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

// Componente Home
const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Bitácora de Campo</h1>
      <p>Desde esta sección tienes la posibilidad de administrar de manera sencilla y 
        eficiente las bitácoras, las diferentes especies registradas y los usuarios asociados al sistema.
        </p>
        <img src={paisaje} alt="Paisaje" />
    </div>
  );
};

export default App;
