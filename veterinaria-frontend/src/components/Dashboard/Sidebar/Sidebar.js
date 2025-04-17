import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, darkMode, toggleDarkMode, isMobile }) => {
  // Determinar si el sidebar está en modo colapsado (solo iconos) o completamente cerrado
  // En modo móvil: closed = completamente oculto
  // En pantallas grandes: closed = solo mostrar iconos
  const sidebarClass = !isOpen 
    ? (isMobile ? 'closed' : 'collapsed') 
    : 'open';
  
  // Iconos optimizados para el toggle de modo oscuro/claro
  const sunIcon = "☀️";
  const moonIcon = "🌙";
  
  return (
    <aside className={`sidebar ${sidebarClass}`}>
      <div className="sidebar-header">
        {/* En modo colapsado (pantalla grande), mostrar solo el botón hamburguesa */}
        {(!isOpen && !isMobile) ? (
          <button 
            className="hamburger-button collapsed-hamburger"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
          </button>
        ) : (
          <>
            <button 
              className="hamburger-button"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <span className="hamburger"></span>
            </button>
            <h2 className="sidebar-title">Veterinaria</h2>
          </>
        )}
      </div>
      
      <div className="sidebar-content">
        <nav className="sidebar-menu">
          <NavLink to="/dashboard" end className={({isActive}) => isActive ? "active" : ""}>
            <span className="menu-icon icon-dashboard"></span>
            <span className="menu-text">Inicio</span>
          </NavLink>
          
          <NavLink to="/dashboard/usuarios" className={({isActive}) => isActive ? "active" : ""}>
            <span className="menu-icon icon-users"></span>
            <span className="menu-text">Usuarios</span>
          </NavLink>
          
          <NavLink to="/dashboard/clientes" className={({isActive}) => isActive ? "active" : ""}>
            <span className="menu-icon icon-clients"></span>
            <span className="menu-text">Clientes</span>
          </NavLink>
          
          <NavLink to="/dashboard/pacientes" className={({isActive}) => isActive ? "active" : ""}>
            <span className="menu-icon icon-patients"></span>
            <span className="menu-text">Pacientes</span>
          </NavLink>
          
          <NavLink to="/dashboard/citas" className={({isActive}) => isActive ? "active" : ""}>
            <span className="menu-icon icon-appointments"></span>
            <span className="menu-text">Citas</span>
          </NavLink>
        </nav>
      </div>
      
      <div className="sidebar-footer">
        <div className="dark-mode-toggle">
          <span className="toggle-label">{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
            <span className="slider round">
              <span className="sun-icon">{sunIcon}</span>
              <span className="moon-icon">{moonIcon}</span>
            </span>
          </label>
        </div>
        {!isMobile && !isOpen && (
          <div className="toggle-icon-only">
            <label className="switch mini-switch">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <span className="slider round">
                <span className="sun-icon">{sunIcon}</span>
                <span className="moon-icon">{moonIcon}</span>
              </span>
            </label>
          </div>
        )}
      </div>
      
      {/* Botón hamburguesa flotante para dispositivos móviles cuando está cerrado */}
      {isMobile && !isOpen && (
        <button 
          className="floating-hamburger"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <span className="hamburger"></span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;