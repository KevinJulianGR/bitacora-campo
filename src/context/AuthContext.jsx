import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Verifica el estado de autenticación al cargar la aplicación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
  }, [auth]);

  return (
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación en otros componentes
export const useAuth = () => {
  return useContext(AuthContext);
};
