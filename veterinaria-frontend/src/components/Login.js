import React, { useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulación de una petición al servidor
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la lógica real para conectar con el backend
      console.log('Iniciando sesión con:', { usuario });
      
      // Simulación de inicio de sesión exitoso
      setLoading(false);
      // Aquí redirigiríamos al usuario a la página principal
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Veterinario Mordisco</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingrese su usuario"
              disabled={loading}
              autoComplete="username"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
