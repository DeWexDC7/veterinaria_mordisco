import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Importación de iconos que simularemos con CSS por ahora
// En un proyecto real usaríamos react-icons o similar

const Sidebar = ({ isOpen, toggleSidebar, darkMode, toggleDarkMode }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Veterinaria</h2>
        <button className="close-sidebar" onClick={toggleSidebar}>
          &times;
        </button>
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
          <span className="toggle-label">Modo Oscuro</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode}
              aria-label="Toggle dark mode"
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;