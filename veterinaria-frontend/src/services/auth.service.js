// Archivo para gestionar la autenticación con el backend
// Establecemos la URL de la API de forma directa para evitar problemas con las variables de entorno
const API_URL = 'http://localhost:3000/api';

/**
 * Servicio para gestionar la autenticación de usuarios
 */
class AuthService {
  /**
   * Realiza el inicio de sesión contra el backend
   * @param {string} correo - Correo del usuario
   * @param {string} contrasenia - Contraseña del usuario
   * @returns {Promise} - Respuesta del servidor con token y datos del usuario
   */
  async login(correo, contrasenia) {
    try {
      console.log('Intentando conectar a:', `${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasenia }),
      });
      
      // Verificamos el tipo de contenido de la respuesta
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Respuesta no es JSON. Content-Type:', contentType);
        throw new Error('El servidor no respondió con formato JSON. Verifica que la API esté funcionando correctamente.');
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }
      
      // Si la autenticación es exitosa, guardar el token y datos del usuario
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      
      return data;
    } catch (error) {
      console.error('Error en login service:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario eliminando sus datos del localStorage
   */
  logout() {
    localStorage.removeItem('user');
  }

  /**
   * Obtiene el usuario actual desde el localStorage
   * @returns {Object|null} - Datos del usuario o null si no hay sesión
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (e) {
      this.logout(); // Si hay un error en el parsing, limpiar datos
      return null;
    }
  }

  /**
   * Obtiene el token JWT almacenado
   * @returns {string|null} - Token JWT o null si no hay sesión
   */
  getToken() {
    const user = this.getCurrentUser();
    return user?.token || null;
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param {string} requiredRole - Rol requerido para acceder
   * @returns {boolean} - True si el usuario tiene el rol requerido
   */
  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    return user?.usuario?.rol === requiredRole;
  }

  /**
   * Verifica si hay un usuario autenticado
   * @returns {boolean} - True si hay un usuario autenticado
   */
  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default new AuthService();