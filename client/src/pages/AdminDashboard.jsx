import { useState, useEffect } from 'react';
import { Users, Building, ShieldCheck, Activity, Search } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, hospitals: 0, pharmacies: 0 });
  const [hospitals, setHospitals] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Since we are not strictly enforcing auth tokens in this mock for all routes,
        // we'll just fetch public/semi-public data to display stats.
        // In a real app, these would require an Admin JWT token.
        
        const hospitalsRes = await axios.get(`${API_URL}/api/hospitals`);
        const pharmaciesRes = await axios.get(`${API_URL}/api/pharmacies`);
        
        setHospitals(hospitalsRes.data);
        setPharmacies(pharmaciesRes.data);
        
        // Mock stats
        setStats({
          users: 150,
          hospitals: hospitalsRes.data.length,
          pharmacies: pharmaciesRes.data.length
        });
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);

  const handleVerify = async (type, id) => {
    // Mock verification (would call PUT /api/admin/verify/:type/:id)
    alert(`${type} verified successfully!`);
    
    if (type === 'hospital') {
      setHospitals(prev => prev.map(h => h._id === id ? { ...h, verificationStatus: 'Verified' } : h));
    } else {
      setPharmacies(prev => prev.map(p => p._id === id ? { ...p, verificationStatus: 'Verified' } : p));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Platform Administration</h2>
        <p className="text-slate-600">Overview of system health, active partners, and verifications.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Users</p>
            <p className="text-2xl font-bold text-dark">{stats.users}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
            <Building size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Hospitals</p>
            <p className="text-2xl font-bold text-dark">{stats.hospitals}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pharmacies</p>
            <p className="text-2xl font-bold text-dark">{stats.pharmacies}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending Verifications</p>
            <p className="text-2xl font-bold text-dark">
              {hospitals.filter(h => h.verificationStatus === 'Pending').length + 
               pharmacies.filter(p => p.verificationStatus === 'Pending').length}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hospitals Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-dark text-lg">Hospital Partners</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map(hospital => (
                    <tr key={hospital._id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-4">
                        <p className="font-semibold text-dark text-sm">{hospital.name}</p>
                        <p className="text-xs text-slate-500">{hospital.address}</p>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${hospital.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {hospital.verificationStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {hospital.verificationStatus === 'Pending' && (
                          <button onClick={() => handleVerify('hospital', hospital._id)} className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-blue-700 transition font-medium">
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {hospitals.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-slate-500 text-sm">No hospitals found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pharmacies Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-dark text-lg">Pharmacy Partners</h3>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:border-primary" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="p-4 font-semibold text-slate-600 text-sm">Name</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm">Status</th>
                    <th className="p-4 font-semibold text-slate-600 text-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmacies.map(pharmacy => (
                    <tr key={pharmacy._id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-4">
                        <p className="font-semibold text-dark text-sm">{pharmacy.name}</p>
                        <p className="text-xs text-slate-500">{pharmacy.address}</p>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${pharmacy.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {pharmacy.verificationStatus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {pharmacy.verificationStatus === 'Pending' && (
                          <button onClick={() => handleVerify('pharmacy', pharmacy._id)} className="text-xs bg-primary text-white px-3 py-1.5 rounded hover:bg-blue-700 transition font-medium">
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {pharmacies.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-slate-500 text-sm">No pharmacies found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
