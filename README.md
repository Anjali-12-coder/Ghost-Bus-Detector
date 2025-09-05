Ghost Bus Detector 🚍👻

A real-time bus tracking system that detects ghost buses (inactive buses) using GTFS feeds and realtime CSV data, visualized on an interactive map with React.js + Leaflet.

Features:

Real-time bus tracking from GTFS feeds (simple_gtfs/ and sample_gtfs/) + realtime.csv.

Ghost bus detection: Flags buses inactive beyond a threshold.

Interactive map with markers:

Green → Active bus

Red → Ghost bus

Simulator included for testing without live API.

Demo:(assets:demo.png)

Tech Stack

Backend: Python, FastAPI, Uvicorn

Frontend: React.js, Leaflet.js

Data: GTFS feeds (simple and sample) + realtime.csv

Installation
Backend
cd backend
python -m venv venv
# Activate environment
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload


Backend runs on: http://127.0.0.1:8000

Reads GTFS feeds from simple_gtfs/ and sample_gtfs/ and updates bus positions from realtime.csv.

Frontend
cd frontend
npm install
npm start


Frontend runs on: http://localhost:5175

Entry point: public/index.html

Folder Structure
ghost-bus-detector/
│
├─ backend/
│  ├─ app/
│  │  ├─ __init__.py         # Marks folder as Python package
│  │  ├─ main.py             # FastAPI entry point
│  │  ├─ ghost_detector.py   # Logic to detect ghost buses
│  │  └─ simulator.py        # Processes GTFS feeds + realtime.csv
│  ├─ requirements.txt
│  ├─ simple_gtfs/           # GTFS data for simple simulation
│  └─ sample_gtfs/           # Sample GTFS + realtime.csv
│
├─ frontend/
│  ├─ public/
│  │  └─ index.html           # Frontend entry point
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ BusMap.jsx
│  │  └─ index.js
│  └─ package.json
│
└─ assets/
   └─ demo.png               # Demo screenshot


How It Works:

Backend reads GTFS feeds (simple_gtfs/ or sample_gtfs/) and realtime.csv.

ghost_detector.py flags buses inactive beyond a threshold as ghost.

simulator.py updates bus positions for simulation.

Frontend fetches backend data and renders buses on an interactive map.

Note:
No dummy data is used. All data comes from GTFS feeds + realtime.csv.
Ghost detection threshold can be adjusted in ghost_detector.py.

Future Improvements:

Integrate with live transit APIs for real-time detection.

Display bus routes on the map.

Alerts/notifications for ghost buses.

Frontend optimization for large bus networks with clustering.


✅ Usage: Start backend and frontend, open the frontend in your browser, and watch buses classified as active vs ghost in real-time.
