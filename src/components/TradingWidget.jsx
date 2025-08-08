import React, { useState, useEffect } from 'react'

const TradingWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketOpen, setMarketOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      
      // Check if market is open (9:30 AM - 4:00 PM ET on weekdays)
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const day = now.getDay()
      
      const isWeekday = day >= 1 && day <= 5
      const isMarketHours = (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 16
      
      setMarketOpen(isWeekday && isMarketHours)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const handleCheckboxChange = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const getMarketOpenTime = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 30, 0, 0)
    
    const now = new Date()
    const timeDiff = tomorrow - now
    
    if (timeDiff <= 0) {
      return "Market Open Now"
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hours}h ${minutes}m until market open`
  }

  const paperTrades = [
    {
      id: 'qqq',
      symbol: 'QQQ',
      contract: 'SELL QQQ Feb 21 $575C (ESTIMATED)',
      allocation: '15%',
      entryTrigger: 'QQQ stability check',
      currentPrice: '$569.24 (VERIFY REAL-TIME)',
      status: 'waiting'
    },
    {
      id: 'spy',
      symbol: 'SPY',
      contract: 'SELL SPY Weekly $635C (ESTIMATED)',
      allocation: '15%',
      entryTrigger: 'Market strength confirmation',
      currentPrice: '$632.25 (VERIFY REAL-TIME)',
      status: 'waiting'
    },
    {
      id: 'msft',
      symbol: 'MSFT',
      contract: 'SELL MSFT Feb 21 $530C (ESTIMATED)',
      allocation: '20%',
      entryTrigger: 'MSFT stability check',
      currentPrice: '$520.84 (VERIFY REAL-TIME)',
      status: 'ready'
    },
    {
      id: 'googl',
      symbol: 'GOOGL',
      contract: 'SELL GOOGL Feb 21 $200C (ESTIMATED)',
      allocation: '20%',
      entryTrigger: 'GOOGL stability check',
      currentPrice: '$196.52 (VERIFY REAL-TIME)',
      status: 'ready'
    },
    {
      id: 'amd',
      symbol: 'AMD',
      contract: 'SELL AMD Mar 21 $175C (ESTIMATED)',
      allocation: '20%',
      entryTrigger: 'AMD stability check',
      currentPrice: '$172.40 (VERIFY REAL-TIME)',
      status: 'ready'
    }
  ]

  const executionSteps = [
    { id: 'premarket', time: '6:00 AM', task: 'Check overnight futures & news', completed: false },
    { id: 'alerts', time: '6:30 AM', task: 'Set price alerts for entry levels', completed: false },
    { id: 'platform', time: '9:00 AM', task: 'Login to paper trading platform', completed: false },
    { id: 'monitor', time: '9:30 AM', task: 'Monitor opening volatility (DO NOT TRADE)', completed: false },
    { id: 'execute', time: '9:45 AM', task: 'Begin primary execution window', completed: false },
    { id: 'review', time: '10:30 AM', task: 'Review all positions & set stops', completed: false }
  ]

  return (
    <div className="card trading-widget">
      <div className="widget-header">
        <h2>📋 Paper Trading Execution Plan</h2>
        <div className="trading-disclaimer">
          <strong>🎓 EDUCATIONAL SIMULATION ONLY</strong> - No real money at risk
        </div>
      </div>

      <div className="market-status">
        <div className={`market-indicator ${marketOpen ? 'open' : 'closed'}`}>
          {marketOpen ? '🟢 Market Open' : '🔴 Market Closed'}
        </div>
        <div className="countdown">
          {!marketOpen && getMarketOpenTime()}
        </div>
        <div className="current-time">
          {currentTime.toLocaleTimeString('en-US', { 
            timeZone: 'America/New_York',
            hour12: true 
          })} ET
        </div>
      </div>

      <div className="execution-checklist">
        <h3>⏰ Today's Execution Timeline</h3>
        <div className="checklist">
          {executionSteps.map(step => (
            <div key={step.id} className="checklist-item">
              <input
                type="checkbox"
                id={step.id}
                checked={checkedItems[step.id] || false}
                onChange={() => handleCheckboxChange(step.id)}
              />
              <label htmlFor={step.id} className={checkedItems[step.id] ? 'completed' : ''}>
                <span className="time">{step.time}</span>
                <span className="task">{step.task}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="paper-trades">
        <h3>🎯 Paper Trades to Execute</h3>
        <div className="trades-grid">
          {paperTrades.map(trade => (
            <div key={trade.id} className={`trade-card ${trade.status}`}>
              <div className="trade-header">
                <h4>{trade.symbol}</h4>
                <span className={`status-badge ${trade.status}`}>
                  {trade.status === 'ready' ? '✅ Ready' : '⏳ Wait'}
                </span>
              </div>
              <div className="trade-details">
                <div className="detail">
                  <strong>Contract:</strong> {trade.contract}
                </div>
                <div className="detail">
                  <strong>Allocation:</strong> {trade.allocation}
                </div>
                <div className="detail">
                  <strong>Entry:</strong> {trade.entryTrigger}
                </div>
                <div className="detail">
                  <strong>Current:</strong> {trade.currentPrice}
                </div>
              </div>
              <input
                type="checkbox"
                id={`trade-${trade.id}`}
                checked={checkedItems[`trade-${trade.id}`] || false}
                onChange={() => handleCheckboxChange(`trade-${trade.id}`)}
                className="trade-checkbox"
              />
              <label htmlFor={`trade-${trade.id}`} className="trade-label">
                {checkedItems[`trade-${trade.id}`] ? 'Executed ✅' : 'Execute Trade'}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="risk-reminders">
        <h3>⚠️ Paper Trading Risk Management</h3>
        <div className="risk-rules">
          <div className="risk-item">
            <strong>Higher Risk:</strong> Unlimited loss potential when selling calls
          </div>
          <div className="risk-item">
            <strong>Position Size:</strong> Never exceed allocation percentages
          </div>
          <div className="risk-item">
            <strong>VIX Check:</strong> Abort if VIX > 25 (high volatility)
          </div>
          <div className="risk-item">
            <strong>Time Decay:</strong> Works in our favor (collect premium)
          </div>
          <div className="risk-item">
            <strong>Strike Selection:</strong> Out-of-money strikes for safety buffer
          </div>
          <div className="risk-item">
            <strong>No Rush:</strong> Better to miss entry than make bad entry
          </div>
        </div>
      </div>

      <div className="educational-note">
        <h4>🎓 Learning Objectives</h4>
        <p>
          Practice selling options strategies with proper timing and risk management. 
          Build confidence in premium collection strategy through paper trading 
          simulation without financial risk.
        </p>
      </div>

      <div className="price-disclaimer">
        <h4>⚠️ Important Note</h4>
        <p>
          All prices and contracts shown are <strong>SAMPLE DATA</strong> for educational purposes. 
          In real trading, always verify current market prices and contract specifications 
          before executing any trades.
        </p>
      </div>
    </div>
  )
}

export default TradingWidget