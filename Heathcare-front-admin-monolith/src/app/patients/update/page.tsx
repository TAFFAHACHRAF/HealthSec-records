import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UpdatePatientForm from "@/components/UpdatePatientForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const UpdatePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update patient" url=""/>
      <UpdatePatientForm />
    </DefaultLayout>
  );
};

export default UpdatePage;
