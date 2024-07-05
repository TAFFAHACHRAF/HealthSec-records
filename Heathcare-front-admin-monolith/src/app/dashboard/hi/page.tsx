import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import HIDashboardComponent from "@/components/Dashboard/HIDashboardComponent copy";

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
        <Breadcrumb pageName="Helathcare institution dashboard" url=""/>

        <HIDashboardComponent />
        </div>
    </DefaultLayout>
    </>
  );
}

export default DoctorDashboard;

