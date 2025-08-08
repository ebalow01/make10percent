import React from 'react'

const RiskManagementTools = () => {
  const riskTools = [
    {
      tool: "Position Sizing Calculator",
      description: "Determine appropriate investment amounts based on risk tolerance",
      formula: "Position Size = (Account Risk % × Total Capital) ÷ Trade Risk %",
      example: "2% account risk, $100K capital = $2,000 maximum risk per trade",
      benefit: "Prevents catastrophic losses from oversized positions"
    },
    {
      tool: "Stop-Loss Strategy",
      description: "Predetermined exit points to limit losses",
      formula: "Stop-Loss = Entry Price × (1 - Maximum Loss %)",
      example: "Stock at $100, 10% stop = Exit at $90",
      benefit: "Removes emotion from loss-cutting decisions"
    },
    {
      tool: "Diversification Analysis",
      description: "Spread risk across different assets and sectors",
      formula: "Correlation Risk = Σ(Position Weights × Asset Correlations)",
      example: "Mix tech, healthcare, utilities to reduce sector risk",
      benefit: "Reduces portfolio volatility and concentration risk"
    },
    {
      tool: "Risk-Reward Ratio",
      description: "Evaluate potential profit vs. potential loss",
      formula: "R:R Ratio = Potential Profit ÷ Potential Loss",
      example: "Risk $100 to make $300 = 3:1 reward-to-risk ratio",
      benefit: "Ensures trades have favorable risk-adjusted returns"
    }
  ]

  const riskLevels = [
    {
      level: "Conservative",
      maxRisk: "1-2% per trade",
      characteristics: "Capital preservation focused, steady growth",
      suitableFor: "Retirement accounts, risk-averse investors",
      color: "#4CAF50"
    },
    {
      level: "Moderate",
      maxRisk: "3-5% per trade", 
      characteristics: "Balanced growth and preservation",
      suitableFor: "Long-term investors, moderate risk tolerance",
      color: "#FF9800"
    },
    {
      level: "Aggressive",
      maxRisk: "6-10% per trade",
      characteristics: "Growth focused, higher volatility acceptable",
      suitableFor: "Experienced traders, shorter time horizons",
      color: "#f44336"
    }
  ]

  return (
    <div className="card">
      <h2>🛡️ Risk Management Educational Tools</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
        Learn essential risk management concepts to protect your capital
      </p>

      <div className="risk-tools-section">
        <h3>🔧 Essential Risk Management Tools</h3>
        <div className="tools-grid">
          {riskTools.map((tool, index) => (
            <div key={index} className="tool-card">
              <h4>{tool.tool}</h4>
              <p className="tool-description">{tool.description}</p>
              
              <div className="tool-formula">
                <strong>Formula:</strong> <code>{tool.formula}</code>
              </div>
              
              <div className="tool-example">
                <strong>Example:</strong> <em>{tool.example}</em>
              </div>
              
              <div className="tool-benefit">
                <strong>Benefit:</strong> {tool.benefit}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="risk-levels-section">
        <h3>📊 Risk Profile Guidelines</h3>
        <div className="levels-grid">
          {riskLevels.map((level, index) => (
            <div 
              key={index} 
              className="level-card"
              style={{ borderLeft: `4px solid ${level.color}` }}
            >
              <div className="level-header">
                <h4 style={{ color: level.color }}>{level.level}</h4>
                <span className="max-risk">{level.maxRisk}</span>
              </div>
              
              <p className="characteristics">{level.characteristics}</p>
              
              <div className="suitable-for">
                <strong>Suitable for:</strong> {level.suitableFor}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="risk-checklist">
        <h3>✅ Risk Management Checklist</h3>
        <div className="checklist-grid">
          <div className="checklist-item">
            <strong>Before Each Trade:</strong>
            <ul>
              <li>Calculate maximum acceptable loss</li>
              <li>Set stop-loss level</li>
              <li>Determine position size</li>
              <li>Identify exit strategy</li>
            </ul>
          </div>
          
          <div className="checklist-item">
            <strong>Portfolio Level:</strong>
            <ul>
              <li>Monitor overall risk exposure</li>
              <li>Check correlation between positions</li>
              <li>Maintain emergency cash reserves</li>
              <li>Review and rebalance regularly</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="educational-reminder">
        <h4>🎓 Remember</h4>
        <p>
          Risk management is about <strong>preserving capital to trade another day</strong>. 
          The goal isn't to avoid all losses, but to ensure losses remain manageable 
          and don't threaten your long-term financial goals.
        </p>
      </div>
    </div>
  )
}

export default RiskManagementTools