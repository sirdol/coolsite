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
        if (Array.isArray(data)) setMachines(data);
        else setMachines([]);
      } catch (err) {
        console.error('Failed to fetch machines:', err);
        setMachines([]);
      }
    };

    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter by type prefix
  const filterByPrefix = (prefix) =>
    machines.filter((m) => m.type.toLowerCase().startsWith(prefix));

  return (
    <div className="h-[calc(100vh-1rem)] bg-gray-50 pt-5 px-4 flex flex-col gap-12 items-center">
      <h1 className="text-4xl font-bold mb-6"></h1>

      {/* DEA graph */}
      <div className="w-full h-96">
        <h2 className="text-2xl font-semibold mb-2">DEA</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filterByPrefix('dea')} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="val" stroke="#00C49F" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DEL graph */}
      <div className="w-full h-96">
        <h2 className="text-2xl font-semibold mb-2">DEL</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filterByPrefix('del')} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="val" stroke="#FF8042" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DTP graph */}
      <div className="w-full h-96">
        <h2 className="text-2xl font-semibold mb-2">DTP</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filterByPrefix('dtp')} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="val" stroke="#8884d8" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
