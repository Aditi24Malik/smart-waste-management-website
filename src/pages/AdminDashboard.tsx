import React, { useState } from 'react';
import './AdminDashboard.css';

interface PickupRequest {
  id: number;
  date: string;
  time: string;
  wasteType: string;
  address: string;
  customerName: string;
  phone: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  assignedDriver?: string;
  estimatedWeight: string;
}

interface Report {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved';
  date: string;
  reportedBy: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pickups' | 'reports' | 'analytics'>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const [pickupRequests] = useState<PickupRequest[]>([
    {
      id: 1,
      date: '2024-01-16',
      time: '10:00 AM - 12:00 PM',
      wasteType: 'Dry Waste',
      address: '123 Main Street, City',
      customerName: 'John Doe',
      phone: '+1 (555) 123-4567',
      status: 'pending',
      estimatedWeight: '5-10 kg'
    },
    {
      id: 2,
      date: '2024-01-16',
      time: '2:00 PM - 4:00 PM',
      wasteType: 'E-Waste',
      address: '456 Oak Avenue, City',
      customerName: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      status: 'assigned',
      assignedDriver: 'Mike Johnson',
      estimatedWeight: '1-5 kg'
    }
  ]);

  const [reports] = useState<Report[]>([
    {
      id: 1,
      title: 'Overflowing Garbage Bin',
      description: 'The garbage bin at Main Street corner has been overflowing for 3 days.',
      location: 'Main Street & Oak Avenue',
      category: 'overflow',
      severity: 'medium',
      status: 'investigating',
      date: '2024-01-15',
      reportedBy: 'Anonymous'
    },
    {
      id: 2,
      title: 'Illegal Dumping Site',
      description: 'Construction waste dumped illegally in the park area.',
      location: 'Central Park, North Entrance',
      category: 'illegal-dumping',
      severity: 'high',
      status: 'pending',
      date: '2024-01-14',
      reportedBy: 'City Resident'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication check (in real app, this would be more secure)
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin/admin123 for demo.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'var(--warning-yellow)';
      case 'assigned': return 'var(--secondary-blue)';
      case 'investigating': return 'var(--secondary-blue)';
      case 'in-progress': return 'var(--accent-orange)';
      case 'completed': return 'var(--primary-green)';
      case 'resolved': return 'var(--primary-green)';
      default: return 'var(--gray-500)';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'var(--primary-green)';
      case 'medium': return 'var(--warning-yellow)';
      case 'high': return 'var(--accent-orange)';
      case 'critical': return 'var(--danger-red)';
      default: return 'var(--gray-500)';
    }
  };

  const updatePickupStatus = (id: number, newStatus: string) => {
    console.log(`Updating pickup ${id} to status: ${newStatus}`);
    // In a real app, this would update the backend
  };

  const updateReportStatus = (id: number, newStatus: string) => {
    console.log(`Updating report ${id} to status: ${newStatus}`);
    // In a real app, this would update the backend
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="container">
          <div className="login-card">
            <div className="login-header">
              <h1>🔐 Admin Login</h1>
              <p>Access the municipal waste management dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="form-input"
                  placeholder="Enter username"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="form-input"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-lg">
                🚀 Login to Dashboard
              </button>
            </form>
            
            <div className="demo-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Username: admin</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>🏛️ Municipal Dashboard</h1>
            <p>Waste Management Control Center</p>
          </div>
          <button 
            className="btn btn-outline"
            onClick={() => setIsLoggedIn(false)}
          >
            🚪 Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="tab-icon">📊</span>
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pickups' ? 'active' : ''}`}
            onClick={() => setActiveTab('pickups')}
          >
            <span className="tab-icon">🚛</span>
            Pickups ({pickupRequests.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <span className="tab-icon">📋</span>
            Reports ({reports.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="tab-icon">📈</span>
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🚛</div>
                <div className="stat-content">
                  <div className="stat-number">{pickupRequests.length}</div>
                  <div className="stat-label">Pending Pickups</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <div className="stat-number">{reports.length}</div>
                  <div className="stat-label">Active Reports</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-number">
                    {pickupRequests.filter(p => p.status === 'completed').length + 
                     reports.filter(r => r.status === 'resolved').length}
                  </div>
                  <div className="stat-label">Resolved Today</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <div className="stat-number">2.3h</div>
                  <div className="stat-label">Avg Response Time</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h2>🕒 Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">🚛</div>
                  <div className="activity-content">
                    <div className="activity-title">New pickup request from John Doe</div>
                    <div className="activity-time">5 minutes ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-content">
                    <div className="activity-title">Garbage overflow reported at Main Street</div>
                    <div className="activity-time">15 minutes ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">✅</div>
                  <div className="activity-content">
                    <div className="activity-title">Illegal dumping case resolved in Central Park</div>
                    <div className="activity-time">1 hour ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Actions */}
            <div className="priority-actions">
              <h2>⚡ Priority Actions</h2>
              <div className="action-cards">
                <div className="action-card urgent">
                  <div className="action-header">
                    <div className="action-icon">🚨</div>
                    <div className="action-badge">Urgent</div>
                  </div>
                  <h4>Critical waste overflow</h4>
                  <p>Main Street bin requires immediate attention</p>
                  <button className="btn btn-danger btn-sm">Address Now</button>
                </div>
                <div className="action-card important">
                  <div className="action-header">
                    <div className="action-icon">⏰</div>
                    <div className="action-badge">Due Soon</div>
                  </div>
                  <h4>Pending pickups</h4>
                  <p>2 pickups scheduled for today need driver assignment</p>
                  <button className="btn btn-primary btn-sm">Assign Drivers</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pickups Tab */}
        {activeTab === 'pickups' && (
          <div className="pickups-section">
            <div className="section-header">
              <h2>📦 Pickup Requests</h2>
              <div className="filter-buttons">
                <button className="btn btn-outline btn-sm">All</button>
                <button className="btn btn-outline btn-sm">Pending</button>
                <button className="btn btn-outline btn-sm">Today</button>
              </div>
            </div>

            <div className="requests-grid">
              {pickupRequests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <div className="request-id">#{request.id}</div>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(request.status) }}
                    >
                      {request.status}
                    </span>
                  </div>
                  
                  <div className="request-content">
                    <h4>{request.customerName}</h4>
                    <p className="request-detail">📱 {request.phone}</p>
                    <p className="request-detail">📍 {request.address}</p>
                    <p className="request-detail">🗑️ {request.wasteType}</p>
                    <p className="request-detail">📅 {request.date} - {request.time}</p>
                    <p className="request-detail">⚖️ {request.estimatedWeight}</p>
                    {request.assignedDriver && (
                      <p className="request-detail">👤 Driver: {request.assignedDriver}</p>
                    )}
                  </div>
                  
                  <div className="request-actions">
                    <select 
                      className="form-input form-select"
                      value={request.status}
                      onChange={(e) => updatePickupStatus(request.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="assigned">Assigned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button className="btn btn-primary btn-sm">
                      📞 Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="reports-section">
            <div className="section-header">
              <h2>📋 Issue Reports</h2>
              <div className="filter-buttons">
                <button className="btn btn-outline btn-sm">All</button>
                <button className="btn btn-outline btn-sm">Pending</button>
                <button className="btn btn-outline btn-sm">High Priority</button>
              </div>
            </div>

            <div className="reports-grid">
              {reports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-id">#{report.id}</div>
                    <div className="report-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      >
                        {report.status}
                      </span>
                      <span 
                        className="severity-badge"
                        style={{ backgroundColor: getSeverityColor(report.severity) }}
                      >
                        {report.severity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="report-content">
                    <h4>{report.title}</h4>
                    <p className="report-description">{report.description}</p>
                    <p className="report-detail">📍 {report.location}</p>
                    <p className="report-detail">📅 {report.date}</p>
                    <p className="report-detail">👤 {report.reportedBy}</p>
                    <p className="report-detail">🏷️ {report.category}</p>
                  </div>
                  
                  <div className="report-actions">
                    <select 
                      className="form-input form-select"
                      value={report.status}
                      onChange={(e) => updateReportStatus(report.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button className="btn btn-primary btn-sm">
                      🗺️ View Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>📈 Analytics Dashboard</h2>
            
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>📊 Request Volume</h3>
                <div className="chart-placeholder">
                  <div className="mock-chart">
                    <div className="chart-bar" style={{ height: '60%' }}>Mon</div>
                    <div className="chart-bar" style={{ height: '80%' }}>Tue</div>
                    <div className="chart-bar" style={{ height: '45%' }}>Wed</div>
                    <div className="chart-bar" style={{ height: '90%' }}>Thu</div>
                    <div className="chart-bar" style={{ height: '70%' }}>Fri</div>
                  </div>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3>🗺️ Hotspot Areas</h3>
                <div className="hotspot-list">
                  <div className="hotspot-item">
                    <span className="hotspot-name">Main Street</span>
                    <span className="hotspot-count">12 reports</span>
                  </div>
                  <div className="hotspot-item">
                    <span className="hotspot-name">Central Park</span>
                    <span className="hotspot-count">8 reports</span>
                  </div>
                  <div className="hotspot-item">
                    <span className="hotspot-name">Oak Avenue</span>
                    <span className="hotspot-count">5 reports</span>
                  </div>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3>⏱️ Response Times</h3>
                <div className="response-stats">
                  <div className="response-item">
                    <span className="response-label">Average</span>
                    <span className="response-value">2.3 hours</span>
                  </div>
                  <div className="response-item">
                    <span className="response-label">Best</span>
                    <span className="response-value">45 minutes</span>
                  </div>
                  <div className="response-item">
                    <span className="response-label">Target</span>
                    <span className="response-value">2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;