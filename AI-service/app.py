# Import necessary libraries
import pandas as pd
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import GradientBoostingClassifier
import warnings

# Suppress specific FutureWarnings
warnings.filterwarnings("ignore", category=FutureWarning, module="sklearn.utils.validation")

# Load the dataset
df_initial = pd.read_csv("./diabetes_prediction_dataset.csv")

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

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = GradientBoostingClassifier(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

# Define the FastAPI app
app = FastAPI()

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
    uvicorn.run(app, host="0.0.0.0", port=8001)
