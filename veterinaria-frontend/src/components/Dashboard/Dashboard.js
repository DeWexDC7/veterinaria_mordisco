import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Estado para detectar el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));
  
  // Actualizar el estado del modo oscuro si cambia
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    
    // Verificar inicialmente
    checkDarkMode();
    
    // Crear un observador para detectar cambios en el body
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Datos simulados para estadísticas
  const stats = [
    { id: 1, title: 'Citas Pendientes', value: 15, icon: '📅', color: '#e74c3c', class: 'appointments' },
    { id: 2, title: 'Pacientes Activos', value: 127, icon: '🐾', color: '#3498db', class: 'patients' },
    { id: 3, title: 'Clientes Registrados', value: 78, icon: '👪', color: '#f39c12', class: 'clients' }
  ];

  // Colores adaptados según el modo
  const barColor = isDarkMode ? '#5cad8a' : '#3498db';

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Panel de Control</h2>
      <p className="dashboard-welcome">Bienvenido al panel de control de la Veterinaria Mordisco</p>

      <div className="stats-container">
        {stats.map(stat => (
          <div 
            key={stat.id} 
            className={`dashboard-card ${stat.class}`}
            style={{borderTopColor: stat.color}}
          >
            <div className="dashboard-card-header">
              <div className="dashboard-card-icon" style={{backgroundColor: `${stat.color}20`}}>
                <span style={{fontSize: '1.5rem'}}>{stat.icon}</span>
              </div>
              <h3 className="dashboard-card-title">{stat.title}</h3>
            </div>
            <div className="dashboard-card-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Citas por Mes</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '60%', backgroundColor: barColor }}><span>Ene</span></div>
              <div className="chart-bar" style={{ height: '80%', backgroundColor: barColor }}><span>Feb</span></div>
              <div className="chart-bar" style={{ height: '70%', backgroundColor: barColor }}><span>Mar</span></div>
              <div className="chart-bar" style={{ height: '90%', backgroundColor: barColor }}><span>Abr</span></div>
              <div className="chart-bar" style={{ height: '75%', backgroundColor: barColor }}><span>May</span></div>
              <div className="chart-bar" style={{ height: '85%', backgroundColor: barColor }}><span>Jun</span></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Distribución de Pacientes</h3>
          <div className="chart-placeholder" style={{ position: 'relative', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div className="pie-chart">
              <div className="pie-slice" style={{ 
                '--percentage': '45%', 
                '--color': '#5cad8a',
                '--start-angle': '0deg'
              }}></div>
              <div className="pie-slice" style={{ 
                '--percentage': '30%', 
                '--color': '#4a6da7',
                '--start-angle': '162deg'
              }}></div>
              <div className="pie-slice" style={{ 
                '--percentage': '25%', 
                '--color': '#f39c12',
                '--start-angle': '270deg'
              }}></div>
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#5cad8a' }}></span>
                <span>Perros (45%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4a6da7' }}></span>
                <span>Gatos (30%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#f39c12' }}></span>
                <span>Otros (25%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3 className="section-title">Actividad Reciente</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: '#e8f5e9' }}>
              <span role="img" aria-label="dog">🐶</span>
            </div>
            <div className="activity-content">
              <h4>Nueva cita</h4>
              <p>Max (Labrador) - Vacunación programada</p>
              <span className="activity-time">Hace 2 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: '#e3f2fd' }}>
              <span role="img" aria-label="cat">🐱</span>
            </div>
            <div className="activity-content">
              <h4>Nuevo paciente registrado</h4>
              <p>Luna (Gato Siamés) - Primera consulta</p>
              <span className="activity-time">Hace 3 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: '#fff3e0' }}>
              <span role="img" aria-label="pill">💊</span>
            </div>
            <div className="activity-content">
              <h4>Tratamiento completado</h4>
              <p>Rocky - Antibióticos para infección</p>
              <span className="activity-time">Hace 5 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;