import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminDashboardComponent from "@/components/Dashboard/AdminDashboardComponent";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

const DoctorDashboard = () => {

  return (
    <>  
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[970px]">
        <Breadcrumb pageName="Admin dashboard" />

        <AdminDashboardComponent />
        </div>
    </DefaultLayout>
    </>
  );
}

export default DoctorDashboard;
