# Investment Strategy Dashboard

A modern React-based dashboard for analyzing investment strategies and portfolio optimization. Features Monte Carlo simulations, real-time market data, and interactive position tracking.

## 🚀 Live Demo

- **Live Site**: [Coming Soon - Netlify URL]
- **Repository**: [GitHub Repository URL]

## ✨ Features

- **Strategy Analysis**: 49.3% success probability for moderate-risk investment approach
- **Portfolio Positions**: Track 5 diversified positions (MSFT, GOOGL, AMD, QQQ, SPY)
- **Monte Carlo Simulation**: Statistical analysis with 10,000+ simulations
- **Real-time Market Data**: Live price updates and market sentiment
- **Risk Management**: Position sizing and probability assessments
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🎯 Strategy Overview

- **Target Return**: 10% monthly
- **Success Probability**: 49.3%
- **Risk Level**: Moderate
- **Diversification**: 5 positions with 15-20% allocation each
- **Cash Reserve**: 10% for risk management

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS with responsive design
- **Charts**: Chart.js + React-ChartJS-2
- **HTTP Client**: Axios
- **Development**: Hot reload with Vite dev server

## 🏃‍♂️ Quick Start

### Development Mode (with backend)
```bash
npm install
npm run dev
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:3003

### Static Build (for deployment)
```bash
npm install
npm run build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── StrategyOverview.jsx    # Main strategy metrics
│   │   ├── PositionsGrid.jsx       # Portfolio positions
│   │   ├── RealTimeMetrics.jsx     # Market data display
│   │   └── MonteCarloResults.jsx   # Statistical analysis
│   ├── App.jsx                     # Main application
│   └── index.css                   # Styling
├── server/                         # Backend API (optional)
├── netlify.toml                    # Netlify deployment config
└── vite.config.js                  # Build configuration
```

## 🔧 Configuration

The app works in two modes:

1. **Development**: Full-stack with backend API
2. **Production**: Static build with cached data

The frontend includes fallback data, so it works perfectly even without the backend API.

## 📊 Investment Positions

1. **MSFT** (20%) - Feb 21 Calls - 55% probability
2. **GOOGL** (20%) - Feb 21 Calls - 50% probability  
3. **AMD** (20%) - Mar 21 Calls - 50% probability
4. **QQQ** (15%) - Feb 21 Calls - 55% probability
5. **SPY** (15%) - Weekly ATM - 45% probability

## 🎲 Monte Carlo Results

- **Success Rate**: 49.3%
- **Expected Return**: 9.9%
- **Simulations**: 10,000
- **Risk Assessment**: Moderate with manageable downside

## 🚀 Deployment

### Netlify (Recommended)
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Auto-deploy on push to main

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to any static hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use this project for your own investment analysis.

---

**⚠️ Disclaimer**: This is for educational and analysis purposes only. Not financial advice. Past performance doesn't guarantee future results.