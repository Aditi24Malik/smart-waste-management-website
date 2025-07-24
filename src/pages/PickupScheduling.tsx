import React, { useState } from 'react';
import './PickupScheduling.css';

interface PickupRequest {
  id: number;
  date: string;
  time: string;
  wasteType: string;
  address: string;
  status: 'pending' | 'confirmed' | 'completed';
  estimatedWeight: string;
  specialInstructions: string;
}

const PickupScheduling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'history'>('schedule');
  const [formData, setFormData] = useState({
    wasteType: '',
    pickupDate: '',
    pickupTime: '',
    address: '',
    estimatedWeight: '',
    specialInstructions: '',
    contactNumber: '',
    email: ''
  });

  const [pickupHistory] = useState<PickupRequest[]>([
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM',
      wasteType: 'Dry Waste',
      address: '123 Main Street, City',
      status: 'completed',
      estimatedWeight: '5-10 kg',
      specialInstructions: 'Cardboard boxes and paper'
    },
    {
      id: 2,
      date: '2024-01-20',
      time: '2:00 PM',
      wasteType: 'E-Waste',
      address: '123 Main Street, City',
      status: 'confirmed',
      estimatedWeight: '1-5 kg',
      specialInstructions: 'Old laptop and phone'
    }
  ]);

  const wasteTypes = [
    { value: 'dry', label: 'Dry Waste', icon: '📰', description: 'Paper, plastic, metal, cardboard' },
    { value: 'e-waste', label: 'E-Waste', icon: '📱', description: 'Electronics, batteries, gadgets' },
    { value: 'hazardous', label: 'Hazardous Waste', icon: '⚠️', description: 'Chemicals, paints, medical waste' },
    { value: 'bulk', label: 'Bulk Items', icon: '🪑', description: 'Furniture, appliances, large items' },
    { value: 'garden', label: 'Garden Waste', icon: '🌿', description: 'Leaves, branches, organic matter' }
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM'
  ];

  const weightRanges = [
    '1-5 kg',
    '5-10 kg',
    '10-20 kg',
    '20-50 kg',
    '50+ kg'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Pickup scheduled:', formData);
    // Here you would typically send the data to your backend
    alert('Pickup scheduled successfully! You will receive a confirmation email shortly.');
    setFormData({
      wasteType: '',
      pickupDate: '',
      pickupTime: '',
      address: '',
      estimatedWeight: '',
      specialInstructions: '',
      contactNumber: '',
      email: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'var(--warning-yellow)';
      case 'confirmed': return 'var(--secondary-blue)';
      case 'completed': return 'var(--primary-green)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'completed': return '🎉';
      default: return '❓';
    }
  };

  return (
    <div className="pickup-scheduling">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>🚛 Pickup Scheduling</h1>
          <p>Schedule convenient waste pickup at your doorstep</p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <span className="tab-icon">📅</span>
            Schedule Pickup
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="tab-icon">📋</span>
            Pickup History
          </button>
        </div>

        {activeTab === 'schedule' && (
          <div className="schedule-section">
            {/* Quick Info */}
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">⚡</div>
                <div className="info-content">
                  <h3>Same Day Pickup</h3>
                  <p>Available for requests before 12 PM</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">💰</div>
                <div className="info-content">
                  <h3>Free Service</h3>
                  <p>No charges for standard waste pickup</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">📱</div>
                <div className="info-content">
                  <h3>Real-time Updates</h3>
                  <p>Track your pickup status live</p>
                </div>
              </div>
            </div>

            {/* Waste Type Selection */}
            <div className="waste-type-section">
              <h2>Select Waste Type</h2>
              <div className="waste-types-grid">
                {wasteTypes.map(type => (
                  <div
                    key={type.value}
                    className={`waste-type-card ${formData.wasteType === type.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, wasteType: type.value }))}
                  >
                    <div className="waste-type-icon">{type.icon}</div>
                    <h4>{type.label}</h4>
                    <p>{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Form */}
            <div className="pickup-form-section">
              <h2>Pickup Details</h2>
              <form onSubmit={handleSubmit} className="pickup-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Pickup Date</label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot</label>
                    <select
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="form-input form-select"
                      required
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Weight</label>
                    <select
                      name="estimatedWeight"
                      value={formData.estimatedWeight}
                      onChange={handleInputChange}
                      className="form-input form-select"
                      required
                    >
                      <option value="">Select weight range</option>
                      {weightRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Pickup Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full address"
                      required
                    />
                    <button type="button" className="btn btn-outline btn-sm mt-sm">
                      📍 Use Current Location
                    </button>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Special Instructions (Optional)</label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                      className="form-input form-textarea"
                      placeholder="Any special instructions for pickup..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    📅 Schedule Pickup
                  </button>
                  <button type="button" className="btn btn-outline">
                    💾 Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <div className="history-header">
              <h2>Your Pickup History</h2>
              <div className="history-stats">
                <div className="stat">
                  <span className="stat-number">{pickupHistory.length}</span>
                  <span className="stat-label">Total Pickups</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{pickupHistory.filter(p => p.status === 'completed').length}</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{pickupHistory.filter(p => p.status === 'confirmed').length}</span>
                  <span className="stat-label">Upcoming</span>
                </div>
              </div>
            </div>

            <div className="history-list">
              {pickupHistory.map(pickup => (
                <div key={pickup.id} className="history-card">
                  <div className="history-main">
                    <div className="history-info">
                      <div className="history-header-info">
                        <h4>{pickup.wasteType}</h4>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(pickup.status) }}
                        >
                          {getStatusIcon(pickup.status)} {pickup.status}
                        </span>
                      </div>
                      <p className="history-details">
                        📅 {pickup.date} at {pickup.time}
                      </p>
                      <p className="history-details">
                        📍 {pickup.address}
                      </p>
                      <p className="history-details">
                        ⚖️ {pickup.estimatedWeight}
                      </p>
                      {pickup.specialInstructions && (
                        <p className="history-instructions">
                          📝 {pickup.specialInstructions}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="history-actions">
                    {pickup.status === 'confirmed' && (
                      <button className="btn btn-outline btn-sm">
                        📞 Contact Driver
                      </button>
                    )}
                    <button className="btn btn-primary btn-sm">
                      🔄 Schedule Again
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pickupHistory.length === 0 && (
              <div className="no-history">
                <div className="no-history-icon">📋</div>
                <h3>No pickup history yet</h3>
                <p>Schedule your first pickup to see your history here</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('schedule')}
                >
                  Schedule Pickup
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupScheduling;