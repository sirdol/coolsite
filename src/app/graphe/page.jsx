'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function GraphPage() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/machines');
        const data = await res.json();
        if (Array.isArray(data)) {
          setMachines(data);
        } else {
          setMachines([]);
        }
      } catch (err) {
        console.error('Failed to fetch machines:', err);
        setMachines([]);
      }
    };

    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-1rem)] bg-gray-50 pt-5 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Machine Values Curve</h1>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={machines} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="val" stroke="#8884d8" strokeWidth={2} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
