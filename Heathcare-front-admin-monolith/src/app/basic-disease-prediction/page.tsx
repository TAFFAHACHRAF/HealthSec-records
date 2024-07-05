"use client"

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useState } from "react";
import Modal from 'react-modal';

interface PredictionResult {
  predicted_disease: string;
}

const DiseasePredictionForm = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [predictionData, setPredictionData] = useState({
    itching: 0,
    skin_rash: 0,
    nodal_skin_eruptions: 0,
    continuous_sneezing: 0,
    shivering: 0,
    chills: 0,
    joint_pain: 0,
    stomach_pain: 0,
    acidity: 0,
    ulcers_on_tongue: 0,
    muscle_wasting: 0,
    vomiting: 0,
    burning_micturition: 0,
    spotting_urination: 0,
    fatigue: 0,
    weight_gain: 0,
    anxiety: 0,
    cold_hands_and_feets: 0,
    mood_swings: 0,
    weight_loss: 0,
    restlessness: 0,
    lethargy: 0,
    patches_in_throat: 0,
    irregular_sugar_level: 0,
    cough: 0,
    high_fever: 0,
    sunken_eyes: 0,
    breathlessness: 0,
    sweating: 0,
    dehydration: 0,
    indigestion: 0,
    headache: 0,
    yellowish_skin: 0,
    dark_urine: 0,
    nausea: 0,
    loss_of_appetite: 0,
    pain_behind_the_eyes: 0,
    back_pain: 0,
    constipation: 0,
    abdominal_pain: 0,
    diarrhoea: 0,
    mild_fever: 0,
    yellow_urine: 0,
    yellowing_of_eyes: 0,
    acute_liver_failure: 0,
    fluid_overload: 0,
    swelling_of_stomach: 0,
    swelled_lymph_nodes: 0,
    malaise: 0,
    blurred_and_distorted_vision: 0,
    phlegm: 0,
    throat_irritation: 0,
    redness_of_eyes: 0,
    sinus_pressure: 0,
    runny_nose: 0,
    congestion: 0,
    chest_pain: 0,
    weakness_in_limbs: 0,
    fast_heart_rate: 0,
    pain_during_bowel_movements: 0,
    pain_in_anal_region: 0,
    bloody_stool: 0,
    irritation_in_anus: 0,
    neck_pain: 0,
    dizziness: 0,
    cramps: 0,
    bruising: 0,
    obesity: 0,
    swollen_legs: 0,
    swollen_blood_vessels: 0,
    puffy_face_and_eyes: 0,
    enlarged_thyroid: 0,
    brittle_nails: 0,
    swollen_extremities: 0,
    excessive_hunger: 0,
    extra_marital_contacts: 0,
    drying_and_tingling_lips: 0,
    slurred_speech: 0,
    knee_pain: 0,
    hip_joint_pain: 0,
    muscle_weakness: 0,
    stiff_neck: 0,
    swelling_joints: 0,
    movement_stiffness: 0,
    spinning_movements: 0,
    loss_of_balance: 0,
    unsteadiness: 0,
    weakness_of_one_body_side: 0,
    loss_of_smell: 0,
    bladder_discomfort: 0,
    foul_smell_of_urine: 0,
    continuous_feel_of_urine: 0,
    passage_of_gases: 0,
    internal_itching: 0,
    toxic_look_typhos: 0,
    depression: 0,
    irritability: 0,
    muscle_pain: 0,
    altered_sensorium: 0,
    red_spots_over_body: 0,
    belly_pain: 0,
    abnormal_menstruation: 0,
    dischromic_patches: 0,
    watering_from_eyes: 0,
    increased_appetite: 0,
    polyuria: 0,
    family_history: 0,
    mucoid_sputum: 0,
    rusty_sputum: 0,
    lack_of_concentration: 0,
    visual_disturbances: 0,
    receiving_blood_transfusion: 0,
    receiving_unsterile_injections: 0,
    coma: 0,
    stomach_bleeding: 0,
    distention_of_abdomen: 0,
    history_of_alcohol_consumption: 0,
    fluid_overload_1: 0,
    blood_in_sputum: 0,
    prominent_veins_on_calf: 0,
    palpitations: 0,
    painful_walking: 0,
    pus_filled_pimples: 0,
    blackheads: 0,
    scurring: 0,
    skin_peeling: 0,
    silver_like_dusting: 0,
    small_dents_in_nails: 0,
    inflammatory_nails: 0,
    blister: 0,
    red_sore_around_nose: 0,
    yellow_crust_ooze: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "yes" ? 1 : 0;

    setPredictionData({
      ...predictionData,
      [name]: numericValue,
    });
  };

  const handleSubmit = async () => {
    console.log(predictionData);
    try {
      const response = await fetch('http://localhost:8083/', {
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
                <select
                  name={field}
                  value={(predictionData as any)[field] ? "yes" : "no"}
                  onChange={handleInputChange}
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
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
              <p className="text-lg text-body">{predictionResult.predicted_disease}</p>
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

export default DiseasePredictionForm;
