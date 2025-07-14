from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os
from typing import List, Dict

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model_path = os.path.join(os.path.dirname(__file__), "random_forest_model.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)

# Define feature names in the correct order (as used during training)
FEATURE_NAMES = ['N', 'P', 'K', 'temperature', 'humidity', 'ph']

class SoilData(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float

class CropPrediction(BaseModel):
    crop: str
    probability: float

@app.post("/predict", response_model=Dict[str, List[CropPrediction]])
async def predict_crop(data: SoilData):
    # Convert input data to numpy array with proper feature names
    features = np.array([[
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
    ]])
    
    # Get probabilities for all classes
    probabilities = model.predict_proba(features)[0]
    
    # Get class labels
    classes = model.classes_
    
    # Combine classes with their probabilities and sort by probability (descending)
    crop_probs = sorted(zip(classes, probabilities), key=lambda x: x[1], reverse=True)
    
    # Get top 5 crops with their probabilities
    top_crops = [
        {"crop": crop, "probability": float(prob)} 
        for crop, prob in crop_probs[:5]
    ]
    
    return {"recommended_crops": top_crops}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)