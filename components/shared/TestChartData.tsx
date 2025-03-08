"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TestData {
  id: number;
  test_name: string;
  timestamp: string;
  temperature: number;
  speed: number;
  altitude: number;
  passed: boolean;
}

export default function TestDataChart({ initialData }: { initialData: TestData[] }) {
  const [data, setData] = useState<TestData[]>(initialData);

  useEffect(() => {
    const socket = new WebSocket("ws://3.12.149.25:8000/ws/test-data");

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    return () => socket.close();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
        <Line type="monotone" dataKey="speed" stroke="#387908" name="Speed (m/s)" />
        <Line type="monotone" dataKey="altitude" stroke="#8884d8" name="Altitude (m)" />
      </LineChart>
    </ResponsiveContainer>
  );
}
