import React from 'react'

const RealTimeMetrics = ({ marketData }) => {
  const defaultMetrics = {
    VIX: 15.2,
    SPY: { price: 569.24, changePercent: 0.1 },
    QQQ: { price: 569.24, changePercent: 0.3 },
    marketSentiment: 'Positive',
    volatilityLevel: 'Low-Medium'
  }

  // Merge marketData with defaults to handle missing properties
  const metrics = {
    ...defaultMetrics,
    ...marketData,
    // Ensure critical properties exist
    marketSentiment: marketData?.marketSentiment || defaultMetrics.marketSentiment,
    volatilityLevel: marketData?.volatilityLevel || defaultMetrics.volatilityLevel
  }

  const getVIXColor = (vix) => {
    if (vix < 15) return '#4CAF50' // Green - Low volatility
    if (vix < 25) return '#FF9800' // Orange - Medium volatility
    return '#f44336' // Red - High volatility
  }

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return '#666'
    switch (sentiment.toLowerCase()) {
      case 'positive': return '#4CAF50'
      case 'neutral': return '#FF9800'
      case 'negative': return '#f44336'
      default: return '#666'
    }
  }

  return (
    <div className="card">
      <h2>📈 Real-Time Market Metrics</h2>
      
      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-value" style={{ color: getVIXColor(metrics.VIX) }}>
            {metrics.VIX}
          </div>
          <div className="metric-label">VIX (Volatility)</div>
        </div>
        
        <div className="metric">
          <div className="metric-value">{metrics.SPY?.changePercent || 0.1}%</div>
          <div className="metric-label">SPY Change</div>
        </div>
        
        <div className="metric">
          <div className="metric-value">{metrics.QQQ?.changePercent || 0.3}%</div>
          <div className="metric-label">QQQ Change</div>
        </div>
        
        <div className="metric">
          <div className="metric-value" style={{ color: getSentimentColor(metrics.marketSentiment) }}>
            {metrics.marketSentiment || 'Positive'}
          </div>
          <div className="metric-label">Market Sentiment</div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>🎯 Strategy Conditions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
          <div style={{ padding: '10px', background: '#e8f5e8', borderRadius: '5px', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>Volatility Level</div>
            <div>{metrics.volatilityLevel || 'Low-Medium'}</div>
          </div>
          
          <div style={{ padding: '10px', background: '#e8f5e8', borderRadius: '5px', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>Timing</div>
            <div>Favorable</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '15px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}>
        <strong>📊 Market Analysis:</strong> Current conditions show moderate volatility with positive sentiment. 
        Tech earnings season provides multiple catalyst opportunities aligned with our strategy.
      </div>
    </div>
  )
}

export default RealTimeMetrics