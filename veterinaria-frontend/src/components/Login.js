import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import authService from '../services/auth.service';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('idle'); // idle, checking, error, success

  // Verificar estado de conectividad con el backend al cargar
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setApiStatus('checking');
        
        // URL fija para verificar la conexión con el backend
        const backendUrl = 'http://localhost:3000';
        
        console.log('Verificando conexión con:', backendUrl);
        
        const response = await fetch(backendUrl);
        if (response.ok) {
          console.log('Conexión exitosa con el backend');
          setApiStatus('success');
        } else {
          console.warn('API respondió con error:', response.status);
          setApiStatus('error');
        }
      } catch (err) {
        console.error('Error al conectar con el backend:', err);
        setApiStatus('error');
      }
    };
    
    checkApiConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!correo.trim() || !contrasenia.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Intentando iniciar sesión con:', { correo });
      
      // Verificar si la API está disponible antes de intentar login
      if (apiStatus === 'error') {
        throw new Error('No se puede conectar al servidor. Verifique su conexión o contacte al administrador.');
      }
      
      // Realizar login usando el servicio de autenticación
      const respuesta = await authService.login(correo, contrasenia);
      
      console.log('Login exitoso:', respuesta);
      
      // Verificar si el usuario es administrador
      if (respuesta.usuario.rol === 'admin') {
        // Redirigir al panel de administrador
        window.location.href = '/admin';
      } else {
        // Redirigir a la página principal para usuarios normales
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Error durante login:', err);
      setError(err.message || 'Error al iniciar sesión. Verifique sus credenciales.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Veterinaria Mordisco</h2>
        
        {apiStatus === 'error' && (
          <div className="error-message">
            No se puede conectar al servidor. Por favor, verifique que el backend esté en ejecución.
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese su correo"
              disabled={loading || apiStatus === 'error'}
              autoComplete="email"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contrasenia">Contraseña</label>
            <input
              type="password"
              id="contrasenia"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={loading || apiStatus === 'error'}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading || apiStatus === 'error'}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
