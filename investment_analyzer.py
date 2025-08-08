import yfinance as yf
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import json
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')

class StockAnalyzer:
    """Analyze real-time stock data for high-momentum opportunities"""
    
    def __init__(self):
        self.data_cache = {}
        
    def get_stock_data(self, ticker: str, period: str = "1mo") -> pd.DataFrame:
        """Fetch stock data using yfinance"""
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(period=period)
            self.data_cache[ticker] = data
            return data
        except Exception as e:
            print(f"Error fetching {ticker}: {e}")
            return pd.DataFrame()
    
    def calculate_momentum_indicators(self, ticker: str) -> Dict:
        """Calculate momentum indicators for a stock"""
        if ticker not in self.data_cache:
            data = self.get_stock_data(ticker)
        else:
            data = self.data_cache[ticker]
            
        if data.empty:
            return {}
            
        # Calculate indicators
        data['Returns'] = data['Close'].pct_change()
        data['SMA_5'] = data['Close'].rolling(window=5).mean()
        data['SMA_20'] = data['Close'].rolling(window=20).mean()
        data['RSI'] = self.calculate_rsi(data['Close'])
        data['Volume_Ratio'] = data['Volume'] / data['Volume'].rolling(window=20).mean()
        
        current_price = data['Close'].iloc[-1]
        
        return {
            'ticker': ticker,
            'current_price': round(current_price, 2),
            'daily_return': round(data['Returns'].iloc[-1] * 100, 2),
            'weekly_return': round((data['Close'].iloc[-1] / data['Close'].iloc[-5] - 1) * 100, 2),
            'monthly_return': round((data['Close'].iloc[-1] / data['Close'].iloc[0] - 1) * 100, 2),
            'rsi': round(data['RSI'].iloc[-1], 2),
            'volume_spike': round(data['Volume_Ratio'].iloc[-1], 2),
            'above_sma5': current_price > data['SMA_5'].iloc[-1],
            'above_sma20': current_price > data['SMA_20'].iloc[-1]
        }
    
    def calculate_rsi(self, prices: pd.Series, period: int = 14) -> pd.Series:
        """Calculate RSI indicator"""
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi
    
    def get_upcoming_earnings(self, ticker: str) -> Dict:
        """Get upcoming earnings date for a ticker"""
        try:
            stock = yf.Ticker(ticker)
            calendar = stock.calendar
            if calendar and not calendar.empty:
                return {
                    'ticker': ticker,
                    'earnings_date': calendar.iloc[0, 0] if len(calendar) > 0 else None
                }
        except:
            pass
        return {'ticker': ticker, 'earnings_date': None}
    
    def analyze_multiple_stocks(self, tickers: List[str]) -> pd.DataFrame:
        """Analyze multiple stocks and return sorted by momentum"""
        results = []
        for ticker in tickers:
            indicators = self.calculate_momentum_indicators(ticker)
            if indicators:
                results.append(indicators)
        
        df = pd.DataFrame(results)
        if not df.empty:
            # Score stocks based on momentum factors
            df['momentum_score'] = (
                df['weekly_return'] * 0.3 +
                df['monthly_return'] * 0.3 +
                df['volume_spike'] * 10 +
                df['above_sma5'].astype(int) * 10 +
                df['above_sma20'].astype(int) * 10
            )
            df = df.sort_values('momentum_score', ascending=False)
        return df


class OptionsCalculator:
    """Calculate options profit/loss for Level 1 strategies (long calls/puts only)"""
    
    def __init__(self):
        self.risk_free_rate = 0.05  # 5% annual risk-free rate
        
    def calculate_call_profit(self, stock_price: float, strike: float, premium: float, 
                             target_price: float, contracts: int = 1) -> Dict:
        """Calculate profit/loss for long call option"""
        cost = premium * 100 * contracts  # Premium paid
        
        if target_price > strike:
            intrinsic_value = (target_price - strike) * 100 * contracts
            profit = intrinsic_value - cost
        else:
            profit = -cost  # Option expires worthless
            
        return {
            'strategy': 'Long Call',
            'stock_price': stock_price,
            'strike': strike,
            'premium': premium,
            'total_cost': cost,
            'target_price': target_price,
            'profit_loss': profit,
            'return_pct': (profit / cost) * 100,
            'breakeven': strike + premium
        }
    
    def calculate_put_profit(self, stock_price: float, strike: float, premium: float,
                            target_price: float, contracts: int = 1) -> Dict:
        """Calculate profit/loss for long put option"""
        cost = premium * 100 * contracts  # Premium paid
        
        if target_price < strike:
            intrinsic_value = (strike - target_price) * 100 * contracts
            profit = intrinsic_value - cost
        else:
            profit = -cost  # Option expires worthless
            
        return {
            'strategy': 'Long Put',
            'stock_price': stock_price,
            'strike': strike,
            'premium': premium,
            'total_cost': cost,
            'target_price': target_price,
            'profit_loss': profit,
            'return_pct': (profit / cost) * 100,
            'breakeven': strike - premium
        }
    
    def find_optimal_strikes(self, stock_price: float, target_return: float = 0.43,
                           available_capital: float = 700000) -> List[Dict]:
        """Find optimal strike prices for target return"""
        suggestions = []
        
        # For calls (bullish plays)
        for price_increase in [0.10, 0.15, 0.20, 0.25, 0.30]:
            target_price = stock_price * (1 + price_increase)
            
            # ATM and OTM strikes
            for strike_offset in [0, 0.05, 0.10]:
                strike = stock_price * (1 + strike_offset)
                
                # Estimate premium (simplified - real premiums vary)
                premium = stock_price * 0.02 * (1 + strike_offset * 2)
                
                # Calculate how many contracts needed
                profit_per_contract = (target_price - strike - premium) * 100
                if profit_per_contract > 0:
                    contracts_needed = int((available_capital * target_return) / profit_per_contract)
                    cost = contracts_needed * premium * 100
                    
                    if cost <= available_capital:
                        result = self.calculate_call_profit(
                            stock_price, strike, premium, target_price, contracts_needed
                        )
                        result['price_increase_needed'] = price_increase * 100
                        suggestions.append(result)
        
        return suggestions
    
    def calculate_required_move(self, current_capital: float, target_capital: float,
                               option_premium: float, strike: float) -> float:
        """Calculate required stock move to hit target"""
        target_profit = target_capital - current_capital
        contracts = int(current_capital / (option_premium * 100))
        
        # For a call option
        required_stock_price = strike + option_premium + (target_profit / (contracts * 100))
        required_move_pct = ((required_stock_price / strike) - 1) * 100
        
        return required_move_pct


class MonteCarloSimulator:
    """Monte Carlo simulation for probability analysis"""
    
    def __init__(self, num_simulations: int = 10000):
        self.num_simulations = num_simulations
        
    def simulate_stock_paths(self, current_price: float, volatility: float,
                            days: int = 30, drift: float = 0) -> np.ndarray:
        """Simulate stock price paths using Monte Carlo"""
        dt = 1/252  # Daily time step (252 trading days per year)
        
        # Generate random walks
        np.random.seed(42)
        random_shocks = np.random.normal(0, 1, (self.num_simulations, days))
        
        # Calculate price paths
        price_paths = np.zeros((self.num_simulations, days + 1))
        price_paths[:, 0] = current_price
        
        for t in range(1, days + 1):
            price_paths[:, t] = price_paths[:, t-1] * np.exp(
                (drift - 0.5 * volatility**2) * dt + 
                volatility * np.sqrt(dt) * random_shocks[:, t-1]
            )
        
        return price_paths
    
    def calculate_probability_of_target(self, current_price: float, target_price: float,
                                       volatility: float, days: int = 30) -> Dict:
        """Calculate probability of reaching target price"""
        paths = self.simulate_stock_paths(current_price, volatility, days)
        final_prices = paths[:, -1]
        
        # Calculate probabilities
        prob_reach_target = np.mean(final_prices >= target_price) * 100
        
        # Calculate percentiles
        percentiles = np.percentile(final_prices, [5, 25, 50, 75, 95])
        
        return {
            'current_price': current_price,
            'target_price': target_price,
            'required_return': ((target_price / current_price) - 1) * 100,
            'probability': round(prob_reach_target, 2),
            'expected_price': round(np.mean(final_prices), 2),
            'percentile_5': round(percentiles[0], 2),
            'percentile_25': round(percentiles[1], 2),
            'median_price': round(percentiles[2], 2),
            'percentile_75': round(percentiles[3], 2),
            'percentile_95': round(percentiles[4], 2)
        }
    
    def portfolio_simulation(self, positions: List[Dict], capital: float = 700000) -> Dict:
        """Simulate portfolio performance with multiple positions"""
        portfolio_returns = []
        
        for _ in range(self.num_simulations):
            total_return = 0
            remaining_capital = capital
            
            for position in positions:
                # Allocate capital
                allocation = remaining_capital * position['weight']
                
                # Simulate return (simplified)
                volatility = position.get('volatility', 0.3)
                expected_return = position.get('expected_return', 0)
                
                random_return = np.random.normal(expected_return, volatility)
                position_return = allocation * random_return
                
                total_return += position_return
                
            portfolio_returns.append(total_return)
        
        portfolio_returns = np.array(portfolio_returns)
        final_values = capital + portfolio_returns
        
        # Calculate statistics
        prob_reach_million = np.mean(final_values >= 1000000) * 100
        
        return {
            'initial_capital': capital,
            'target': 1000000,
            'probability_of_success': round(prob_reach_million, 2),
            'expected_final_value': round(np.mean(final_values), 2),
            'median_final_value': round(np.median(final_values), 2),
            'worst_case_5pct': round(np.percentile(final_values, 5), 2),
            'best_case_95pct': round(np.percentile(final_values, 95), 2)
        }


def main():
    """Main analysis function"""
    print("=" * 60)
    print("401K INVESTMENT ANALYZER - $700K to $1M Strategy")
    print("=" * 60)
    
    # Initialize analyzers
    stock_analyzer = StockAnalyzer()
    options_calc = OptionsCalculator()
    monte_carlo = MonteCarloSimulator()
    
    # High momentum stocks to analyze (these would come from WSB agent)
    tickers_to_analyze = ['NVDA', 'TSLA', 'AMD', 'AAPL', 'SPY', 'QQQ', 'MSFT', 'META']
    
    print("\n1. ANALYZING HIGH-MOMENTUM STOCKS")
    print("-" * 40)
    
    momentum_df = stock_analyzer.analyze_multiple_stocks(tickers_to_analyze)
    if not momentum_df.empty:
        print(momentum_df[['ticker', 'current_price', 'weekly_return', 
                          'monthly_return', 'momentum_score']].head())
    
    # Get top stock for detailed analysis
    if not momentum_df.empty:
        top_stock = momentum_df.iloc[0]
        ticker = top_stock['ticker']
        current_price = top_stock['current_price']
        
        print(f"\n2. OPTIONS STRATEGY FOR {ticker}")
        print("-" * 40)
        
        # Calculate options strategies
        target_price = current_price * 1.43  # 43% gain target
        
        # Example call option calculation
        strike = current_price * 1.05  # 5% OTM
        premium = current_price * 0.03  # 3% premium estimate
        contracts_needed = int(700000 / (premium * 100))
        
        call_result = options_calc.calculate_call_profit(
            current_price, strike, premium, target_price, contracts_needed
        )
        
        print(f"Strategy: Buy {contracts_needed} call options")
        print(f"Strike: ${strike:.2f}, Premium: ${premium:.2f}")
        print(f"Total Cost: ${call_result['total_cost']:,.2f}")
        print(f"Target Price: ${target_price:.2f}")
        print(f"Potential Profit: ${call_result['profit_loss']:,.2f}")
        print(f"Return: {call_result['return_pct']:.1f}%")
        
        print("\n3. MONTE CARLO PROBABILITY ANALYSIS")
        print("-" * 40)
        
        # Run Monte Carlo simulation
        volatility = 0.30  # 30% annual volatility (typical for growth stocks)
        
        prob_analysis = monte_carlo.calculate_probability_of_target(
            current_price, target_price, volatility, days=30
        )
        
        print(f"Current Price: ${prob_analysis['current_price']:.2f}")
        print(f"Target Price: ${prob_analysis['target_price']:.2f}")
        print(f"Required Return: {prob_analysis['required_return']:.1f}%")
        print(f"Probability of Success: {prob_analysis['probability']:.1f}%")
        print(f"Expected Price (30 days): ${prob_analysis['expected_price']:.2f}")
        print(f"95% Confidence Range: ${prob_analysis['percentile_5']:.2f} - ${prob_analysis['percentile_95']:.2f}")
        
        # Portfolio simulation
        print("\n4. PORTFOLIO SIMULATION RESULTS")
        print("-" * 40)
        
        positions = [
            {'weight': 0.4, 'expected_return': 0.20, 'volatility': 0.35},
            {'weight': 0.3, 'expected_return': 0.15, 'volatility': 0.30},
            {'weight': 0.3, 'expected_return': 0.10, 'volatility': 0.25}
        ]
        
        portfolio_result = monte_carlo.portfolio_simulation(positions)
        
        print(f"Initial Capital: ${portfolio_result['initial_capital']:,.2f}")
        print(f"Target: ${portfolio_result['target']:,.2f}")
        print(f"Probability of reaching $1M: {portfolio_result['probability_of_success']:.1f}%")
        print(f"Expected Final Value: ${portfolio_result['expected_final_value']:,.2f}")
        print(f"Worst Case (5%): ${portfolio_result['worst_case_5pct']:,.2f}")
        print(f"Best Case (95%): ${portfolio_result['best_case_95pct']:,.2f}")
        
        # Save results to JSON
        results = {
            'timestamp': datetime.now().isoformat(),
            'top_stocks': momentum_df.head().to_dict('records') if not momentum_df.empty else [],
            'options_strategy': call_result,
            'probability_analysis': prob_analysis,
            'portfolio_simulation': portfolio_result
        }
        
        with open('investment_analysis_results.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        print("\n" + "=" * 60)
        print("Analysis complete! Results saved to investment_analysis_results.json")
        print("=" * 60)

if __name__ == "__main__":
    main()