"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'universal-cookie';
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DoctorDataStatsOne from "@/components/DataStats/DoctorDataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";

const DoctorDashboardComponent: React.FC = () => {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const accessToken = cookies.get('accessToken');
    const userId = cookies.get('userId');

    if (!accessToken || !userId) {
      setIsAuthenticated(false);
      window.location.href='/login'; 
    }
  }, [cookies]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <DoctorDataStatsOne />
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
            <ChartOne />
            <ChartTwo />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default DoctorDashboardComponent;
