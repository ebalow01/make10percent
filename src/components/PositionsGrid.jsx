import React from 'react'

const PositionsGrid = ({ positions, marketData }) => {
  const defaultPositions = [
    { ticker: 'MSFT', allocation: 20 },
    { ticker: 'GOOGL', allocation: 20 },
    { ticker: 'AMD', allocation: 20 },
    { ticker: 'QQQ', allocation: 15 },
    { ticker: 'SPY', allocation: 15 }
  ]

  const positionsToShow = positions || defaultPositions

  return (
    <div className="card">
      <h2>📊 Portfolio Allocation</h2>
      
      <div className="positions-grid">
        {positionsToShow.map((position, index) => (
          <div key={index} className="position-card">
            <div className="position-ticker">
              {position.ticker}
            </div>
            <div className="position-allocation">
              {position.allocation}%
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '10px' }}>
        <h3>💰 Cash Reserve</h3>
        <p><strong>10% allocation</strong> - Risk management and opportunities</p>
      </div>
    </div>
  )
}

export default PositionsGrid