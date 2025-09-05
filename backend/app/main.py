from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .simulator import get_current_buses
from .ghost_detector import classify_buses

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/buses")
def get_buses():
    buses = get_current_buses()
    classified = classify_buses(buses)
    return classified
