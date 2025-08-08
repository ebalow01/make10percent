import React from 'react'

const ComplianceEducation = () => {
  const complianceTopics = [
    {
      topic: "Investment Account Types",
      description: "Understanding different account structures and their rules",
      keyPoints: [
        "401(k): Employer-sponsored, limited investment options",
        "IRA: Individual account, broader investment choices", 
        "Roth IRA: After-tax contributions, tax-free withdrawals",
        "Taxable Account: Full flexibility, tax implications"
      ],
      importance: "Each account type has different rules, contribution limits, and tax treatments"
    },
    {
      topic: "Pattern Day Trading Rules",
      description: "SEC regulations for frequent traders",
      keyPoints: [
        "PDT Rule: 4+ day trades in 5 days requires $25K minimum",
        "Day Trade: Buy and sell same security within market hours",
        "Account restrictions if PDT rules violated",
        "Cash accounts exempt but have settlement delays"
      ],
      importance: "Violating PDT rules can restrict your trading ability"
    },
    {
      topic: "Wash Sale Rules",
      description: "IRS rules about claiming tax losses",
      keyPoints: [
        "Cannot claim losses if repurchasing within 30 days",
        "Applies to 'substantially identical' securities",
        "Affects cost basis calculations",
        "Important for tax planning and record keeping"
      ],
      importance: "Violating wash sale rules can disallow tax deductions"
    },
    {
      topic: "Options Trading Levels",
      description: "Broker approval requirements for different options strategies",
      keyPoints: [
        "Level 1: Covered calls, cash-secured puts",
        "Level 2: Long calls/puts (most common)", 
        "Level 3: Spreads and combination strategies",
        "Level 4: Naked options (highest risk)"
      ],
      importance: "You can only trade strategies your account is approved for"
    }
  ]

  const bestPractices = [
    {
      practice: "Record Keeping",
      description: "Maintain detailed trading records",
      why: "Required for tax reporting and performance analysis",
      howTo: "Use broker statements, trading journal, spreadsheet tracking"
    },
    {
      practice: "Tax Planning",
      description: "Understand tax implications of trades",
      why: "Trading profits are taxable, losses can offset gains",
      howTo: "Consider holding periods, tax-loss harvesting, account types"
    },
    {
      practice: "Risk Disclosure",
      description: "Read and understand all risk disclosures", 
      why: "Legal requirement and helps you understand risks",
      howTo: "Review broker agreements, options disclosure documents"
    },
    {
      practice: "Suitability Requirements",
      description: "Only trade strategies appropriate for your situation",
      why: "Regulators require trades to be suitable for investors",
      howTo: "Be honest about experience, risk tolerance, financial situation"
    }
  ]

  const redFlags = [
    "Promises of guaranteed returns",
    "High-pressure sales tactics", 
    "Unlicensed investment advisors",
    "Requests for personal financial information via email/phone",
    "Complex strategies you don't understand",
    "Pressure to act immediately without research time"
  ]

  return (
    <div className="card">
      <h2>⚖️ Investment Compliance Education</h2>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
        Understanding regulations and requirements for responsible investing
      </p>

      <div className="compliance-topics">
        <h3>📋 Key Compliance Areas</h3>
        <div className="topics-grid">
          {complianceTopics.map((topic, index) => (
            <div key={index} className="topic-card">
              <h4>{topic.topic}</h4>
              <p className="topic-description">{topic.description}</p>
              
              <div className="key-points">
                <strong>Key Points:</strong>
                <ul>
                  {topic.keyPoints.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="importance">
                <strong>Why It Matters:</strong> {topic.importance}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="best-practices">
        <h3>✅ Compliance Best Practices</h3>
        <div className="practices-grid">
          {bestPractices.map((practice, index) => (
            <div key={index} className="practice-card">
              <h4>{practice.practice}</h4>
              <p className="practice-description">{practice.description}</p>
              
              <div className="why-important">
                <strong>Why Important:</strong> {practice.why}
              </div>
              
              <div className="how-to">
                <strong>How To:</strong> {practice.howTo}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="red-flags">
        <h3>🚩 Compliance Red Flags to Avoid</h3>
        <div className="flags-grid">
          {redFlags.map((flag, index) => (
            <div key={index} className="flag-item">
              <span className="flag-icon">🚩</span>
              {flag}
            </div>
          ))}
        </div>
      </div>

      <div className="disclaimer-section">
        <h3>📝 Important Disclaimers</h3>
        <div className="disclaimer-content">
          <div className="disclaimer-item">
            <strong>Educational Purpose:</strong>
            <p>This content is for educational purposes only and does not constitute financial advice.</p>
          </div>
          
          <div className="disclaimer-item">
            <strong>Professional Guidance:</strong>
            <p>Always consult qualified financial professionals for personalized investment advice.</p>
          </div>
          
          <div className="disclaimer-item">
            <strong>Regulatory Compliance:</strong>
            <p>Investment regulations change frequently. Verify current rules with your broker.</p>
          </div>
          
          <div className="disclaimer-item">
            <strong>Risk Acknowledgment:</strong>
            <p>All investments carry risk of loss. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </div>

      <div className="additional-resources">
        <h4>📚 Additional Resources</h4>
        <p>
          For official regulatory guidance, visit the SEC (sec.gov), FINRA (finra.org), 
          and IRS (irs.gov) websites for the most current rules and requirements.
        </p>
      </div>
    </div>
  )
}

export default ComplianceEducation