# controller.py

import pandas as pd
from joblib import load
from fastapi import APIRouter, HTTPException, Depends
from entities.Symptoms import Symptoms

router = APIRouter()

# Service layer function to predict disease based on symptoms
def Predicted_Disease(symptoms: Symptoms):
    try:
        # Prepare Test Data
        df_test = pd.DataFrame([symptoms.dict()])

        # Load pre-trained model
        clf = load("./saved_model/decision_tree.joblib")
        result = clf.predict(df_test)
        return {'predicted_disease': result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

# Endpoint to handle POST requests with symptom data
@router.post("/")
async def send_data(symptoms: Symptoms):
    try:
        output = Predicted_Disease(symptoms)
        return output
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
