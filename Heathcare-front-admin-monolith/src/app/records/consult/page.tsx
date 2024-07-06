import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UpdateRecordForm from "@/components/UpdateRecordForm";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const UpdatePage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Consult patient record" url=""/>
      <UpdateRecordForm />
    </DefaultLayout>
  );
};

export default UpdatePage;
