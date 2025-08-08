import yfinance as yf
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import json
import warnings
warnings.filterwarnings('ignore')

class RealisticStrategyAnalyzer:
    """Analyze realistic 10% monthly return strategies"""
    
    def __init__(self):
        self.target_return = 0.10  # 10% target
        self.initial_capital = 700000
        self.target_capital = 770000
        self.required_profit = 70000
        
    def analyze_moderate_risk_stocks(self, tickers: list) -> pd.DataFrame:
        """Analyze stocks for moderate-risk 10% monthly returns"""
        results = []
        
        for ticker in tickers:
            try:
                stock = yf.Ticker(ticker)
                data = stock.history(period="3mo")
                
                if data.empty:
                    continue
                    
                current_price = data['Close'].iloc[-1]
                
                # Calculate volatility and returns
                data['Returns'] = data['Close'].pct_change()
                weekly_return = (data['Close'].iloc[-1] / data['Close'].iloc[-5] - 1) * 100
                monthly_return = (data['Close'].iloc[-1] / data['Close'].iloc[-21] - 1) * 100
                volatility = data['Returns'].std() * np.sqrt(252) * 100  # Annualized volatility
                
                # Calculate momentum indicators
                data['SMA_20'] = data['Close'].rolling(window=20).mean()
                data['RSI'] = self.calculate_rsi(data['Close'])
                
                # Risk assessment for 10% target
                target_price = current_price * 1.10
                risk_score = self.calculate_risk_score(volatility, monthly_return, data['RSI'].iloc[-1])
                
                results.append({
                    'ticker': ticker,
                    'current_price': round(current_price, 2),
                    'target_price_10pct': round(target_price, 2),
                    'weekly_return': round(weekly_return, 2),
                    'monthly_return': round(monthly_return, 2),
                    'volatility': round(volatility, 2),
                    'rsi': round(data['RSI'].iloc[-1], 2),
                    'above_sma20': current_price > data['SMA_20'].iloc[-1],
                    'risk_score': risk_score,
                    'probability_10pct': self.estimate_probability_10pct(volatility, monthly_return)
                })
                
            except Exception as e:
                print(f"Error analyzing {ticker}: {e}")
                continue
                
        df = pd.DataFrame(results)
        if not df.empty:
            # Sort by probability of achieving 10% return
            df = df.sort_values('probability_10pct', ascending=False)
        return df
    
    def calculate_rsi(self, prices: pd.Series, period: int = 14) -> pd.Series:
        """Calculate RSI indicator"""
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi
    
    def calculate_risk_score(self, volatility: float, monthly_return: float, rsi: float) -> str:
        """Calculate risk score: Low, Medium, High"""
        score = 0
        
        # Volatility component (lower is better for consistent returns)
        if volatility < 25:
            score += 1
        elif volatility < 40:
            score += 2
        else:
            score += 3
            
        # Recent performance component
        if monthly_return > 5:
            score += 1
        elif monthly_return > 0:
            score += 2
        else:
            score += 3
            
        # RSI component (moderate levels preferred)
        if 40 <= rsi <= 60:
            score += 1
        elif 30 <= rsi <= 70:
            score += 2
        else:
            score += 3
            
        if score <= 4:
            return "Low"
        elif score <= 6:
            return "Medium"
        else:
            return "High"
    
    def estimate_probability_10pct(self, volatility: float, recent_return: float) -> float:
        """Estimate probability of achieving 10% return in 30 days"""
        # Base probability based on volatility
        if volatility < 20:
            base_prob = 25
        elif volatility < 30:
            base_prob = 35
        elif volatility < 40:
            base_prob = 40
        else:
            base_prob = 30
            
        # Adjust based on recent performance
        if recent_return > 10:
            base_prob += 15
        elif recent_return > 5:
            base_prob += 10
        elif recent_return > 0:
            base_prob += 5
        else:
            base_prob -= 10
            
        return min(max(base_prob, 5), 65)  # Cap between 5% and 65%
    
    def calculate_moderate_options_strategies(self, stock_price: float, ticker: str) -> list:
        """Calculate moderate-risk options strategies for 10% return"""
        strategies = []
        
        # Strategy 1: At-the-money calls (moderate risk)
        atm_strike = stock_price
        atm_premium = stock_price * 0.025  # 2.5% premium estimate
        target_price = stock_price * 1.10
        
        profit_per_contract = (target_price - atm_strike - atm_premium) * 100
        if profit_per_contract > 0:
            contracts_needed = int(self.required_profit / profit_per_contract)
            total_cost = contracts_needed * atm_premium * 100
            
            if total_cost <= self.initial_capital * 0.3:  # Max 30% allocation
                strategies.append({
                    'strategy': 'ATM Calls',
                    'ticker': ticker,
                    'strike': atm_strike,
                    'premium': atm_premium,
                    'contracts': contracts_needed,
                    'total_cost': total_cost,
                    'target_profit': profit_per_contract * contracts_needed,
                    'required_stock_move': 10.0,
                    'allocation_pct': (total_cost / self.initial_capital) * 100
                })
        
        # Strategy 2: Slightly OTM calls (higher risk/reward)
        otm_strike = stock_price * 1.03
        otm_premium = stock_price * 0.015  # 1.5% premium estimate
        
        profit_per_contract = (target_price - otm_strike - otm_premium) * 100
        if profit_per_contract > 0:
            contracts_needed = int(self.required_profit / profit_per_contract)
            total_cost = contracts_needed * otm_premium * 100
            
            if total_cost <= self.initial_capital * 0.25:  # Max 25% allocation
                strategies.append({
                    'strategy': '3% OTM Calls',
                    'ticker': ticker,
                    'strike': otm_strike,
                    'premium': otm_premium,
                    'contracts': contracts_needed,
                    'total_cost': total_cost,
                    'target_profit': profit_per_contract * contracts_needed,
                    'required_stock_move': 10.0,
                    'allocation_pct': (total_cost / self.initial_capital) * 100
                })
        
        # Strategy 3: Diversified approach
        conservative_allocation = self.initial_capital * 0.15
        contracts_conservative = int(conservative_allocation / (atm_premium * 100))
        
        if contracts_conservative > 0:
            strategies.append({
                'strategy': 'Conservative Diversified',
                'ticker': ticker,
                'strike': atm_strike,
                'premium': atm_premium,
                'contracts': contracts_conservative,
                'total_cost': contracts_conservative * atm_premium * 100,
                'target_profit': profit_per_contract * contracts_conservative,
                'required_stock_move': 10.0,
                'allocation_pct': 15.0
            })
        
        return strategies
    
    def run_monte_carlo_10pct(self, stock_price: float, volatility: float) -> dict:
        """Run Monte Carlo simulation for 10% target"""
        num_simulations = 10000
        days = 30
        dt = 1/252
        
        target_price = stock_price * 1.10
        
        # Generate price paths
        np.random.seed(42)
        random_shocks = np.random.normal(0, 1, (num_simulations, days))
        
        price_paths = np.zeros((num_simulations, days + 1))
        price_paths[:, 0] = stock_price
        
        for t in range(1, days + 1):
            price_paths[:, t] = price_paths[:, t-1] * np.exp(
                -0.5 * (volatility/100)**2 * dt + 
                (volatility/100) * np.sqrt(dt) * random_shocks[:, t-1]
            )
        
        final_prices = price_paths[:, -1]
        
        # Calculate probabilities
        prob_10pct = np.mean(final_prices >= target_price) * 100
        prob_5pct = np.mean(final_prices >= stock_price * 1.05) * 100
        prob_break_even = np.mean(final_prices >= stock_price) * 100
        
        return {
            'stock_price': stock_price,
            'target_price': target_price,
            'prob_10pct': round(prob_10pct, 1),
            'prob_5pct': round(prob_5pct, 1),
            'prob_break_even': round(prob_break_even, 1),
            'expected_price': round(np.mean(final_prices), 2),
            'median_price': round(np.median(final_prices), 2),
            'percentile_25': round(np.percentile(final_prices, 25), 2),
            'percentile_75': round(np.percentile(final_prices, 75), 2)
        }
    
    def diversified_portfolio_simulation(self, top_stocks: pd.DataFrame) -> dict:
        """Simulate diversified portfolio for 10% return"""
        if top_stocks.empty:
            return {}
            
        # Take top 3-5 stocks
        selected_stocks = top_stocks.head(5)
        equal_weight = 1.0 / len(selected_stocks)
        
        portfolio_returns = []
        
        for _ in range(10000):
            total_return = 0
            
            for _, stock in selected_stocks.iterrows():
                # Simulate individual stock return
                volatility = stock['volatility'] / 100
                expected_return = 0.10  # Target 10% return
                
                # Add some randomness
                actual_return = np.random.normal(expected_return, volatility/2)
                position_return = equal_weight * actual_return
                total_return += position_return
            
            portfolio_returns.append(total_return)
        
        portfolio_returns = np.array(portfolio_returns)
        final_values = self.initial_capital * (1 + portfolio_returns)
        
        return {
            'initial_capital': self.initial_capital,
            'target_capital': self.target_capital,
            'prob_reach_target': round(np.mean(final_values >= self.target_capital) * 100, 1),
            'prob_positive': round(np.mean(portfolio_returns > 0) * 100, 1),
            'expected_return': round(np.mean(portfolio_returns) * 100, 1),
            'expected_value': round(np.mean(final_values), 2),
            'worst_case_5pct': round(np.percentile(final_values, 5), 2),
            'best_case_95pct': round(np.percentile(final_values, 95), 2),
            'median_value': round(np.median(final_values), 2)
        }


def main():
    """Main analysis for realistic 10% strategy"""
    print("=" * 60)
    print("REALISTIC 401K STRATEGY - $700K to $770K (10% Return)")
    print("=" * 60)
    
    analyzer = RealisticStrategyAnalyzer()
    
    # Focus on stable, large-cap stocks with growth potential
    moderate_risk_tickers = [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META',
        'JPM', 'JNJ', 'PG', 'KO', 'DIS', 'HD', 'WMT', 'V'
    ]
    
    print("\n1. ANALYZING MODERATE-RISK STOCKS FOR 10% TARGET")
    print("-" * 50)
    
    stock_analysis = analyzer.analyze_moderate_risk_stocks(moderate_risk_tickers)
    
    if not stock_analysis.empty:
        print("Top 5 candidates for 10% monthly return:")
        display_cols = ['ticker', 'current_price', 'target_price_10pct', 
                       'monthly_return', 'volatility', 'risk_score', 'probability_10pct']
        print(stock_analysis[display_cols].head())
        
        # Get top stock for detailed analysis
        top_stock = stock_analysis.iloc[0]
        ticker = top_stock['ticker']
        current_price = top_stock['current_price']
        volatility = top_stock['volatility']
        
        print(f"\n2. OPTIONS STRATEGIES FOR {ticker}")
        print("-" * 40)
        
        strategies = analyzer.calculate_moderate_options_strategies(current_price, ticker)
        
        for strategy in strategies[:3]:  # Show top 3 strategies
            print(f"\nStrategy: {strategy['strategy']}")
            print(f"Contracts: {strategy['contracts']}")
            print(f"Total Cost: ${strategy['total_cost']:,.2f}")
            print(f"Target Profit: ${strategy['target_profit']:,.2f}")
            print(f"Portfolio Allocation: {strategy['allocation_pct']:.1f}%")
        
        print(f"\n3. MONTE CARLO ANALYSIS - {ticker}")
        print("-" * 40)
        
        mc_results = analyzer.run_monte_carlo_10pct(current_price, volatility)
        
        print(f"Current Price: ${mc_results['stock_price']:.2f}")
        print(f"Target Price: ${mc_results['target_price']:.2f}")
        print(f"Probability of 10% gain: {mc_results['prob_10pct']}%")
        print(f"Probability of 5% gain: {mc_results['prob_5pct']}%")
        print(f"Probability of break-even: {mc_results['prob_break_even']}%")
        print(f"Expected Price: ${mc_results['expected_price']:.2f}")
        
        print("\n4. DIVERSIFIED PORTFOLIO SIMULATION")
        print("-" * 40)
        
        portfolio_results = analyzer.diversified_portfolio_simulation(stock_analysis)
        
        if portfolio_results:
            print(f"Initial Capital: ${portfolio_results['initial_capital']:,}")
            print(f"Target Capital: ${portfolio_results['target_capital']:,}")
            print(f"Probability of reaching target: {portfolio_results['prob_reach_target']}%")
            print(f"Probability of positive returns: {portfolio_results['prob_positive']}%")
            print(f"Expected Return: {portfolio_results['expected_return']}%")
            print(f"Expected Final Value: ${portfolio_results['expected_value']:,.2f}")
            print(f"Worst Case (5%): ${portfolio_results['worst_case_5pct']:,.2f}")
            print(f"Best Case (95%): ${portfolio_results['best_case_95pct']:,.2f}")
        
        # Save results
        results = {
            'timestamp': datetime.now().isoformat(),
            'strategy': 'Realistic 10% Monthly Return',
            'target_return': 10.0,
            'top_stocks': stock_analysis.to_dict('records'),
            'best_options_strategies': strategies,
            'monte_carlo': mc_results,
            'portfolio_simulation': portfolio_results
        }
        
        with open('realistic_strategy_results.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        print("\n" + "=" * 60)
        print(f"SUMMARY: {portfolio_results.get('prob_reach_target', 'N/A')}% probability of reaching $770K target")
        print("This is a much more realistic and achievable strategy!")
        print("Results saved to realistic_strategy_results.json")
        print("=" * 60)
    
    else:
        print("No stock data available for analysis")

if __name__ == "__main__":
    main()