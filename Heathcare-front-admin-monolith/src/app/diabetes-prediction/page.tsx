"use client";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState } from "react";
import Modal from 'react-modal';

// Define interface for prediction result
interface PredictionResult {
  prediction: number; // Assuming prediction is a number (0 or 1)
  probability: number[]; // Array of probabilities
}

// Set the app element for accessibility
// Set the app element for accessibility
// if (typeof window !== 'undefined') {
//   Modal.setAppElement('#__next');
// }

const FormElementsPage = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [predictionData, setPredictionData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPredictionData({
      ...predictionData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(predictionData);
    try {
      const response = await fetch('http://127.0.0.1:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(predictionData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data: PredictionResult = await response.json();
      setPredictionResult(data);
      setError(null);
      setModalIsOpen(true); // Open the modal on successful prediction
    } catch (error: any) {
      setError(error.message);
      setPredictionResult(null);
    }
  };

  // Determine which icon to display based on predictionResult
  const getDiabetesIcon = () => {
    if (!predictionResult) return null;

    const prediction = predictionResult.prediction;

    // Assuming 1 indicates positive prediction and 0 indicates negative
    if (prediction === 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    } else if (prediction === 0) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    } else {
      return null; // Handle other cases or errors
    }
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols">
        <div className="flex flex-col gap-9">
          {/* Input Fields */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              {["gender", "age", "hypertension", "heart_disease", "smoking_history", "bmi", "HbA1c_level", "blood_glucose_level"].map((field) => (
                <div key={field}>
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    {field.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={(predictionData as any)[field]}
                    onChange={handleInputChange}
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  />
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
              >
                Predict Diabetes
              </button>

              {error && (
                <div className="mt-4 text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for prediction result */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Prediction Result"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Prediction Result</h2>
          {predictionResult && (
            <div className="mt-4 text-green-600">
              <div>
                <strong>Prediction:</strong> {predictionResult.prediction}
              </div>
              <div>
                <strong>Probabilities:</strong> {predictionResult.probability.join(", ")}
              </div>
              <div>
                {getDiabetesIcon()}
              </div>
            </div>
          )}
          <button
            onClick={() => {
              setModalIsOpen(false);  // Close the modal
              window.location.reload();  // Reload the page
            }}
            className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default FormElementsPage;
