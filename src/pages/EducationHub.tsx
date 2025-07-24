import React, { useState } from 'react';
import './EducationHub.css';

interface EducationContent {
  id: number;
  title: string;
  category: 'guide' | 'tips' | 'infographic' | 'video';
  content: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const EducationHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const educationContent: EducationContent[] = [
    {
      id: 1,
      title: 'Basic Waste Segregation Guide',
      category: 'guide',
      difficulty: 'beginner',
      image: '♻️',
      content: 'Learn the fundamentals of sorting waste into wet, dry, hazardous, and e-waste categories. Proper segregation at source is the first step towards effective waste management.'
    },
    {
      id: 2,
      title: 'DIY Composting at Home',
      category: 'tips',
      difficulty: 'intermediate',
      image: '🌱',
      content: 'Transform your organic waste into nutrient-rich compost. Start with kitchen scraps, add brown materials, and maintain proper moisture levels for successful home composting.'
    },
    {
      id: 3,
      title: 'Plastic Waste Reduction',
      category: 'infographic',
      difficulty: 'beginner',
      image: '🚫',
      content: 'Discover practical ways to reduce plastic consumption in daily life. From reusable bags to metal straws, small changes make a big environmental impact.'
    },
    {
      id: 4,
      title: 'E-Waste Disposal Methods',
      category: 'video',
      difficulty: 'intermediate',
      image: '📱',
      content: 'Learn proper disposal techniques for electronic waste. Find certified e-waste collection centers and understand the importance of responsible electronics recycling.'
    },
    {
      id: 5,
      title: 'Hazardous Waste Safety',
      category: 'guide',
      difficulty: 'advanced',
      image: '⚠️',
      content: 'Handle hazardous materials safely. Identify household hazardous waste, understand storage requirements, and learn about proper disposal methods.'
    },
    {
      id: 6,
      title: 'Zero Waste Lifestyle',
      category: 'tips',
      difficulty: 'advanced',
      image: '🌍',
      content: 'Adopt sustainable practices for minimal waste generation. Embrace the 5 Rs: Refuse, Reduce, Reuse, Recycle, and Rot for a zero-waste lifestyle.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Content', icon: '📚' },
    { id: 'guide', label: 'Guides', icon: '📖' },
    { id: 'tips', label: 'Tips', icon: '💡' },
    { id: 'infographic', label: 'Infographics', icon: '📊' },
    { id: 'video', label: 'Videos', icon: '🎥' }
  ];

  const filteredContent = educationContent.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'var(--primary-green)';
      case 'intermediate': return 'var(--warning-yellow)';
      case 'advanced': return 'var(--danger-red)';
      default: return 'var(--gray-500)';
    }
  };

  return (
    <div className="education-hub">
      <div className="container">
        {/* Header */}
        <div className="education-header">
          <h1>📚 Education Hub</h1>
          <p>Learn everything you need to know about waste management and sustainable living</p>
        </div>

        {/* Search and Filters */}
        <div className="education-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search educational content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="education-stats">
          <div className="stat">
            <span className="stat-number">{educationContent.length}</span>
            <span className="stat-label">Resources</span>
          </div>
          <div className="stat">
            <span className="stat-number">{educationContent.filter(c => c.category === 'guide').length}</span>
            <span className="stat-label">Guides</span>
          </div>
          <div className="stat">
            <span className="stat-number">{educationContent.filter(c => c.category === 'tips').length}</span>
            <span className="stat-label">Tips</span>
          </div>
          <div className="stat">
            <span className="stat-number">{educationContent.filter(c => c.difficulty === 'beginner').length}</span>
            <span className="stat-label">Beginner</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {filteredContent.map(item => (
            <div key={item.id} className="content-card">
              <div className="card-header">
                <div className="content-image">{item.image}</div>
                <div className="content-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(item.difficulty) }}
                  >
                    {item.difficulty}
                  </span>
                  <span className="category-tag">{item.category}</span>
                </div>
              </div>
              
              <div className="card-body">
                <h3 className="content-title">{item.title}</h3>
                <p className="content-description">{item.content}</p>
              </div>
              
              <div className="card-footer">
                <button className="btn btn-primary">
                  {item.category === 'video' ? 'Watch Video' : 'Read More'}
                </button>
                <button className="btn btn-outline btn-sm">
                  📌 Save
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No content found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Featured Section */}
        <div className="featured-section">
          <h2>🌟 Featured This Week</h2>
          <div className="featured-grid">
            <div className="featured-card large">
              <div className="featured-content">
                <h3>Complete Waste Segregation Masterclass</h3>
                <p>Join our comprehensive course covering all aspects of waste management</p>
                <button className="btn btn-secondary">Start Learning</button>
              </div>
              <div className="featured-visual">🎓</div>
            </div>
            
            <div className="featured-card">
              <div className="featured-content">
                <h4>Weekly Challenge</h4>
                <p>Reduce plastic usage by 50% this week</p>
                <button className="btn btn-outline btn-sm">Join Challenge</button>
              </div>
              <div className="featured-icon">🏆</div>
            </div>
            
            <div className="featured-card">
              <div className="featured-content">
                <h4>Community Tip</h4>
                <p>Use newspaper as gift wrap for eco-friendly packaging</p>
                <button className="btn btn-outline btn-sm">Share Tip</button>
              </div>
              <div className="featured-icon">💡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;