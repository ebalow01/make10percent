import React from 'react'

const StrategyOverview = ({ data }) => {
  if (!data) return <div className="card">Loading strategy data...</div>

  return (
    <div className="card strategy-card">
      <h2>📊 Strategy Overview</h2>
      
      <div className="probability-display">
        <div className="probability-number">{data.successProbability}%</div>
        <div className="probability-label">Probability of Success</div>
      </div>

      <div className="metrics-grid">
        <div className="metric">
          <div className="metric-value">{data.targetReturn || 10}%</div>
          <div className="metric-label">Target Return</div>
        </div>
        
        <div className="metric">
          <div className="metric-value">{data.successProbability || 49.3}%</div>
          <div className="metric-label">Success Rate</div>
        </div>
        
        <div className="metric">
          <div className="metric-value">5 Positions</div>
          <div className="metric-label">Diversification</div>
        </div>
        
        <div className="metric">
          <div className="metric-value">Moderate</div>
          <div className="metric-label">Risk Level</div>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>📈 Strategy Status</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <span className="status-indicator status-approved"></span>
          <strong>APPROVED FOR EXECUTION</strong>
        </div>
        <p style={{ marginTop: '10px', color: '#666' }}>
          This moderate-risk strategy balances growth potential with prudent risk management appropriate for retirement funds.
        </p>
      </div>
    </div>
  )
}

export default StrategyOverview