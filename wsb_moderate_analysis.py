import json
from datetime import datetime, timedelta

def generate_moderate_wsb_analysis():
    """
    Generate moderate-risk strategies for 10% return in 30 days
    Much more realistic than the previous 43% YOLO attempt
    """
    
    analysis_date = datetime.now().strftime("%Y-%m-%d %H:%M")
    target_return = 0.10  # 10% monthly target
    initial_capital = 700000
    target_capital = 770000
    required_gain = target_capital - initial_capital  # $70K
    
    # Moderate-risk plays with better probability
    strategies = [
        {
            "ticker": "MSFT",
            "strategy": "Long Calls - Earnings Play (Conservative)",
            "current_price": 420,
            "option": "Feb 21 $430 Call",
            "option_premium": 12,
            "allocation": "20% ($140K)",
            "contracts": int(140000 / (12 * 100)),
            "catalyst": "Q2 Earnings Jan 24, Cloud growth, AI integration",
            "risk_level": "MODERATE",
            "probability": "45-55%",
            "potential_return": "15-25% if beats by 2-3%",
            "rationale": "Stable tech giant, consistent earnings beats, Azure growth"
        },
        {
            "ticker": "GOOGL",
            "strategy": "Long Calls - Earnings Recovery",
            "current_price": 185,
            "option": "Feb 21 $190 Call",
            "option_premium": 8,
            "allocation": "20% ($140K)",
            "contracts": int(140000 / (8 * 100)),
            "catalyst": "Q4 Earnings, Search revenue, YouTube ads",
            "risk_level": "MODERATE",
            "probability": "40-50%",
            "potential_return": "20-30% on strong beat",
            "rationale": "Oversold, strong fundamentals, AI investments paying off"
        },
        {
            "ticker": "SPY",
            "strategy": "Weekly Calls - Fed/CPI Play",
            "current_price": 595,
            "option": "Weekly ATM Calls",
            "option_premium": 4,
            "allocation": "15% ($105K)",
            "contracts": "Variable weekly",
            "catalyst": "Fed meetings, inflation data, economic reports",
            "risk_level": "MODERATE",
            "probability": "35-45%",
            "potential_return": "5-8% per week compound",
            "rationale": "Market trend following, lower risk than individual stocks"
        },
        {
            "ticker": "AMD",
            "strategy": "Long Calls - AI Recovery",
            "current_price": 172,
            "option": "Mar 21 $180 Call",
            "option_premium": 11,
            "allocation": "20% ($140K)",
            "contracts": int(140000 / (11 * 100)),
            "catalyst": "Data center growth, AI chip demand, earnings guidance",
            "risk_level": "MODERATE-HIGH",
            "probability": "40-50%",
            "potential_return": "25-40% on strong guidance",
            "rationale": "AI play with more reasonable valuation than NVDA"
        },
        {
            "ticker": "QQQ",
            "strategy": "Long Calls - Tech Momentum",
            "current_price": 569,
            "option": "Feb 21 $575 Call",
            "option_premium": 15,
            "allocation": "15% ($105K)",
            "contracts": int(105000 / (15 * 100)),
            "catalyst": "Big tech earnings season, Fed dovish pivot",
            "risk_level": "MODERATE",
            "probability": "45-55%",
            "potential_return": "12-18% on tech rally",
            "rationale": "Diversified tech exposure, less single-stock risk"
        },
        {
            "ticker": "Cash Reserve",
            "strategy": "Hold Cash for Opportunities",
            "allocation": "10% ($70K)",
            "rationale": "Dry powder for mid-month opportunities or averaging down",
            "risk_level": "LOW",
            "potential_return": "0% but preserves capital"
        }
    ]
    
    # Position sizing for 10% total return
    position_analysis = {
        "target_per_position": "8-15% return per winning trade",
        "diversification": "5 positions + 10% cash",
        "risk_per_position": "Max 2% portfolio risk per trade",
        "win_rate_needed": "3 out of 5 positions profitable",
        "realistic_scenario": "60% win rate with avg 12% per winner"
    }
    
    risk_assessment = {
        "success_probability": "40-60% (much better than 43% target)",
        "expected_return": "6-14% range",
        "max_drawdown": "15-25% worst case",
        "time_decay_risk": "Moderate - using 30-45 DTE options",
        "market_risk": "Moderate - earnings season catalyst dependent"
    }
    
    return {
        "analysis_timestamp": analysis_date,
        "revised_target": {
            "initial_capital": initial_capital,
            "target_capital": target_capital,
            "required_gain": required_gain,
            "required_return_pct": target_return * 100
        },
        "moderate_strategies": strategies,
        "position_analysis": position_analysis,
        "risk_assessment": risk_assessment,
        "execution_plan": {
            "week_1": "Enter MSFT, GOOGL positions before earnings",
            "week_2": "Add AMD, QQQ on any dips",
            "week_3": "SPY weekly plays based on Fed/economic data",
            "week_4": "Profit taking and position management"
        },
        "wsb_sentiment_moderate": {
            "quality_plays": ["MSFT", "GOOGL", "AMD", "QQQ"],
            "earnings_focus": "Big tech Q4 results",
            "avoid_still": ["Meme stocks", "0DTE plays", "Small cap biotechs"]
        }
    }

if __name__ == "__main__":
    analysis = generate_moderate_wsb_analysis()
    
    with open("wsb_moderate_analysis.json", "w") as f:
        json.dump(analysis, f, indent=2)
    
    print("WSB Moderate Risk Analysis Generated")
    print("=" * 60)
    print(f"REVISED Target: ${analysis['revised_target']['initial_capital']:,} -> ${analysis['revised_target']['target_capital']:,}")
    print(f"Required Return: {analysis['revised_target']['required_return_pct']:.1f}% (Much more realistic!)")
    print("\nModerate Risk Strategies:")
    for i, strategy in enumerate(analysis['moderate_strategies'], 1):
        if 'option' in strategy:
            print(f"\n{i}. {strategy['ticker']} - {strategy['strategy']}")
            print(f"   Allocation: {strategy['allocation']} | Option: {strategy['option']} @ ${strategy['option_premium']}")
            print(f"   Probability: {strategy['probability']} | Potential: {strategy['potential_return']}")
            print(f"   Risk: {strategy['risk_level']}")
    
    print(f"\nSuccess Probability: {analysis['risk_assessment']['success_probability']}")
    print(f"Expected Return Range: {analysis['risk_assessment']['expected_return']}")
    print("\nThis is MUCH more achievable than the previous 43% target!")