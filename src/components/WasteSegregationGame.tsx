import React, { useState, useEffect } from 'react';
import './WasteSegregationGame.css';

interface WasteItem {
  id: number;
  name: string;
  category: 'wet' | 'dry' | 'hazardous' | 'e-waste';
  image: string;
}

const wasteItems: WasteItem[] = [
  { id: 1, name: 'Apple Core', category: 'wet', image: '🍎' },
  { id: 2, name: 'Plastic Bottle', category: 'dry', image: '🍾' },
  { id: 3, name: 'Battery', category: 'hazardous', image: '🔋' },
  { id: 4, name: 'Old Phone', category: 'e-waste', image: '📱' },
  { id: 5, name: 'Newspaper', category: 'dry', image: '📰' },
  { id: 6, name: 'Banana Peel', category: 'wet', image: '🍌' },
  { id: 7, name: 'Light Bulb', category: 'hazardous', image: '💡' },
  { id: 8, name: 'Laptop', category: 'e-waste', image: '💻' },
  { id: 9, name: 'Cardboard Box', category: 'dry', image: '📦' },
  { id: 10, name: 'Fish Bones', category: 'wet', image: '🐟' },
  { id: 11, name: 'Paint Can', category: 'hazardous', image: '🎨' },
  { id: 12, name: 'Television', category: 'e-waste', image: '📺' },
];

const bins = [
  { type: 'wet', label: 'Wet Waste', color: '#22c55e', icon: '🥬' },
  { type: 'dry', label: 'Dry Waste', color: '#3b82f6', icon: '📰' },
  { type: 'hazardous', label: 'Hazardous Waste', color: '#ef4444', icon: '⚠️' },
  { type: 'e-waste', label: 'E-Waste', color: '#f97316', icon: '⚡' },
];

const WasteSegregationGame: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0);
  const [gameItems, setGameItems] = useState<WasteItem[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [draggedItem, setDraggedItem] = useState<WasteItem | null>(null);

  useEffect(() => {
    if (gameStarted && gameItems.length === 0) {
      setGameCompleted(true);
    }
  }, [gameItems, gameStarted]);

  const startGame = () => {
    const shuffledItems = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 8);
    setGameItems(shuffledItems);
    setCurrentItem(shuffledItems[0]);
    setScore(0);
    setLives(3);
    setStreak(0);
    setGameStarted(true);
    setGameCompleted(false);
    setFeedback(null);
  };

  const handleBinClick = (binType: string) => {
    if (!currentItem) return;

    const isCorrect = currentItem.category === binType;
    
    if (isCorrect) {
      const points = 10 + (streak * 2);
      setScore(score + points);
      setStreak(streak + 1);
      setFeedback({ 
        message: `Correct! +${points} points (${streak + 1}x streak)`, 
        type: 'success' 
      });
    } else {
      setLives(lives - 1);
      setStreak(0);
      setFeedback({ 
        message: `Wrong! ${currentItem.name} goes in ${bins.find(b => b.type === currentItem.category)?.label}`, 
        type: 'error' 
      });
    }

    setTimeout(() => {
      const remainingItems = gameItems.slice(1);
      setGameItems(remainingItems);
      setCurrentItem(remainingItems[0] || null);
      setFeedback(null);
    }, 1500);
  };

  const handleDragStart = (e: React.DragEvent, item: WasteItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, binType: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id === currentItem?.id) {
      handleBinClick(binType);
    }
    setDraggedItem(null);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setCurrentItem(null);
    setGameItems([]);
    setScore(0);
    setLives(3);
    setStreak(0);
    setFeedback(null);
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <div className="game-welcome">
          <h2>🎮 Waste Segregation Game</h2>
          <p>Test your knowledge by sorting waste items into the correct bins!</p>
          <div className="game-rules">
            <h3>How to Play:</h3>
            <ul>
              <li>Drag and drop or click to sort waste items into correct bins</li>
              <li>Get 10 points for each correct answer</li>
              <li>Build streaks for bonus points</li>
              <li>You have 3 lives - use them wisely!</li>
            </ul>
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted || lives === 0) {
    return (
      <div className="game-container">
        <div className="game-result">
          <h2>{lives === 0 ? '💥 Game Over!' : '🎉 Congratulations!'}</h2>
          <div className="final-score">
            <span className="score-value">{score}</span>
            <span className="score-label">Final Score</span>
          </div>
          <div className="game-stats">
            <div className="stat">
              <span className="stat-value">{wasteItems.length - gameItems.length}</span>
              <span className="stat-label">Items Sorted</span>
            </div>
            <div className="stat">
              <span className="stat-value">{Math.round((score / ((wasteItems.length - gameItems.length) * 10)) * 100) || 0}%</span>
              <span className="stat-label">Accuracy</span>
            </div>
          </div>
          <div className="game-actions">
            <button className="btn btn-primary" onClick={startGame}>
              Play Again
            </button>
            <button className="btn btn-outline" onClick={resetGame}>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-stats-bar">
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-text">Score: {score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❤️</span>
            <span className="stat-text">Lives: {lives}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-text">Streak: {streak}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📦</span>
            <span className="stat-text">Remaining: {gameItems.length}</span>
          </div>
        </div>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}

      <div className="game-area">
        {currentItem && (
          <div className="current-item">
            <h3>Sort this item:</h3>
            <div 
              className="waste-item"
              draggable
              onDragStart={(e) => handleDragStart(e, currentItem)}
            >
              <div className="item-image">{currentItem.image}</div>
              <div className="item-name">{currentItem.name}</div>
            </div>
          </div>
        )}

        <div className="bins-container">
          {bins.map((bin) => (
            <div
              key={bin.type}
              className="bin"
              style={{ borderColor: bin.color }}
              onClick={() => handleBinClick(bin.type)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, bin.type)}
            >
              <div className="bin-icon" style={{ color: bin.color }}>
                {bin.icon}
              </div>
              <div className="bin-label" style={{ color: bin.color }}>
                {bin.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="game-help">
        <p>💡 Tip: Drag and drop the item to the correct bin or simply click on the bin!</p>
      </div>
    </div>
  );
};

export default WasteSegregationGame;