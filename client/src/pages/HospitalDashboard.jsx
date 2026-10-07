import { useState } from 'react';
import { Users, Clock, CheckCircle, Settings } from 'lucide-react';

const HospitalDashboard = () => {
  // In a real app, fetch these from API based on authenticated staff member's hospital
  const [queues, setQueues] = useState([
    { id: 1, department: 'Cardiology', currentToken: 42, waiting: 5, estWait: 25 },
    { id: 2, department: 'Neurology', currentToken: 15, waiting: 8, estWait: 45 },
  ]);

  const handleNextPatient = (queueId) => {
    // In a real app, emit via Socket.IO
    setQueues(queues.map(q => {
      if (q.id === queueId && q.waiting > 0) {
        return { 
          ...q, 
          currentToken: q.currentToken + 1, 
          waiting: q.waiting - 1,
          estWait: Math.max(0, q.estWait - 5)
        };
      }
      return q;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary">Hospital Staff Dashboard</h2>
          <p className="text-slate-600">City Care Hospital</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-dark px-4 py-2 rounded-lg transition font-medium">
          <Settings size={18} /> Manage Hospital
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {queues.map(queue => (
          <div key={queue.id} className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">{queue.department} Queue</h3>
            
            <div className="flex justify-between items-center mb-8">
              <div className="text-center">
                <p className="text-slate-500 text-sm font-semibold uppercase mb-1">Current Token</p>
                <p className="text-4xl font-bold text-primary">#{queue.currentToken}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500 text-sm font-semibold uppercase mb-1">Waiting</p>
                <p className="text-3xl font-bold text-dark">{queue.waiting}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500 text-sm font-semibold uppercase mb-1">Est. Wait</p>
                <p className="text-3xl font-bold text-warning">{queue.estWait}m</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleNextPatient(queue.id)}
                disabled={queue.waiting === 0}
                className="col-span-2 bg-secondary hover:bg-emerald-600 text-white py-3 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={24} /> Call Next Patient
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-dark py-2 rounded font-medium transition">
                Add Patient
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 text-dark py-2 rounded font-medium transition">
                Update Wait Time
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDashboard;
