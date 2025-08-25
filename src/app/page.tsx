'use client';

import { useEffect, useState } from 'react';

interface Machine {
  machine_id: string;
  val: string | null;
}


export default function HomePage() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/machines');
        const data = await res.json();

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

    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (id: string) => {
    const machine = machines.find(
      (m) => m.machine_id.toLowerCase().includes(id.toLowerCase())
    );
    if (!machine) return 'bg-gray-400';

    // if val === "-1" → red, else green
    return machine.val === "-1" ? 'bg-red-500' : 'bg-green-500';
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
                <div className={`${getColor('Four 1 18MVA.I1')} w-20 h-20 rounded`} />
                <span className="text-white mt-2">Four 1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`${getColor('Four 2 18MVA.I1')} w-20 h-20 rounded`} />
                <span className="text-white mt-2">Four 2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`${getColor('Four Poche.I1')} w-20 h-20 rounded`} />
                <span className="text-white mt-2">Four Poche</span>
              </div>
            </div>
          </div>

          {/* DEL */}
          <div className="w-1/2 bg-slate-800 rounded-md p-5 flex flex-col items-start justify-start">
            <h1 className="text-4xl font-bold text-white mb-4">DEL</h1>
            <div className="flex flex-row gap-4 mt-2">
              <div className="flex flex-col items-center">
                <div className={`${getColor('TRA-2000KVA.I1')} w-20 h-20 rounded`} />
                <span className="text-white mt-2">train barre</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`${getColor('2x450 kW Moteurs.I1')} w-20 h-20 rounded`} />
                <span className="text-white mt-2">train fille</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: DTF */}
        <div className="h-1/2 bg-slate-800 rounded-md p-5 flex flex-col items-start justify-start">
          <h1 className="text-4xl font-bold text-white mb-4">DTF</h1>
          <div className="flex flex-row gap-4 mt-2">
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 3.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 3</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 4.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 4</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 12.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 12</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 19.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 19</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 20.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 20</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Machine 21.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Machine 21</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Four Ripoche.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Four Ripoche 1</span>
              </div>
            <div className="flex flex-col items-center">
              <div className={`${getColor('Four Bouvier.I1')} w-20 h-20 rounded`} />
              <span className="text-white mt-2">Four Bouvier 1</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
