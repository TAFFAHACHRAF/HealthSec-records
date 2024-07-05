import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UpdateDoctorForm from "@/components/UpdateDoctorForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const UpdatePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update doctor" url=""/>
      <UpdateDoctorForm />
    </DefaultLayout>
  );
};

export default UpdatePage;
