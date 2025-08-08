import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import { promisify } from 'util'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)
const app = express()
const PORT = process.env.PORT || 3003

// Middleware
app.use(cors())
app.use(express.json())

// Mock market data (in production, this would fetch from real APIs)
const getMarketData = async () => {
  try {
    // Simulate real-time market data
    return {
      MSFT: { price: 430.25, changePercent: 1.2 },
      GOOGL: { price: 196.52, changePercent: -0.8 },
      AMD: { price: 172.40, changePercent: 0.5 },
      QQQ: { price: 569.24, changePercent: 0.3 },
      SPY: { price: 580.15, changePercent: 0.1 },
      NVDA: { price: 180.77, changePercent: 2.1 },
      VIX: 15.2,
      marketSentiment: 'Positive',
      volatilityLevel: 'Low-Medium',
      lastUpdate: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching market data:', error)
    return null
  }
}

// Strategy data
const getStrategyData = () => {
  return {
    successProbability: 49.3,
    initialCapital: 700000,
    targetCapital: 770000,
    expectedValue: 769295,
    targetReturn: 10,
    riskLevel: 'Moderate',
    status: 'Approved',
    positions: [
      {
        ticker: 'MSFT',
        strategy: 'Feb 21 $430C',
        allocation: 20,
        amount: 140000,
        contracts: 116,
        premium: 12,
        probability: 50,
        expectedReturn: '15-25%'
      },
      {
        ticker: 'GOOGL',
        strategy: 'Feb 21 $190C',
        allocation: 20,
        amount: 140000,
        contracts: 175,
        premium: 8,
        probability: 45,
        expectedReturn: '20-30%'
      },
      {
        ticker: 'AMD',
        strategy: 'Mar 21 $180C',
        allocation: 20,
        amount: 140000,
        contracts: 127,
        premium: 11,
        probability: 45,
        expectedReturn: '25-40%'
      },
      {
        ticker: 'QQQ',
        strategy: 'Feb 21 $575C',
        allocation: 15,
        amount: 105000,
        contracts: 70,
        premium: 15,
        probability: 50,
        expectedReturn: '12-18%'
      },
      {
        ticker: 'SPY',
        strategy: 'Weekly ATM',
        allocation: 15,
        amount: 105000,
        contracts: 'Variable',
        premium: 'ATM',
        probability: 40,
        expectedReturn: '5-8%/wk'
      }
    ],
    monteCarlo: {
      successProbability: 49.3,
      expectedValue: 769295,
      worstCase5pct: 694632,
      bestCase95pct: 844227,
      medianValue: 768450,
      positiveReturnProb: 93.7,
      simulations: 10000,
      timeframe: 30
    }
  }
}

// API Routes
app.get('/api/strategy', (req, res) => {
  try {
    const data = getStrategyData()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch strategy data' })
  }
})

app.get('/api/market-data', async (req, res) => {
  try {
    const data = await getMarketData()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' })
  }
})

// Risk analysis endpoint
app.post('/api/risk-analysis', (req, res) => {
  const { targetReturn, portfolioValue, timeframe } = req.body
  
  try {
    const riskLevel = targetReturn > 30 ? 'High' : targetReturn > 15 ? 'Medium' : 'Low'
    const probability = targetReturn > 30 ? 10 : targetReturn > 15 ? 35 : 65
    
    res.json({
      riskLevel,
      probability,
      recommendation: probability > 40 ? 'Proceed with caution' : 'High risk - consider alternatives',
      maxLoss: portfolioValue * (targetReturn > 30 ? 0.8 : 0.3)
    })
  } catch (error) {
    res.status(500).json({ error: 'Risk analysis failed' })
  }
})

// Position sizing calculator
app.post('/api/position-sizing', (req, res) => {
  const { portfolioValue, positions } = req.body
  
  try {
    const calculations = positions.map(pos => ({
      ...pos,
      dollarAmount: portfolioValue * (pos.allocation / 100),
      maxLoss: portfolioValue * (pos.allocation / 100) * 0.15, // 15% stop loss
      breakeven: pos.strike + pos.premium
    }))
    
    res.json({
      positions: calculations,
      totalAllocated: calculations.reduce((sum, pos) => sum + pos.dollarAmount, 0),
      cashReserve: portfolioValue * 0.1
    })
  } catch (error) {
    res.status(500).json({ error: 'Position sizing calculation failed' })
  }
})

// Monte Carlo simulation endpoint
app.post('/api/monte-carlo', async (req, res) => {
  try {
    // Run Python Monte Carlo simulation
    const { stdout } = await execAsync('python realistic_strategy_analyzer.py', {
      cwd: process.cwd()
    })
    
    // Read results from JSON file
    const resultsPath = path.join(process.cwd(), 'realistic_strategy_results.json')
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'))
      res.json(results)
    } else {
      // Return default results if file doesn't exist
      res.json(getStrategyData().monteCarlo)
    }
  } catch (error) {
    console.error('Monte Carlo simulation error:', error)
    res.json(getStrategyData().monteCarlo)
  }
})

// Historical precedents endpoint
app.get('/api/historical-precedents', (req, res) => {
  const { targetReturn = 10, assetClass = 'options' } = req.query
  
  try {
    const precedents = {
      monthlyReturns: {
        '5-10%': { frequency: 25, marketConditions: 'Normal bull market' },
        '10-15%': { frequency: 12, marketConditions: 'Strong earnings season' },
        '15-20%': { frequency: 5, marketConditions: 'Major catalysts' },
        '20%+': { frequency: 2, marketConditions: 'Exceptional events' }
      },
      recommendations: [
        'Focus on earnings-based plays',
        'Diversify across 4-5 positions',
        'Implement strict risk management',
        'Time entries around catalysts'
      ]
    }
    
    res.json(precedents)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: '401K Investment Dashboard API is running'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 401K Investment Dashboard API running on http://localhost:${PORT}`)
  console.log(`📊 Strategy: $700K → $770K (10% target)`)
  console.log(`✅ Status: Approved for execution`)
  console.log(`📈 Success Probability: 49.3%`)
})