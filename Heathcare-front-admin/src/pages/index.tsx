import React, { useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Button from '../components/Button';
import CardBox from '../components/CardBox';
import SectionFullScreen from '../components/Section/FullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '../components/Form/Field';
import FormCheckRadio from '../components/Form/CheckRadio';
import Divider from '../components/Divider';
import Buttons from '../components/Buttons';
import { useRouter } from 'next/router';
import { getPageTitle } from '../config';
import Cookies from 'universal-cookie';

type LoginForm = {
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  role: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const cookies = new Cookies();

  const handleSubmit = async (formValues: LoginForm) => {
    try {
      const response = await fetch('http://localhost:8082/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Authentication failed');
        return;
      }

      const data: AuthResponse = await response.json();

      // Save access token to cookie with 7 days expiration
      cookies.set('accessToken', data.access_token, { path: '/', maxAge: 60 * 60 * 24 * 7 });

      alert(`Logged in as ${data.role}`);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to authenticate. Please try again.');
    }
  };

  const initialValues: LoginForm = {
    email: 'taffahadchaf184@gmail.com',
    password: 'achrddaf1234@',
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <FormField label="Email" help="Please enter your email">
                <Field name="email" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" type="password" />
              </FormField>

              <Divider />

              <Buttons>
                <Button type="submit" label="Login" color="info" />
                <Button href="/dashboard" label="Home" color="info" outline />
              </Buttons>
            </Form>
          </Formik>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardBox>
      </SectionFullScreen>
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default LoginPage;
