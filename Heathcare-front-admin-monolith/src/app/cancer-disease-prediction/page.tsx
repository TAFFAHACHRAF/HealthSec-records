"use client"

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useState } from "react";
import Modal from 'react-modal';

interface PredictionResult {
  prediction: string;
  probability: number[];
}

const CancerPredictionForm = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [predictionData, setPredictionData] = useState({
    radius_mean: 14.3,
    texture_mean: 20.4,
    perimeter_mean: 85.1,
    area_mean: 500.5,
    smoothness_mean: 0.1,
    compactness_mean: 0.2,
    concavity_mean: 0.3,
    concave_points_mean: 0.15,
    symmetry_mean: 0.25,
    fractal_dimension_mean: 0.05,
    radius_se: 0.45,
    texture_se: 0.7,
    perimeter_se: 1.1,
    area_se: 30.5,
    smoothness_se: 0.005,
    compactness_se: 0.02,
    concavity_se: 0.03,
    concave_points_se: 0.012,
    symmetry_se: 0.025,
    fractal_dimension_se: 0.004,
    radius_worst: 17.5,
    texture_worst: 25.4,
    perimeter_worst: 110.7,
    area_worst: 900.2,
    smoothness_worst: 0.12,
    compactness_worst: 0.3,
    concavity_worst: 0.4,
    concave_points_worst: 0.2,
    symmetry_worst: 0.3,
    fractal_dimension_worst: 0.07
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    setPredictionData({
      ...predictionData,
      [name]: numericValue,
    });
  };

  const handleSubmit = async () => {
    console.log(predictionData);
    try {
      const response = await fetch('http://127.0.0.1:8084/predict', {
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

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        {/* Input Fields */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Disease Prediction
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            {Object.keys(predictionData).map((field) => (
              <div key={field}>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  {field.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </label>
                <input
                  type="number"
                  name={field}
                  value={(predictionData as any)[field]}
                  onChange={handleInputChange}
                  step="any"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
            >
              Predict Disease
            </button>

            {error && (
              <div className="mt-4 text-red-600">
                {error}
              </div>
            )}
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
        <div className="bg-white p-6 rounded-md shadow-md dark:bg-gray-dark">
          <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white">Prediction Result</h2>
          {predictionResult && (
            <div>
              <p className="text-lg text-body">{predictionResult.prediction}</p>
              <p className="mt-2 text-sm text-gray-600">
                Probability: {predictionResult.probability[1].toFixed(2)}%
              </p>
            </div>
          )}
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-4 rounded-md bg-primary py-2 px-4 text-white transition duration-300 hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default CancerPredictionForm;
