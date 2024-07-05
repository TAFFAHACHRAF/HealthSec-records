import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddDoctorForm from "@/components/AddDoctorForm";

export const metadata: Metadata = {
  title:
    "HealthSec records",
  description: "Healthcare saas web app",
};

const UpdatePage = () => {
  return (
    <DefaultLayout>
      <AddDoctorForm />
    </DefaultLayout>
  );
};

export default UpdatePage;
