import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Datos simulados para estadísticas
  const stats = [
    { id: 1, title: 'Citas Pendientes', value: 15, icon: '📅', color: '#5cad8a' },
    { id: 2, title: 'Pacientes Activos', value: 127, icon: '🐾', color: '#4a6da7' },
    { id: 3, title: 'Clientes Registrados', value: 78, icon: '👪', color: '#f39c12' },
    { id: 4, title: 'Ingresos del Mes', value: '$5,243', icon: '💰', color: '#3498db' }
  ];

  return (
    <div className="dashboard-content">
      <h2 className="dashboard-title">Panel de Control</h2>
      <p className="dashboard-subtitle">Bienvenido al panel de control de la Veterinaria Mordisco</p>

      <div className="stats-container">
        {stats.map(stat => (
          <div 
            key={stat.id} 
            className="stat-card"
            style={{ borderTopColor: stat.color }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              <span>{stat.icon}</span>
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Citas por Mes</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '60%', backgroundColor: '#5cad8a' }}><span>Ene</span></div>
              <div className="chart-bar" style={{ height: '80%', backgroundColor: '#5cad8a' }}><span>Feb</span></div>
              <div className="chart-bar" style={{ height: '70%', backgroundColor: '#5cad8a' }}><span>Mar</span></div>
              <div className="chart-bar" style={{ height: '90%', backgroundColor: '#5cad8a' }}><span>Abr</span></div>
              <div className="chart-bar" style={{ height: '75%', backgroundColor: '#5cad8a' }}><span>May</span></div>
              <div className="chart-bar" style={{ height: '85%', backgroundColor: '#5cad8a' }}><span>Jun</span></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Distribución de Pacientes</h3>
          <div className="chart-placeholder">
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
            <div className="activity-icon" style={{ backgroundColor: 'rgba(92, 173, 138, 0.2)', color: '#5cad8a' }}>🐶</div>
            <div className="activity-content">
              <h4>Nueva cita</h4>
              <p>Max (Labrador) - Vacunación programada</p>
              <span className="activity-time">Hace 2 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: 'rgba(74, 109, 167, 0.2)', color: '#4a6da7' }}>🐱</div>
            <div className="activity-content">
              <h4>Nuevo paciente registrado</h4>
              <p>Luna (Gato Siamés) - Primera consulta</p>
              <span className="activity-time">Hace 3 horas</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{ backgroundColor: 'rgba(243, 156, 18, 0.2)', color: '#f39c12' }}>💊</div>
            <div className="activity-content">
              <h4>Tratamiento completado</h4>
              <p>Rocky (Bulldog) - Tratamiento dermatológico</p>
              <span className="activity-time">Hace 5 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;