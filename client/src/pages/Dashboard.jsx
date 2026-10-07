import { CalendarDays, Clock, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for display purposes
  const patientData = {
    name: 'John Doe',
    appointments: [
      { id: 1, hospital: 'City Care Hospital', doctor: 'Dr. Sarah Smith', token: 42, waitingTime: '15 mins', status: 'Waiting' }
    ],
    reservations: [
      { id: 1, medicine: 'Paracetamol 500mg', pharmacy: 'HealthPlus Pharmacy', status: 'Ready for Pickup' }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Welcome, {patientData.name}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Appointments */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarDays className="text-primary" /> Today's Appointments
            </h3>
            
            {patientData.appointments.length > 0 ? (
              patientData.appointments.map(apt => (
                <div key={apt.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-lg">{apt.hospital}</h4>
                    <p className="text-slate-600">{apt.doctor} • Token: <span className="font-bold text-dark">{apt.token}</span></p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-warning/20 text-warning px-3 py-1 rounded-full font-semibold text-sm mb-1">
                      <Clock size={14} /> Est. Wait: {apt.waitingTime}
                    </div>
                    <p className="text-sm font-medium text-slate-500">Status: {apt.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No appointments today.</p>
            )}
            
            <Link to="/hospitals" className="inline-block mt-4 text-primary font-medium hover:underline">
              Book a new appointment &rarr;
            </Link>
          </div>

          {/* Medicine Reservations */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Search className="text-secondary" /> Active Medicine Reservations
            </h3>
            
            {patientData.reservations.length > 0 ? (
              patientData.reservations.map(res => (
                <div key={res.id} className="border border-slate-200 rounded-lg p-4 mb-3 last:mb-0 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{res.medicine}</h4>
                    <p className="text-slate-600 text-sm">{res.pharmacy}</p>
                  </div>
                  <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                    {res.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No active reservations.</p>
            )}
            
            <Link to="/medicines" className="inline-block mt-4 text-primary font-medium hover:underline">
              Find medicines &rarr;
            </Link>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-danger" /> Nearby Healthcare
            </h3>
            <p className="text-slate-600 text-sm mb-4">Discover hospitals and pharmacies near your current location.</p>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-dark py-2 rounded font-medium transition">
              View Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
