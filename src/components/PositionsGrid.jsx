import React from 'react'

const PositionsGrid = ({ positions, marketData }) => {
  const defaultPositions = [
    {
      ticker: 'MSFT',
      strategy: 'Feb 21 Calls',
      allocation: 20,
      probability: 50,
      expectedReturn: '15-25%'
    },
    {
      ticker: 'GOOGL',
      strategy: 'Feb 21 Calls',
      allocation: 20,
      probability: 45,
      expectedReturn: '20-30%'
    },
    {
      ticker: 'AMD',
      strategy: 'Mar 21 Calls',
      allocation: 20,
      probability: 45,
      expectedReturn: '25-40%'
    },
    {
      ticker: 'QQQ',
      strategy: 'Feb 21 Calls',
      allocation: 15,
      probability: 50,
      expectedReturn: '12-18%'
    },
    {
      ticker: 'SPY',
      strategy: 'Weekly ATM',
      allocation: 15,
      probability: 40,
      expectedReturn: '5-8%/wk'
    }
  ]

  const positionsToShow = positions || defaultPositions

  const getCurrentPrice = (ticker) => {
    if (marketData && marketData[ticker]) {
      return marketData[ticker].price
    }
    return null
  }

  const getPriceChange = (ticker) => {
    if (marketData && marketData[ticker]) {
      return marketData[ticker].changePercent
    }
    return 0
  }

  return (
    <div className="card">
      <h2>📋 Recommended Positions</h2>
      
      <div className="positions-grid">
        {positionsToShow.map((position, index) => {
          const currentPrice = getCurrentPrice(position.ticker)
          const priceChange = getPriceChange(position.ticker)
          
          return (
            <div key={index} className="position-card">
              <div className="position-ticker">
                {position.ticker}
                {currentPrice && (
                  <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                    ${currentPrice}
                    <span style={{ 
                      color: priceChange >= 0 ? '#4CAF50' : '#f44336',
                      marginLeft: '5px'
                    }}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
              
              <div className="position-details">
                <div><strong>{position.strategy}</strong></div>
                <div>Allocation: {position.allocation}%</div>
                <div>Success Rate: {position.probability}%</div>
                <div>Expected Return: {position.expectedReturn}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f8ff', borderRadius: '10px' }}>
        <h3>💰 Cash Reserve</h3>
        <p><strong>10% allocation</strong> - Risk management and opportunities</p>
      </div>
    </div>
  )
}

export default PositionsGrid