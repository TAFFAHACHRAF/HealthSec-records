import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiMonitorCellphone } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import Divider from '../components/Divider'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'
import NotificationBar from '../components/NotificationBar'
import FormField from '../components/Form/Field'
import Buttons from '../components/Buttons'

const DiabetesPredictionPage = () => {
  const [predictionResult, setPredictionResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const response = await fetch('http://127.0.0.1:8001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch prediction')
      }

      const data = await response.json()
      setPredictionResult(data)
      setError(null)
    } catch (error) {
      setError(error.message)
      setPredictionResult(null)
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Diabetes Prediction')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Diabetes Prediction" main>
          <Button
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton>

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Predict your diabetes risk.</b> Fill in the form and get your prediction.
        </NotificationBar>

        <CardBox>
          <Formik
            initialValues={{
              gender: 0,
              age: 45,
              hypertension: 0,
              heart_disease: 0,
              smoking_history: 0, // Set default value to 'Never'
              bmi: 25.0,
              HbA1c_level: 5.6,
              blood_glucose_level: 120.0,
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormField>
                  <FormField label="Gender" labelFor="gender">
                    <Field name="gender" id="gender" component="select">
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                    </Field>
                  </FormField>
                  <FormField label="Age" labelFor="age">
                    <Field name="age" type="number" id="age" placeholder="Age" />
                  </FormField>
                </FormField>

                <FormField>
                  <FormField label="Hypertension" labelFor="hypertension">
                    <Field name="hypertension" type="number" id="hypertension" placeholder="Hypertension (0 or 1)" />
                  </FormField>

                  <FormField label="Heart Disease" labelFor="heart_disease">
                    <Field name="heart_disease" type="number" id="heart_disease" placeholder="Heart Disease (0 or 1)" />
                  </FormField>
                </FormField>
                
                <FormField>
                  <FormField label="Smoking History" labelFor="smoking_history">
                    <Field name="smoking_history" id="smoking_history" as="select">
                      <option value="0">Never</option>
                      <option value="1">Ever</option>
                      <option value="2">Former</option>
                      <option value="3">Current</option>
                    </Field>
                  </FormField>

                  <FormField label="BMI" labelFor="bmi">
                    <Field name="bmi" type="number" step="0.1" id="bmi" placeholder="BMI" />
                  </FormField>
                </FormField>
                
                <FormField>
                  <FormField label="HbA1c Level" labelFor="HbA1c_level">
                    <Field name="HbA1c_level" type="number" step="0.1" id="HbA1c_level" placeholder="HbA1c Level" />
                  </FormField>

                  <FormField label="Blood Glucose Level" labelFor="blood_glucose_level">
                    <Field name="blood_glucose_level" type="number" step="0.1" id="blood_glucose_level" placeholder="Blood Glucose Level" />
                  </FormField>
                </FormField>
                
                <Divider />

                <Buttons>
                  <Button type="submit" color="info" label="Predict" disabled={isSubmitting} />
                </Buttons>
              </Form>
            )}
          </Formik>
        </CardBox>

        {error && (
          <NotificationBar color="danger" icon={mdiMonitorCellphone}>
            <b>Error:</b> {error}
          </NotificationBar>
        )}

        {predictionResult && (
          <CardBox>
            <h3>Prediction Result</h3>
            <p><b>Prediction:</b> {predictionResult.prediction}</p>
            <p><b>Probability:</b> {JSON.stringify(predictionResult.probability)}</p>
          </CardBox>
        )}
      </SectionMain>
    </>
  )
}

DiabetesPredictionPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DiabetesPredictionPage
