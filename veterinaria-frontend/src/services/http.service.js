// Servicio para realizar peticiones HTTP autenticadas
import authService from './auth.service';

// Establecemos la URL de la API de forma directa para evitar problemas con las variables de entorno
const API_URL = 'http://localhost:3000/api';

/**
 * Servicio para realizar peticiones HTTP autenticadas
 * Automáticamente agrega el token JWT a las solicitudes
 */
class HttpService {
  /**
   * Realiza una solicitud GET autenticada
   * @param {string} endpoint - Endpoint de la API (sin /api)
   * @returns {Promise} - Respuesta de la API
   */
  async get(endpoint) {
    return this.fetchWithAuth(`${API_URL}${endpoint}`, {
      method: 'GET',
    });
  }

  /**
   * Realiza una solicitud POST autenticada
   * @param {string} endpoint - Endpoint de la API (sin /api)
   * @param {Object} data - Datos a enviar en el cuerpo de la solicitud
   * @returns {Promise} - Respuesta de la API
   */
  async post(endpoint, data) {
    return this.fetchWithAuth(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Realiza una solicitud PUT autenticada
   * @param {string} endpoint - Endpoint de la API (sin /api)
   * @param {Object} data - Datos a enviar en el cuerpo de la solicitud
   * @returns {Promise} - Respuesta de la API
   */
  async put(endpoint, data) {
    return this.fetchWithAuth(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * Realiza una solicitud DELETE autenticada
   * @param {string} endpoint - Endpoint de la API (sin /api)
   * @returns {Promise} - Respuesta de la API
   */
  async delete(endpoint) {
    return this.fetchWithAuth(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
  }

  /**
   * Método interno para realizar solicitudes con autenticación
   * @param {string} url - URL completa de la API
   * @param {Object} options - Opciones de fetch
   * @returns {Promise} - Respuesta procesada
   */
  async fetchWithAuth(url, options = {}) {
    try {
      // Obtener token JWT y agregarlo a los headers
      const token = authService.getToken();
      
      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        };
      }

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // Si el error es de autenticación (401), limpiar datos de sesión
        if (response.status === 401) {
          authService.logout();
        }
        throw new Error(data.message || 'Ha ocurrido un error');
      }

      return data;
    } catch (error) {
      console.error('Error en HTTP service:', error);
      throw error;
    }
  }
}

export default new HttpService();