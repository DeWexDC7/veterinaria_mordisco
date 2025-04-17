import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  
  // Detectar tamaño de la pantalla
  const checkWindowSize = useCallback(() => {
    const mobile = window.innerWidth < 992;
    setIsMobile(mobile);
    
    if (mobile) {
      setSidebarOpen(false);
    } else {
      // Cargar preferencia de estado del sidebar desde localStorage
      const savedSidebarState = localStorage.getItem('sidebarOpen');
      if (savedSidebarState !== null) {
        setSidebarOpen(savedSidebarState === 'true');
      } else {
        setSidebarOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    // Inicializar estado del sidebar según el tamaño de pantalla
    checkWindowSize();
    
    // Listener para redimensionamiento de ventana
    window.addEventListener('resize', checkWindowSize);
    
    // Cargar preferencia de modo oscuro del localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Aplicar clase al body para el modo oscuro
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);

  // Togglear modo oscuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Función para togglear el sidebar
  const toggleSidebar = () => {
    const newSidebarState = !sidebarOpen;
    setSidebarOpen(newSidebarState);
    
    // Guardar preferencia en localStorage solo para pantallas grandes
    if (!isMobile) {
      localStorage.setItem('sidebarOpen', newSidebarState.toString());
    }
  };
  
  // Función para cerrar el sidebar automáticamente en móviles
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''} ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isMobile={isMobile}
      />
      
      {/* Overlay para dispositivos móviles */}
      {sidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <header className="dashboard-header">
          <div className="header-left">
            {/* Botón de menú hamburguesa para móviles */}
            <button className="menu-toggle" onClick={toggleSidebar}>
              <span className="hamburger"></span>
            </button>
            <h1>Veterinaria Mordisco</h1>
          </div>
          
          <div className="header-actions">
            <button className="logout-button" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}>
              Cerrar Sesión
            </button>
          </div>
        </header>
        <main className="dashboard-main" onClick={closeSidebarOnMobile}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;