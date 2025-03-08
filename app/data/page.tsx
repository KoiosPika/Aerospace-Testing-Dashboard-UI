"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTestData } from "../../lib/api";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import DataTable from "@/components/shared/DataTable";
import TestDataChart from "@/components/shared/TestChartData";
import TestFilter from "@/components/shared/TestFilter";

export default function DataPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [filters, setFilters] = useState({
    testName: "",
    startDate: "",
    endDate: "",
    minTemperature: "",
    maxTemperature: "",
    minSpeed: "",
    maxSpeed: "",
    minAltitude: "",
    maxAltitude: "",
    passed: "",
    sortBy: "timestamp",
    order: "desc",
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    console.log("auth is:", auth)
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    });
  }, [router]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["testData", filters],
    queryFn: () => getTestData(filters),
    enabled: !!user,
  });

  const handleDownloadReport = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/test-data/report`, "_blank");
  };

  if (!user) return <p className="text-center p-4">Redirecting to login...</p>;
  if (isLoading) return <p className="text-center p-4">Loading...</p>;
  if (error){
    console.log(error)
    return <p className="text-center p-4 text-red-500">Error loading data.</p>; 
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold p-4">Test Data Visualization</h1>
      <div className="p-4">
        <TestFilter filters={filters} setFilters={setFilters} refetch={refetch} />
      </div>
      <div className="p-4">
        <TestDataChart initialData={data} />
      </div>
      <h2 className="text-xl font-bold p-4">Test Data Table</h2>
      <div className="p-4">
        <DataTable data={data} />
      </div>
      <div className="flex justify-center items-center w-full p-4">
        <button onClick={handleDownloadReport} className="bg-blue-500 text-white px-4 py-2 rounded place-self-center cursor-pointer">
          Download Report
        </button>
      </div>
    </div>
  );
}