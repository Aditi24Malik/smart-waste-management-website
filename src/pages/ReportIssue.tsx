import React, { useState } from 'react';
import './ReportIssue.css';

interface Report {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved';
  date: string;
  image?: string;
}

const ReportIssue: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'history'>('report');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    severity: '',
    location: '',
    contactInfo: '',
    image: null as File | null
  });

  const [reports] = useState<Report[]>([
    {
      id: 1,
      title: 'Overflowing Garbage Bin',
      description: 'The garbage bin at Main Street corner has been overflowing for 3 days.',
      location: 'Main Street & Oak Avenue',
      category: 'overflow',
      severity: 'medium',
      status: 'investigating',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Illegal Dumping Site',
      description: 'Construction waste dumped illegally in the park area.',
      location: 'Central Park, North Entrance',
      category: 'illegal-dumping',
      severity: 'high',
      status: 'resolved',
      date: '2024-01-12'
    }
  ]);

  const categories = [
    { value: 'overflow', label: 'Overflowing Bins', icon: '🗑️' },
    { value: 'illegal-dumping', label: 'Illegal Dumping', icon: '🚫' },
    { value: 'missed-pickup', label: 'Missed Pickup', icon: '🚛' },
    { value: 'damaged-bin', label: 'Damaged Bin', icon: '🔨' },
    { value: 'littering', label: 'Littering', icon: '🚮' },
    { value: 'other', label: 'Other Issue', icon: '❓' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low Priority', color: 'var(--primary-green)', description: 'Minor issue, not urgent' },
    { value: 'medium', label: 'Medium Priority', color: 'var(--warning-yellow)', description: 'Moderate concern' },
    { value: 'high', label: 'High Priority', color: 'var(--accent-orange)', description: 'Significant problem' },
    { value: 'critical', label: 'Critical', color: 'var(--danger-red)', description: 'Immediate attention required' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Report submitted:', formData);
    alert('Report submitted successfully! We will investigate and update you on the progress.');
    setFormData({
      title: '',
      description: '',
      category: '',
      severity: '',
      location: '',
      contactInfo: '',
      image: null
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'var(--warning-yellow)';
      case 'investigating': return 'var(--secondary-blue)';
      case 'resolved': return 'var(--primary-green)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'investigating': return '🔍';
      case 'resolved': return '✅';
      default: return '❓';
    }
  };

  const getSeverityColor = (severity: string) => {
    const level = severityLevels.find(s => s.value === severity);
    return level ? level.color : 'var(--gray-500)';
  };

  return (
    <div className="report-issue">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>📍 Report Garbage Issue</h1>
          <p>Help us keep your community clean by reporting waste management issues</p>
        </div>

        {/* Impact Stats */}
        <div className="impact-stats">
          <div className="impact-card">
            <div className="impact-number">247</div>
            <div className="impact-label">Issues Reported</div>
            <div className="impact-subtext">This month</div>
          </div>
          <div className="impact-card">
            <div className="impact-number">89%</div>
            <div className="impact-label">Resolution Rate</div>
            <div className="impact-subtext">Average time: 2 days</div>
          </div>
          <div className="impact-card">
            <div className="impact-number">156</div>
            <div className="impact-label">Issues Resolved</div>
            <div className="impact-subtext">This month</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            <span className="tab-icon">📝</span>
            Report Issue
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <span className="tab-icon">📋</span>
            My Reports
          </button>
        </div>

        {activeTab === 'report' && (
          <div className="report-section">
            {/* Quick Report Options */}
            <div className="quick-report">
              <h2>Quick Report</h2>
              <p>Select the type of issue you want to report</p>
              <div className="categories-grid">
                {categories.map(category => (
                  <div
                    key={category.value}
                    className={`category-card ${formData.category === category.value ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                  >
                    <div className="category-icon">{category.icon}</div>
                    <div className="category-label">{category.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Form */}
            <div className="report-form-section">
              <h2>Issue Details</h2>
              <form onSubmit={handleSubmit} className="report-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Issue Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority Level</label>
                    <div className="severity-options">
                      {severityLevels.map(level => (
                        <div
                          key={level.value}
                          className={`severity-option ${formData.severity === level.value ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                          style={{ borderColor: level.color }}
                        >
                          <div className="severity-color" style={{ backgroundColor: level.color }}></div>
                          <div className="severity-content">
                            <div className="severity-label">{level.label}</div>
                            <div className="severity-description">{level.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Location</label>
                    <div className="location-input-group">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter the location of the issue"
                        required
                      />
                      <button type="button" className="btn btn-outline btn-sm">
                        📍 Use Current Location
                      </button>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Detailed Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-input form-textarea"
                      placeholder="Provide detailed information about the issue..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Information</label>
                    <input
                      type="text"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Phone or email (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Photo (Optional)</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                      />
                      <label htmlFor="image-upload" className="file-upload-label">
                        <span className="upload-icon">📷</span>
                        <span className="upload-text">
                          {formData.image ? formData.image.name : 'Choose photo or take picture'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg">
                    📨 Submit Report
                  </button>
                  <button type="button" className="btn btn-outline">
                    💾 Save Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <div className="history-header">
              <h2>Your Reports</h2>
              <div className="history-stats">
                <div className="stat">
                  <span className="stat-number">{reports.length}</span>
                  <span className="stat-label">Total Reports</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{reports.filter(r => r.status === 'resolved').length}</span>
                  <span className="stat-label">Resolved</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{reports.filter(r => r.status === 'investigating').length}</span>
                  <span className="stat-label">In Progress</span>
                </div>
              </div>
            </div>

            <div className="reports-list">
              {reports.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-header">
                    <div className="report-main-info">
                      <h4>{report.title}</h4>
                      <p className="report-date">📅 {report.date}</p>
                    </div>
                    <div className="report-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(report.status) }}
                      >
                        {getStatusIcon(report.status)} {report.status}
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
                    <p className="report-description">{report.description}</p>
                    <p className="report-location">📍 {report.location}</p>
                    <p className="report-category">🏷️ {categories.find(c => c.value === report.category)?.label}</p>
                  </div>
                  
                  <div className="report-actions">
                    <button className="btn btn-outline btn-sm">
                      👁️ View Details
                    </button>
                    {report.status !== 'resolved' && (
                      <button className="btn btn-primary btn-sm">
                        ✏️ Update Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {reports.length === 0 && (
              <div className="no-reports">
                <div className="no-reports-icon">📋</div>
                <h3>No reports yet</h3>
                <p>Report your first issue to help improve waste management in your area</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('report')}
                >
                  Report Issue
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportIssue;