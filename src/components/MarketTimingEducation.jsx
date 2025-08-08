import React from 'react'

const MarketTimingEducation = () => {
  const timingConcepts = [
    {
      concept: "Dollar Cost Averaging",
      description: "Investing fixed amounts regularly regardless of market conditions",
      pros: "Reduces impact of volatility, builds discipline",
      cons: "May miss optimal entry points",
      example: "Investing $500 monthly for 12 months"
    },
    {
      concept: "Value Averaging",
      description: "Adjust investment amounts based on portfolio performance",
      pros: "Potentially better returns than DCA",
      cons: "Requires more complex calculations",
      example: "Target $6000 growth, invest more when behind target"
    },
    {
      concept: "Lump Sum Investing",
      description: "Investing all available funds at once",
      pros: "Maximizes time in market, historically outperforms DCA",
      cons: "Higher emotional difficulty, timing risk",
      example: "Investing entire $50K windfall immediately"
    },
    {
      concept: "Market Timing",
      description: "Attempting to predict market highs and lows",
      pros: "Theoretical maximum returns if perfect",
      cons: "Extremely difficult, often underperforms buy-and-hold",
      example: "Selling before crashes, buying at bottoms"
    }
  ]

  const timingMyths = [
    {
      myth: "You can consistently predict market movements",
      reality: "Even professional fund managers struggle to beat market indexes long-term"
    },
    {
      myth: "Waiting for the 'perfect' time to invest",
      reality: "Time in market typically beats timing the market"
    },
    {
      myth: "News events always move markets predictably",
      reality: "Markets often react opposite to expectations"
    }
  ]

  return (
    <div className="card">
      <h2>⏰ Market Timing Education</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
        Understanding different investment timing strategies and their trade-offs
      </p>

      <div className="timing-concepts">
        <h3>📊 Investment Timing Strategies</h3>
        <div className="concepts-grid">
          {timingConcepts.map((item, index) => (
            <div key={index} className="concept-card">
              <h4>{item.concept}</h4>
              <p className="concept-description">{item.description}</p>
              
              <div className="pros-cons">
                <div className="pros">
                  <strong>✅ Pros:</strong> {item.pros}
                </div>
                <div className="cons">
                  <strong>❌ Cons:</strong> {item.cons}
                </div>
              </div>
              
              <div className="example">
                <strong>Example:</strong> <em>{item.example}</em>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="timing-myths">
        <h3>🚫 Common Market Timing Myths</h3>
        <div className="myths-grid">
          {timingMyths.map((item, index) => (
            <div key={index} className="myth-card">
              <div className="myth">
                <strong>Myth:</strong> {item.myth}
              </div>
              <div className="reality">
                <strong>Reality:</strong> {item.reality}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="educational-summary">
        <h4>🎯 Key Takeaway</h4>
        <p>
          Research shows that <strong>consistent, disciplined investing</strong> over time 
          typically outperforms attempts to time the market. Focus on your long-term 
          strategy rather than short-term market movements.
        </p>
      </div>
    </div>
  )
}

export default MarketTimingEducation