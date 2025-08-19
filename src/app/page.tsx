'use client';

import { useEffect, useState } from 'react';

interface Machine {
  type: string; 
  check_status: 'oui' | 'non';
  val: number;
}

export default function HomePage() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/machines');
        const data = await res.json();

        // Ensure data is always an array
        if (Array.isArray(data)) {
          setMachines(data);
        } else {
          console.error('API did not return an array:', data);
          setMachines([]);
        }
      } catch (err) {
        console.error('Failed to fetch machines:', err);
        setMachines([]);
      }
    };

    fetchMachines(); // initial fetch
    const interval = setInterval(fetchMachines, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  const getColor = (type: string) => {
    const machine = machines.find(
      (m) => m.type.toLowerCase() === type.toLowerCase()
    );
    return machine?.check_status.toLowerCase() === 'oui'
      ? 'bg-green-500'
      : 'bg-red-500';
  };

  return (
    <div className="h-[calc(100vh-1rem)] bg-gray-50 pt-5 px-4">
      <div className="h-full flex flex-col gap-4">
{/* Top: DEA + DEL */}
<div className="flex h-1/2 gap-4 mt-13">
  {/* DEA */}
  <div className="w-1/2 bg-slate-800 rounded-md p-5 flex flex-col items-start justify-start">
    <h1 className="text-4xl font-bold text-white mb-4">DEA</h1>
    <div className="flex flex-row gap-4 mt-2">
      <div className="flex flex-col items-center">
        <div className={`${getColor('dea1')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 1</span>
      </div>
      <div className="flex flex-col items-center">
        <div className={`${getColor('dea2')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 2</span>
      </div>
      <div className="flex flex-col items-center">
        <div className={`${getColor('dea3')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 3</span>
      </div>
    </div>
  </div>

  {/* DEL */}
  <div className="w-1/2 bg-slate-800 rounded-md p-5 flex flex-col items-start justify-start">
    <h1 className="text-4xl font-bold text-white mb-4">DEL</h1>
    <div className="flex flex-row gap-4 mt-2">
      <div className="flex flex-col items-center">
        <div className={`${getColor('del1')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 1</span>
      </div>
      <div className="flex flex-col items-center">
        <div className={`${getColor('del2')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 2</span>
      </div>
      <div className="flex flex-col items-center">
        <div className={`${getColor('del3')} w-20 h-20 rounded`} />
        <span className="text-white mt-2">Machine 3</span>
      </div>
    </div>
  </div>
</div>

{/* Bottom: DTP */}
<div className="h-1/2 bg-slate-800 rounded-md p-5 flex flex-col items-start justify-start">
  <h1 className="text-4xl font-bold text-white mb-4">DTP</h1>
  <div className="flex flex-row gap-4 mt-2">
    <div className="flex flex-col items-center">
      <div className={`${getColor('dtp1')} w-20 h-20 rounded`} />
      <span className="text-white mt-2">Machine 1</span>
    </div>
    <div className="flex flex-col items-center">
      <div className={`${getColor('dtp2')} w-20 h-20 rounded`} />
      <span className="text-white mt-2">Machine 2</span>
    </div>
    <div className="flex flex-col items-center">
      <div className={`${getColor('dtp3')} w-20 h-20 rounded`} />
      <span className="text-white mt-2">Machine 3</span>
    </div>
  </div>
</div>


      </div>
    </div>
  );
}
