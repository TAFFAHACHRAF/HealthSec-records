# app.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
import numpy as np
from data.data import load_dataset, preprocess_data
from model.model import train_model

# Define the FastAPI app
app = FastAPI()

# Define CORS configuration
origins = [
    "http://localhost:3000",  # Replace with your frontend URL
    "https://localhost:3000",  # Add more origins as needed
]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Define the request body schema
class CancerPredictionRequest(BaseModel):
    radius_mean: float = Field(..., ge=0.0)
    texture_mean: float = Field(..., ge=0.0)
    perimeter_mean: float = Field(..., ge=0.0)
    area_mean: float = Field(..., ge=0.0)
    smoothness_mean: float = Field(..., ge=0.0)
    compactness_mean: float = Field(..., ge=0.0)
    concavity_mean: float = Field(..., ge=0.0)
    concave_points_mean: float = Field(..., ge=0.0)
    symmetry_mean: float = Field(..., ge=0.0)
    fractal_dimension_mean: float = Field(..., ge=0.0)
    radius_se: float = Field(..., ge=0.0)
    texture_se: float = Field(..., ge=0.0)
    perimeter_se: float = Field(..., ge=0.0)
    area_se: float = Field(..., ge=0.0)
    smoothness_se: float = Field(..., ge=0.0)
    compactness_se: float = Field(..., ge=0.0)
    concavity_se: float = Field(..., ge=0.0)
    concave_points_se: float = Field(..., ge=0.0)
    symmetry_se: float = Field(..., ge=0.0)
    fractal_dimension_se: float = Field(..., ge=0.0)
    radius_worst: float = Field(..., ge=0.0)
    texture_worst: float = Field(..., ge=0.0)
    perimeter_worst: float = Field(..., ge=0.0)
    area_worst: float = Field(..., ge=0.0)
    smoothness_worst: float = Field(..., ge=0.0)
    compactness_worst: float = Field(..., ge=0.0)
    concavity_worst: float = Field(..., ge=0.0)
    concave_points_worst: float = Field(..., ge=0.0)
    symmetry_worst: float = Field(..., ge=0.0)
    fractal_dimension_worst: float = Field(..., ge=0.0)

    @validator('*')
    def check_non_negative(cls, v):
        if v < 0:
            raise ValueError('Value must be non-negative')
        return v

@app.post("/predict")
def predict_cancer(request: CancerPredictionRequest):
    try:
        # Load and preprocess the dataset
        cancer = load_dataset('./dataset/Cancer.csv')
        X_train, X_test, y_train, y_test, label_encoder, scaler = preprocess_data(cancer)

        # Train the model
        model = train_model(X_train, y_train)

        # Extract the input features from the request body
        input_data = np.array([[
            request.radius_mean, request.texture_mean, request.perimeter_mean, request.area_mean,
            request.smoothness_mean, request.compactness_mean, request.concavity_mean, request.concave_points_mean,
            request.symmetry_mean, request.fractal_dimension_mean, request.radius_se, request.texture_se,
            request.perimeter_se, request.area_se, request.smoothness_se, request.compactness_se,
            request.concavity_se, request.concave_points_se, request.symmetry_se, request.fractal_dimension_se,
            request.radius_worst, request.texture_worst, request.perimeter_worst, request.area_worst,
            request.smoothness_worst, request.compactness_worst, request.concavity_worst, request.concave_points_worst,
            request.symmetry_worst, request.fractal_dimension_worst
        ]])

        # Standardize the input features
        input_data = scaler.transform(input_data)

        # Make the prediction
        prediction = model.predict(input_data)
        prediction_probability = model.predict_proba(input_data)

        # Decode the prediction
        prediction_label = label_encoder.inverse_transform(prediction)[0]

        # Determine if the prediction is benign or malignant
        diagnosis = "benign" if prediction_label == 'B' else "malignant"

        # Return the prediction result
        return {
            "prediction": diagnosis,
            "probability": prediction_probability[0].tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# If running this script directly, start the FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8084)
