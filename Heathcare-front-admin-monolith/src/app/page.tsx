import { Metadata } from "next";
import React from "react";
import Signin from "@/components/Auth/Signin";
import Cookies from 'universal-cookie';

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
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