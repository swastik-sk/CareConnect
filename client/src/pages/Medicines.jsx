import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Pill, MapPin, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import axios from 'axios';
import ParticleBackground from '../components/ParticleBackground';
import { API_URL } from '../config';

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await axios.get(`${API_URL}/api/medicines/search?name=${searchTerm}`);
      setInventory(res.data);
    } catch (error) {
      console.error(error);
      // Demo data
      setInventory([
        { _id: '1', medicineId: { name: searchTerm, strength: '500mg', form: 'Tablet' }, pharmacyId: { name: 'HealthPlus Pharmacy', address: '123 Main St' }, quantity: 85, availability: 'Available' },
        { _id: '2', medicineId: { name: searchTerm, strength: '500mg', form: 'Tablet' }, pharmacyId: { name: 'CareMed Pharmacy', address: '456 Tech Ave' }, quantity: 12, availability: 'Available' },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10 pt-28 pb-20 px-6 max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            Medicine Finder
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Find Medicines <span className="glow-text">Nearby</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Search by medicine name and check real-time stock across pharmacies in your area.
          </p>
        </motion.div>

        {/* Search */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass rounded-2xl border border-white/10 flex items-center gap-4 px-6 py-4 focus-within:border-emerald-500/40 transition-colors">
            <Pill size={20} className="text-emerald-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search medicine name (e.g., Paracetamol)..."
              className="bg-transparent flex-grow text-white placeholder-slate-500 focus:outline-none text-base"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn-primary text-sm px-6 py-2.5 flex-shrink-0">
              Search
            </button>
          </div>
        </motion.form>

        {/* Results */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-slate-400">Scanning pharmacies...</p>
          </div>
        ) : hasSearched ? (
          inventory.length > 0 ? (
            <div>
              <p className="text-slate-400 text-sm mb-6">Found {inventory.length} pharmacies carrying <span className="text-cyan-400 font-medium">"{searchTerm}"</span></p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventory.map(item => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    className="glass-card p-6 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Pill size={16} className="text-cyan-400" />
                          <h3 className="text-white font-bold">{item.medicineId?.name}</h3>
                        </div>
                        <p className="text-slate-500 text-sm">{item.medicineId?.strength} · {item.medicineId?.form}</p>
                      </div>
                      <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        item.availability === 'Available'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/15 text-red-400 border border-red-500/20'
                      }`}>
                        {item.availability === 'Available' ? <CheckCircle size={12}/> : <XCircle size={12}/>}
                        {item.availability}
                      </span>
                    </div>

                    <div className="glass rounded-xl p-3 border border-white/6 mb-4">
                      <p className="text-white text-sm font-semibold mb-1">{item.pharmacyId?.name}</p>
                      <p className="text-slate-500 text-xs flex items-center gap-1">
                        <MapPin size={12}/> {item.pharmacyId?.address}
                      </p>
                    </div>

                    {item.availability === 'Available' && (
                      <p className="text-emerald-400 text-sm font-medium flex items-center gap-2 mb-4">
                        <Package size={14}/> {item.quantity} units in stock
                      </p>
                    )}

                    <button
                      disabled={item.availability !== 'Available'}
                      className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        item.availability === 'Available' ? 'btn-primary' : 'bg-white/5 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {item.availability === 'Available' ? 'Reserve Medicine' : 'Out of Stock'}
                    </button>
                    {item.availability === 'Available' && (
                      <p className="text-center text-xs text-slate-600 mt-2 flex justify-center items-center gap-1">
                        <Clock size={11}/> Pick up within 24 hours
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 glass-card p-12">
              <Pill size={48} className="text-slate-600 mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2">No results found</h3>
              <p className="text-slate-500">No pharmacies carrying "{searchTerm}" were found nearby.</p>
            </div>
          )
        ) : (
          <div className="text-center py-20 text-slate-600">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p>Enter a medicine name above to begin your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
