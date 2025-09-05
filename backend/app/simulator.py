from datetime import datetime, timedelta
import random

def get_current_buses():
    now = datetime.utcnow()
    buses = []

    # Active buses (last_seen <= 15 min)
    for i in range(1, 6):
        buses.append({
            "id": i,
            "route": f"KSRTC-10{i}",
            "lat": 12.97 + random.uniform(0, 0.02),  # Karnataka area
            "lon": 77.59 + random.uniform(0, 0.02),
            "last_seen": (now - timedelta(minutes=random.randint(0, 10))).isoformat()
        })

    # Ghost buses (last_seen > 15 min)
    for i in range(6, 11):
        buses.append({
            "id": i,
            "route": f"KSRTC-10{i}",
            "lat": 12.97 + random.uniform(0, 0.02),
            "lon": 77.59 + random.uniform(0, 0.02),
            "last_seen": (now - timedelta(minutes=random.randint(16, 30))).isoformat()
        })

    return buses
