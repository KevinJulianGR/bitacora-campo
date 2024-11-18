import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ListaBitacoras from './bitacoras/ListaBitacoras';
import NuevaBitacora from './bitacoras/NuevaBitacora';
import ListaEspecies from './especies/ListaEspecies';
import NuevaEspecie from './especies/NuevaEspecie';
import './Home.css'; // Importamos el archivo CSS

const Home = () => {
  const [active, setActive] = useState('bitacoras'); // Estado para gestionar la opción activa del menú

  const handleMenuClick = (option) => {
    setActive(option);
  };

  return (
    <div className="home-container">
      <header>
        <nav>
          <ul className="menu">
            <li>
              <Link 
                to="/bitacoras" 
                className={active === 'bitacoras' ? 'active' : ''} 
                onClick={() => handleMenuClick('bitacoras')}
              >
                Bitácoras
              </Link>
            </li>
            <li>
              <Link 
                to="/nueva-bitacora" 
                className={active === 'nueva-bitacora' ? 'active' : ''} 
                onClick={() => handleMenuClick('nueva-bitacora')}
              >
                Nueva Bitácora
              </Link>
            </li>
            <li>
              <Link 
                to="/especies" 
                className={active === 'especies' ? 'active' : ''} 
                onClick={() => handleMenuClick('especies')}
              >
                Especies
              </Link>
            </li>
            <li>
              <Link 
                to="/nueva-especie" 
                className={active === 'nueva-especie' ? 'active' : ''} 
                onClick={() => handleMenuClick('nueva-especie')}
              >
                Nueva Especie
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/bitacoras" element={<ListaBitacoras />} />
          <Route path="/nueva-bitacora" element={<NuevaBitacora />} />
          <Route path="/especies" element={<ListaEspecies />} />
          <Route path="/nueva-especie" element={<NuevaEspecie />} />
        </Routes>
      </main>
    </div>
  );
};

export default Home;
