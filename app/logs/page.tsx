"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/lib/api";
import Navbar from "@/components/shared/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogsPage() {

    const router = useRouter()

    useEffect(() => {
        console.log("auth is:", auth)
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push("/login");
          }
        });
      }, [router]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["auditLogs"],
        queryFn: getAuditLogs,
    });

    if (isLoading) return <p>Loading logs...</p>;
    if (error) return (<p className="text-red-500">Error fetching logs</p>);

    return (
        <div>
            <Navbar />
            <h1 className="text-2xl font-bold p-4">Audit Logs</h1>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Action</th>
                        <th className="border p-2">Timestamp</th>
                        <th className="border p-2">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((log: any, index: number) => (
                        <tr key={index} className="border">
                            <td className="border p-2">{log.user_id}</td>
                            <td className="border p-2">{log.action}</td>
                            <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
                            <td className="border p-2">{log.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
