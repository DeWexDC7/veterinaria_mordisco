import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import AdminPanel from './components/AdminPanel/AdminPanel';
import NotFound from './components/NotFound/NotFound';

// Placeholders para páginas futuras
const UsuariosPage = () => <div className="page-content"><h2>Gestión de Usuarios</h2><p>Esta sección permitirá administrar los usuarios del sistema.</p></div>;
const ClientesPage = () => <div className="page-content"><h2>Gestión de Clientes</h2><p>Esta sección permitirá administrar los clientes de la veterinaria.</p></div>;
const PacientesPage = () => <div className="page-content"><h2>Gestión de Pacientes</h2><p>Esta sección permitirá administrar los pacientes (mascotas) de la veterinaria.</p></div>;
const CitasPage = () => <div className="page-content"><h2>Gestión de Citas</h2><p>Esta sección permitirá administrar las citas y horarios de la veterinaria.</p></div>;

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta pública - Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Ruta predeterminada - Redirigir al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Rutas del Dashboard con Layout compartido */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="pacientes" element={<PacientesPage />} />
            <Route path="citas" element={<CitasPage />} />
          </Route>
          
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
