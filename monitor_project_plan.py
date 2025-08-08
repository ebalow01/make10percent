import time
import os
from datetime import datetime

def read_project_plan():
    """Read and return the contents of project_plan.txt"""
    file_path = r"C:\Users\ebalo\claude_stuff\project_plan.txt"
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return "Project plan file not found"
    except Exception as e:
        return f"Error reading file: {e}"

def check_for_updates(previous_content):
    """Check if the project plan has been updated"""
    current_content = read_project_plan()
    
    if current_content != previous_content:
        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] PROJECT PLAN UPDATED!")
        print("-" * 50)
        print(current_content)
        print("-" * 50)
        return current_content
    else:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] No changes detected - idle")
        return previous_content

def main():
    print("Starting project plan monitor...")
    print("Checking for updates every 60 seconds")
    print("Press Ctrl+C to stop monitoring\n")
    
    # Initial read
    previous_content = read_project_plan()
    print(f"Initial project plan content:")
    print("-" * 50)
    print(previous_content)
    print("-" * 50)
    
    try:
        while True:
            time.sleep(60)  # Wait 60 seconds
            previous_content = check_for_updates(previous_content)
    except KeyboardInterrupt:
        print("\n\nMonitoring stopped by user")

if __name__ == "__main__":
    main()