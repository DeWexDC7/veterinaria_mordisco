import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder para páginas que se crearán después
const Dashboard = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control de la Veterinaria Mordisco</p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
      <h3>Acceso exitoso</h3>
      <p>Has iniciado sesión correctamente y ahora tienes acceso al sistema.</p>
    </div>
  </div>
);

const AdminPanel = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h1>Panel de Administración</h1>
    <p>Esta sección es solo para administradores de la Veterinaria Mordisco</p>
    <div style={{ marginTop: '20px', padding: '15px', background: '#e8f4f8', borderRadius: '5px', border: '1px solid #5cad8a' }}>
      <h3>Acceso administrativo</h3>
      <p>Has iniciado sesión como administrador y tienes acceso a funcionalidades privilegiadas.</p>
    </div>
  </div>
);

const NotFound = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>404 - Página no encontrada</h1>
    <p>La página que estás buscando no existe o ha sido movida.</p>
    <a href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 15px', background: '#5cad8a', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
      Volver al inicio
    </a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta pública - Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta predeterminada - Redirigir al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rutas protegidas - Requieren autenticación */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Rutas protegidas con rol específico - Requieren ser administrador */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
