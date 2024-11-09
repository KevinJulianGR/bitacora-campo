import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Autenticacion from "./components/auth/Autenticacion";
import RegistrarUsuario from "./components/auth/RegistrarUsuario";
import IniciarSesion from "./components/auth/IniciarSesion";
import ListaBitacoras from "./components/bitacoras/ListaBitacoras";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext"; // Si usas un contexto para manejar el estado de autenticación

const App = () => {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth();

  // Verifica si el usuario está autenticado en Firebase
  onAuthStateChanged(auth, (user) => {
    setUsuario(user);
  });

  return (
    <AuthProvider> {/* Si usas un contexto para manejar el estado de autenticación */}
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/registrar">Registrar Usuario</Link></li>
              <li><Link to="/iniciar-sesion">Iniciar Sesión</Link></li>
              <li><Link to="/bitacoras">Bitácoras</Link></li>
            </ul>
          </nav>

          <div className="contenido">
            <Routes>
              <Route path="/" element={<h1>Bienvenido a la aplicación</h1>} />
              <Route path="/registrar" element={<RegistrarUsuario />} />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />
              <Route path="/bitacoras" element={usuario ? <ListaBitacoras /> : <h2>Por favor inicie sesión</h2>} />
              <Route path="/autenticacion" element={<Autenticacion />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
