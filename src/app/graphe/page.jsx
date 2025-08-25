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
  const [graphData, setGraphData] = useState({ DEA: [], DEL: [], DTF: [] });
// Assign machines to their sections
const getSection = (id) => {
  // DTF
  if (/Bouvier|Ripoche|Machine/i.test(id)) return 'DTF';

  // DEA
  if (/Four/i.test(id)) return 'DEA';

  // DEL
  if (/TRA-2000KVA|2x450 kW/i.test(id)) return 'DEL';

  return 'Other';
};


  const parseVal = (v) => (!v || v === '-1' ? 0 : parseFloat(v));

  const sectionColors = {
    DEA: ['#00C49F', '#0088FE', '#FFBB28', '#FF8042', '#AA00FF'],
    DEL: ['#FF8042', '#FFBB28', '#00C49F'],
    DTF: ['#8884d8', '#82ca9d', '#FF8042', '#FFBB28', '#00C49F', '#AA00FF'],
  };

  // Fetch machines once
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/machines');
        const data = await res.json();
        if (Array.isArray(data)) setMachines(data);
      } catch (err) {
        console.error('Failed to fetch machines:', err);
      }
    };
    fetchMachines();
  }, []);

  // Update graph every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newData = { DEA: [], DEL: [], DTF: [] };

      ['DEA', 'DEL', 'DTF'].forEach((section) => {
        const sectionMachines = machines.filter((m) => getSection(m.machine_id) === section);
        if (!sectionMachines.length) return;

        const prev = graphData[section] || [];
        const entry = { name: timestamp };
        sectionMachines.forEach((m) => {
          entry[m.machine_id] = parseVal(m.val);
        });
        newData[section] = [...prev, entry];
      });

      setGraphData(newData);
    }, 60000);

    return () => clearInterval(interval);
  }, [machines, graphData]);

  const renderChart = (section) => {
    const data = graphData[section] || [];
    const sectionMachines = machines.filter((m) => getSection(m.machine_id) === section);

    return (
      <div className="w-full h-96 mb-8">
        <h2 className="text-2xl font-semibold mb-2">{section}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {sectionMachines.map((m, idx) => (
              <Line
                key={m.machine_id}
                type="monotone"
                dataKey={m.machine_id}
                stroke={sectionColors[section][idx % sectionColors[section].length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-3rem)] bg-gray-50 pt-5 px-4 flex flex-col items-center gap-6 mt-10 ">
      {renderChart('DEA')}
      {renderChart('DEL')}
      {renderChart('DTF')}
    </div>
  );
}
