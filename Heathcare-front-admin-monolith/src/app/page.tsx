import { Metadata } from "next";
import React from "react";
import Signin from "@/components/Auth/Signin";
import Cookies from 'universal-cookie';

export const metadata: Metadata = {
  title:
    "HealthSec records",
  description: "Healthcare saas web app",
};

export default function Home() {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');

  return (
    <>  
      {/* {accessToken ? (
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
      ) : ( */}
        <div>
          <Signin />
        </div>
      {/* )} */}
    </>
  );
}
