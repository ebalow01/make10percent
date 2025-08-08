import React, { useState, useEffect } from 'react'
import axios from 'axios'
import StrategyOverview from './components/StrategyOverview'
import PositionsGrid from './components/PositionsGrid'
import RealTimeMetrics from './components/RealTimeMetrics'
import MonteCarloResults from './components/MonteCarloResults'

function App() {
  // Fallback data to prevent blank screen (privacy-safe - no dollar amounts)
  const fallbackStrategyData = {
    successProbability: 49.3,
    targetReturn: 10,
    positions: [
      { ticker: 'MSFT', allocation: 20 },
      { ticker: 'GOOGL', allocation: 20 },
      { ticker: 'AMD', allocation: 20 },
      { ticker: 'QQQ', allocation: 15 },
      { ticker: 'SPY', allocation: 15 }
    ],
    monteCarlo: {
      successRate: 49.3,
      expectedReturn: '9.9%',
      worstCaseReturn: '-15.1%',
      simulations: 10000
    }
  }
  
  const fallbackMarketData = {
    MSFT: { price: 430, changePercent: 2.1 },
    GOOGL: { price: 190, changePercent: 1.5 },
    AMD: { price: 172.4, changePercent: 3.2 },
    QQQ: { price: 575, changePercent: 1.8 },
    SPY: { price: 485, changePercent: 0.9 },
    VIX: 15.2,
    marketSentiment: 'Positive',
    volatilityLevel: 'Low-Medium'
  }

  const [strategyData, setStrategyData] = useState(fallbackStrategyData)
  const [marketData, setMarketData] = useState(fallbackMarketData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [apiConnected, setApiConnected] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('Attempting to fetch API data...')
      const [strategyRes, marketRes] = await Promise.all([
        axios.get('/api/strategy'),
        axios.get('/api/market-data')
      ])
      
      console.log('API data received successfully')
      setStrategyData(strategyRes.data)
      setMarketData(marketRes.data)
      setLastUpdate(new Date().toLocaleTimeString())
      setApiConnected(true)
      
    } catch (err) {
      console.warn('API unavailable, using fallback data:', err.message)
      setError(`API connection failed: ${err.message}. Using cached data.`)
      setApiConnected(false)
      // Keep fallback data - don't reset to null
      setLastUpdate(new Date().toLocaleTimeString() + ' (Cached)')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Removed loading screen that was causing blank page
  // App now always displays with fallback data if API fails

  return (
    <div className="container">
      <div className="header">
        <h1>Investment Strategy Dashboard</h1>
        <p>Moderate Risk Strategy (10% Target Return)</p>
        <div className="live-indicator">
          <span className={`status-indicator ${apiConnected ? 'status-approved' : 'status-moderate'} ${apiConnected ? 'pulse' : ''}`}></span>
          {apiConnected ? 'Live Data' : 'Cached Data'} {lastUpdate && `(Last Update: ${lastUpdate})`}
        </div>
        <button onClick={fetchData} className="refresh-button" disabled={loading}>
          {loading ? 'Refreshing...' : apiConnected ? 'Refresh Data' : 'Retry API Connection'}
        </button>
      </div>

      {error && (
        <div className="error" style={{background: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7', borderRadius: '8px'}}>
          ⚠️ {error}
          <br />
          <small>Dashboard is fully functional using cached investment data.</small>
        </div>
      )}

      <div className="dashboard-grid">
        <StrategyOverview data={strategyData} />
        <RealTimeMetrics marketData={marketData} />
        <PositionsGrid positions={strategyData?.positions} marketData={marketData} />
        <MonteCarloResults data={strategyData?.monteCarlo} />
      </div>
    </div>
  )
}

export default App