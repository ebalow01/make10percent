import React from 'react'

const TechnicalIndicators = ({ marketData }) => {
  const indicators = [
    {
      name: "Moving Average (50-day)",
      description: "Shows average price trend over 50 days",
      educational: "When price > MA50, indicates potential upward momentum",
      value: "Trending Up",
      status: "bullish"
    },
    {
      name: "Volatility Index (VIX)",
      description: "Market fear gauge - measures expected volatility",
      educational: "VIX < 20 = Low fear, VIX > 30 = High fear/uncertainty",
      value: marketData?.VIX || "15.2",
      status: "neutral"
    },
    {
      name: "Market Breadth",
      description: "Percentage of stocks advancing vs declining",
      educational: "Above 50% suggests broad market strength",
      value: "62% Advancing",
      status: "bullish"
    },
    {
      name: "RSI (Relative Strength)",
      description: "Momentum indicator (0-100 scale)",
      educational: "RSI > 70 may indicate overbought, RSI < 30 oversold",
      value: "55 (Neutral)",
      status: "neutral"
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'bullish': return '#4CAF50'
      case 'bearish': return '#f44336'
      default: return '#FF9800'
    }
  }

  return (
    <div className="card">
      <h2>📈 Educational Technical Indicators</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
        Learn about market indicators - for educational purposes only
      </p>
      
      <div className="indicators-grid">
        {indicators.map((indicator, index) => (
          <div key={index} className="indicator-item">
            <div className="indicator-header">
              <h4>{indicator.name}</h4>
              <span 
                className="indicator-status"
                style={{ 
                  color: getStatusColor(indicator.status),
                  fontWeight: 'bold'
                }}
              >
                {indicator.value}
              </span>
            </div>
            <p className="indicator-description">{indicator.description}</p>
            <div className="educational-note">
              💡 <em>{indicator.educational}</em>
            </div>
          </div>
        ))}
      </div>

      <div className="educational-disclaimer">
        <h4>📚 Educational Purpose</h4>
        <p>
          These indicators help you understand market analysis concepts. 
          Always consult financial professionals before making investment decisions.
        </p>
      </div>
    </div>
  )
}

export default TechnicalIndicators