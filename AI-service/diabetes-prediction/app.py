# Import necessary libraries
import pandas as pd
import numpy as np
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import GradientBoostingClassifier
from imblearn.over_sampling import SMOTE  # Import SMOTE for handling imbalance
import warnings

# Suppress specific FutureWarnings
warnings.filterwarnings("ignore", category=FutureWarning, module="sklearn.utils.validation")

# Load the dataset (dummy dataset for demonstration)
df_initial = pd.DataFrame({
    'gender': ['Male', 'Female', 'Male', 'Female', 'Male', 'Female'],
    'age': [45, 35, 50, 40, 55, 45],
    'hypertension': [0, 1, 1, 0, 1, 0],
    'heart_disease': [0, 1, 0, 1, 1, 0],
    'smoking_history': ['Never', 'Former', 'Never', 'Never', 'Former', 'Never'],
    'bmi': [25.0, 28.0, 26.0, 27.5, 29.0, 26.5],
    'HbA1c_level': [5.6, 6.2, 5.8, 6.0, 5.9, 6.1],
    'blood_glucose_level': [120.0, 140.0, 130.0, 135.0, 145.0, 125.0],
    'diabetes': [0, 1, 1, 0, 1, 0]
})

# Encode categorical variables
label_encoder = LabelEncoder()
df_initial['smoking_history'] = label_encoder.fit_transform(df_initial['smoking_history'])
df_initial['gender'] = label_encoder.fit_transform(df_initial['gender'])

# Convert 'age' to integer
df_initial['age'] = df_initial['age'].astype(int)

# Define target variable and feature matrix
y = df_initial['diabetes']
X = df_initial.drop(columns=['diabetes'])

# Standardize the features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X, y)

# Train-test split on the resampled data
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# Train the model
model = GradientBoostingClassifier(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

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
class DiabetesPredictionRequest(BaseModel):
    gender: int
    age: int
    hypertension: int
    heart_disease: int
    smoking_history: int
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

# Define the prediction endpoint
@app.post("/predict")
def predict_diabetes(request: DiabetesPredictionRequest):
    # Extract the input features from the request body
    input_data = np.array([[request.gender, request.age, request.hypertension, request.heart_disease, request.smoking_history, request.bmi, request.HbA1c_level, request.blood_glucose_level]])

    # Standardize the input features
    input_data = scaler.transform(input_data)

    # Make the prediction
    prediction = model.predict(input_data)
    prediction_probability = model.predict_proba(input_data)

    # Return the prediction result
    return {
        "prediction": int(prediction[0]),
        "probability": prediction_probability[0].tolist()
    }

# If running this script directly, start the FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8085)
