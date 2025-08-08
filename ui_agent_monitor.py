import time
import os
from datetime import datetime

def check_project_plan():
    """Check project_plan.txt for updates and changes"""
    project_plan_path = r"C:\Users\ebalo\claude_stuff\project_plan.txt"
    
    if not os.path.exists(project_plan_path):
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] project_plan.txt not found")
        return None
    
    try:
        with open(project_plan_path, 'r') as f:
            content = f.read()
        return content
    except Exception as e:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Error reading project_plan.txt: {e}")
        return None

def monitor_project_plan():
    """Monitor project_plan.txt every 60 seconds"""
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] UI Agent Monitor started")
    print("Monitoring project_plan.txt every 60 seconds...")
    print("Press Ctrl+C to stop monitoring\n")
    
    last_content = None
    
    while True:
        try:
            current_content = check_project_plan()
            
            if current_content and current_content != last_content:
                print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Project plan updated!")
                print("-" * 50)
                
                if last_content:
                    print("New changes detected in project_plan.txt")
                else:
                    print("Initial project plan loaded")
                
                last_content = current_content
                
                # Check for TODO items assigned to UI agent
                if "UI Agent:" in current_content or "ui-agent:" in current_content.lower():
                    print("✓ Found tasks for UI Agent - review project_plan.txt for details")
            
            time.sleep(60)  # Wait 60 seconds before next check
            
        except KeyboardInterrupt:
            print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Monitoring stopped by user")
            break
        except Exception as e:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Error: {e}")
            time.sleep(60)

if __name__ == "__main__":
    monitor_project_plan()