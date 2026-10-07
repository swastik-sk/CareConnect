import { useState, useEffect } from 'react';
import { Pill, AlertTriangle, Plus, Edit } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_URL } from '../config';

const PharmacyDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetching for HealthPlus Pharmacy which is seeded
    const fetchInventory = async () => {
      try {
        // Fetch all pharmacies to get ID of HealthPlus Pharmacy
        const pharms = await axios.get(`${API_URL}/api/pharmacies`);
        const healthPlus = pharms.data.find(p => p.name === 'HealthPlus Pharmacy');
        
        if (healthPlus) {
          const res = await axios.get(`${API_URL}/api/pharmacies/${healthPlus._id}/inventory`);
          setInventory(res.data);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchInventory();

    const socket = io(`${API_URL}`);
    socket.on('medicine_stock_updated', (data) => {
      // In a real app, verify data.pharmacyId matches this pharmacy's ID
      setInventory(prev => prev.map(item => {
        if (item.medicineId?._id === data.medicineId) {
          return { ...item, quantity: data.quantity, availability: data.availability };
        }
        return item;
      }));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary">Pharmacy Inventory</h2>
          <p className="text-slate-600">HealthPlus Pharmacy</p>
        </div>
        <button className="flex items-center gap-2 bg-secondary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition font-medium">
          <Plus size={18} /> Add Medicine
        </button>
      </div>

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-semibold text-slate-700">Medicine Name</th>
                  <th className="p-4 font-semibold text-slate-700">Strength / Form</th>
                  <th className="p-4 font-semibold text-slate-700">Quantity</th>
                  <th className="p-4 font-semibold text-slate-700">Status</th>
                  <th className="p-4 font-semibold text-slate-700">Last Updated</th>
                  <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-dark flex items-center gap-2">
                      <Pill size={16} className="text-primary"/> {item.medicineId?.name}
                    </td>
                    <td className="p-4 text-slate-600">
                      {item.medicineId?.strength} • {item.medicineId?.form}
                    </td>
                    <td className="p-4 font-semibold text-dark">
                      {item.quantity}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${item.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {item.availability}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">
                      Just now
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                        <Edit size={14}/> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {inventory.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <AlertTriangle className="mx-auto mb-2 text-warning" size={32} />
              No medicines in inventory. Add some to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;
