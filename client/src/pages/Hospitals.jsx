import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Star, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const dummyHospitals = [
  { _id: '1', name: 'Central Medical Center', address: '123 Main St', waitTime: 12, departments: ['Cardiology', 'Neurology', 'Orthopedics'], rating: 4.8, available: true, distance: '0.8 km' },
  { _id: '2', name: 'City General Hospital', address: '456 Oak Ave', waitTime: 28, departments: ['Emergency', 'Pediatrics', 'Surgery'], rating: 4.6, available: true, distance: '2.1 km' },
  { _id: '3', name: 'MediCare Specialty Clinic', address: '789 Pine Rd', waitTime: 5, departments: ['Dermatology', 'ENT', 'Ophthalmology'], rating: 4.9, available: true, distance: '3.4 km' },
  { _id: '4', name: 'Advanced Surgical Institute', address: '321 Elm Blvd', waitTime: 45, departments: ['Orthopedics', 'Spine Surgery', 'Sports Medicine'], rating: 4.7, available: false, distance: '4.2 km' },
];

const Hospitals = () => {
  const [search, setSearch] = useState('');
  const [hospitals, setHospitals] = useState(dummyHospitals);

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10 pt-28 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
            Find Care
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Hospitals <span className="glow-text">Near You</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real-time waiting times, live doctor availability, and instant appointment booking.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="glass rounded-2xl border border-white/10 flex items-center gap-4 px-6 py-4 focus-within:border-cyan-500/40 transition-colors">
            <Search size={20} className="text-cyan-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search hospitals, departments, or specialties..."
              className="bg-transparent flex-grow text-white placeholder-slate-500 focus:outline-none text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="btn-primary text-sm px-5 py-2 flex items-center gap-2 flex-shrink-0">
              <Filter size={15} /> Filter
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((hospital, i) => (
            <motion.div
              key={hospital._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-3">
                    <MapPin size={14} className="text-slate-500" />
                    {hospital.address}
                    <span className="text-cyan-400 ml-2">{hospital.distance}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold text-sm">{hospital.rating}</span>
                </div>
              </div>

              {/* Wait time badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  hospital.waitTime <= 15 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' :
                  hospital.waitTime <= 30 ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' :
                  'bg-red-500/15 text-red-400 border border-red-500/20'
                }`}>
                  <Clock size={12} />
                  {hospital.waitTime} min wait
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${hospital.available ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                  {hospital.available ? '● Open Now' : '● Closed'}
                </span>
              </div>

              {/* Departments */}
              <div className="flex flex-wrap gap-2 mb-5">
                {hospital.departments.map(dept => (
                  <span key={dept} className="px-3 py-1 rounded-full glass border border-white/8 text-xs text-slate-300">
                    {dept}
                  </span>
                ))}
              </div>

              <Link to={`/hospitals/${hospital._id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-sm"
                >
                  View & Book Appointment <ChevronRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
