import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎮',
      title: 'Segregation Game',
      description: 'Learn waste sorting through fun, interactive games',
      path: '/segregation-game'
    },
    {
      icon: '📚',
      title: 'Education Hub',
      description: 'Guides, tips, and resources for sustainable living',
      path: '/education'
    },
    {
      icon: '🚛',
      title: 'Schedule Pickup',
      description: 'Book waste collection at your convenience',
      path: '/pickup-scheduling'
    },
    {
      icon: '📍',
      title: 'Report Issues',
      description: 'Report garbage problems in your area',
      path: '/report-issue'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Users Educated', icon: '👥' },
    { number: '25K+', label: 'Waste Items Sorted', icon: '♻️' },
    { number: '500+', label: 'Issues Resolved', icon: '✅' },
    { number: '95%', label: 'User Satisfaction', icon: '⭐' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
  <div className="container">
    <div
  className="auth-buttons"
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginBottom: '1rem'
  }}
>
  <button
    style={{ cursor: 'pointer' }}
    className="btn btn-outline"
    onClick={() => navigate('/login')}
  >
    Login
  </button>
  <button
    style={{ cursor: 'pointer' }}
    className="btn btn-outline"
    onClick={() => navigate('/signup')}
  >
    Sign Up
  </button>
</div>

    <div className="hero-content">
      <div className="hero-text">
        <h1 className="hero-title">
          Smart Waste Management
          <span className="hero-accent">Made Simple</span>
        </h1>
              <p className="hero-description">
                Join the revolution in waste management. Learn, play, and contribute to a cleaner environment through our interactive platform.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/segregation-game')}
                >
                  Start Playing
                </button>
                <button 
                  className="btn btn-outline btn-lg"
                  onClick={() => navigate('/education')}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image">
                <div className="waste-bins">
                  <div className="bin green">🥬</div>
                  <div className="bin blue">📰</div>
                  <div className="bin red">⚠️</div>
                  <div className="bin orange">⚡</div>
                </div>
                <div className="floating-items">
                  <div className="item item-1">🍎</div>
                  <div className="item item-2">📱</div>
                  <div className="item item-3">🔋</div>
                  <div className="item item-4">📦</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Discover the features that make waste management engaging and effective</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                onClick={() => navigate(feature.path)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="section-header">
            <h2>Making a Real Impact</h2>
            <p>See how our community is transforming waste management</p>
          </div>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Why Choose Smart Waste Management?</h2>
              <div className="benefit-list">
                <div className="benefit-item">
                  <div className="benefit-icon">🌱</div>
                  <div className="benefit-content">
                    <h4>Environmental Impact</h4>
                    <p>Reduce pollution and contribute to a cleaner planet through proper waste segregation</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🏆</div>
                  <div className="benefit-content">
                    <h4>Gamified Learning</h4>
                    <p>Earn points, badges, and rewards while learning essential waste management skills</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🤝</div>
                  <div className="benefit-content">
                    <h4>Community Driven</h4>
                    <p>Connect with your local community to report and resolve waste management issues</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <div className="benefit-content">
                    <h4>Data-Driven Solutions</h4>
                    <p>Help municipalities make informed decisions with real-time waste management data</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-visual">
              <div className="circular-progress">
                <div className="progress-ring">
                  <div className="progress-value">95%</div>
                  <div className="progress-label">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>Join thousands of users who are already contributing to a cleaner, more sustainable future</p>
            <div className="cta-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/segregation-game')}
              >
                Start Your Journey
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/pickup-scheduling')}
              >
                Schedule Pickup
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;