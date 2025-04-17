import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import authService from '../services/auth.service';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('checking'); // idle, checking, error, success

  // Verificar estado de conectividad con el backend al cargar
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setApiStatus('checking');
        // Usamos la URL exacta que confirmamos funciona con curl
        const backendUrl = 'http://localhost:3000/';
        
        console.log('Verificando conexión con:', backendUrl);
        
        // Añadimos opciones a fetch para evitar problemas de CORS
        const response = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          // Desactivamos las credenciales para esta prueba
          credentials: 'omit',
          mode: 'cors'
        });
        
        const text = await response.text();
        console.log('Respuesta del servidor (texto):', text);
        
        // Intentamos parsear la respuesta como JSON
        let data;
        try {
          data = JSON.parse(text);
          console.log('Respuesta parseada:', data);
        } catch (parseError) {
          console.error('Error al parsear la respuesta como JSON:', parseError);
          throw new Error('La respuesta del servidor no es un JSON válido');
        }
        
        // Si llegamos aquí, la conexión fue exitosa
        console.log('Conexión exitosa con el backend:', data);
        setApiStatus('success');
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
