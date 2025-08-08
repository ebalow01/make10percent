import time
import os
from datetime import datetime

PROJECT_PLAN_PATH = r"C:\Users\ebalo\claude_stuff\project_plan.txt"
LAST_MODIFIED = None
LAST_CONTENT = None

def check_project_plan():
    global LAST_MODIFIED, LAST_CONTENT
    
    if not os.path.exists(PROJECT_PLAN_PATH):
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Project plan not found")
        return False
    
    current_modified = os.path.getmtime(PROJECT_PLAN_PATH)
    
    with open(PROJECT_PLAN_PATH, 'r') as f:
        current_content = f.read()
    
    if LAST_MODIFIED is None:
        LAST_MODIFIED = current_modified
        LAST_CONTENT = current_content
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Initial check - monitoring started")
        return False
    
    if current_modified != LAST_MODIFIED or current_content != LAST_CONTENT:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] PROJECT PLAN UPDATED!")
        print("=" * 50)
        print(current_content)
        print("=" * 50)
        LAST_MODIFIED = current_modified
        LAST_CONTENT = current_content
        return True
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] No changes detected")
    return False

def main():
    print("WSB Agent Monitor - Checking project_plan.txt every 60 seconds")
    print("Press Ctrl+C to stop monitoring")
    
    while True:
        try:
            check_project_plan()
            time.sleep(60)
        except KeyboardInterrupt:
            print("\nMonitoring stopped")
            break
        except Exception as e:
            print(f"Error: {e}")
            time.sleep(60)

if __name__ == "__main__":
    main()