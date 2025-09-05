from datetime import datetime, timezone, timedelta

GHOST_THRESHOLD_MINUTES = 15

def classify_buses(buses):
    now = datetime.utcnow().replace(tzinfo=timezone.utc)
    classified = []

    for bus in buses:
        last_seen = datetime.fromisoformat(bus["last_seen"])
        if last_seen.tzinfo is None:
            last_seen = last_seen.replace(tzinfo=timezone.utc)

        status = "active" if now - last_seen <= timedelta(minutes=GHOST_THRESHOLD_MINUTES) else "ghost"
        bus_copy = bus.copy()
        bus_copy["status"] = status
        classified.append(bus_copy)

    return classified
