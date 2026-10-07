import { motion } from 'framer-motion';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
  {
    name: 'Dr. Sarah Chen',
    specialty: 'Cardiologist',
    experience: '14 years',
    rating: 4.9,
    reviews: 312,
    available: true,
    initials: 'SC',
    gradient: 'from-cyan-500 to-blue-600',
    location: 'Central Hospital',
  },
  {
    name: 'Dr. James Park',
    specialty: 'Neurologist',
    experience: '11 years',
    rating: 4.8,
    reviews: 248,
    available: true,
    initials: 'JP',
    gradient: 'from-violet-500 to-purple-600',
    location: 'MediCare Clinic',
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrician',
    experience: '9 years',
    rating: 4.9,
    reviews: 195,
    available: false,
    initials: 'PS',
    gradient: 'from-emerald-500 to-teal-600',
    location: 'City Children\'s Center',
  },
  {
    name: 'Dr. Michael Torres',
    specialty: 'Orthopedic Surgeon',
    experience: '16 years',
    rating: 4.7,
    reviews: 421,
    available: true,
    initials: 'MT',
    gradient: 'from-orange-500 to-red-500',
    location: 'Advanced Surgical Clinic',
  },
];

const DoctorsSection = () => {
  return (
    <section className="relative py-28 px-6" id="doctors">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
            Our Specialists
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet the{' '}
            <span className="glow-text">Experts</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Board-certified specialists dedicated to providing exceptional care with compassion and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, i) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10, rotateX: 2, rotateY: -2, transition: { duration: 0.3 } }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="glass-card p-6 group"
            >
              {/* Avatar */}
              <div className="relative mb-5">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${doc.gradient} flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {doc.initials}
                </div>
                <div className={`absolute -bottom-1 -right-1 left-1/2 w-6 h-6 rounded-full border-2 border-[#0d1526] flex items-center justify-center ${doc.available ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                  <CheckCircle size={12} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="text-white font-bold text-base mb-1">{doc.name}</h3>
                <p className="text-cyan-400 text-sm font-medium mb-1">{doc.specialty}</p>
                <p className="text-slate-500 text-xs">{doc.experience} experience</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold text-sm">{doc.rating}</span>
                <span className="text-slate-500 text-xs">({doc.reviews})</span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center gap-1.5 mb-5">
                <MapPin size={12} className="text-slate-500" />
                <span className="text-slate-500 text-xs">{doc.location}</span>
              </div>

              {/* Availability badge */}
              <div className={`text-center mb-4 text-xs font-semibold flex items-center justify-center gap-1.5 ${doc.available ? 'text-emerald-400' : 'text-slate-500'}`}>
                <Clock size={12} />
                {doc.available ? 'Available Today' : 'Next Available Thu'}
              </div>

              <Link to="/hospitals">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    doc.available
                      ? 'btn-primary'
                      : 'btn-glass opacity-60'
                  }`}
                >
                  {doc.available ? 'Book Now' : 'Schedule Later'}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/hospitals">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glass px-8 py-4"
            >
              View All Specialists →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorsSection;
