import { motion } from 'framer-motion';
import { Heart, Activity, Droplets, Footprints, Calendar, Bell, TrendingUp } from 'lucide-react';

const HeartRateChart = () => {
  const points = [40, 45, 43, 80, 120, 60, 45, 50, 47, 85, 125, 65, 48, 44];
  const max = 140;
  const w = 300;
  const h = 60;

  const pathD = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - (v / max) * h;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hrGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d={pathD} fill="none" stroke="url(#hrGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const DashboardPreview = () => {
  const metrics = [
    { icon: Heart, label: 'Heart Rate', value: '78', unit: 'bpm', color: 'text-red-400', bg: 'bg-red-500/10', trend: '+2%' },
    { icon: Activity, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'text-cyan-400', bg: 'bg-cyan-500/10', trend: 'Normal' },
    { icon: Droplets, label: 'SpO₂', value: '98', unit: '%', color: 'text-blue-400', bg: 'bg-blue-500/10', trend: '+0.2%' },
    { icon: Footprints, label: 'Steps Today', value: '8,240', unit: 'steps', color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '82%' },
  ];

  const appointments = [
    { doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', time: 'Today, 3:00 PM', avatar: 'SC' },
    { doctor: 'Dr. James Park', specialty: 'Neurologist', time: 'Thu, 10:30 AM', avatar: 'JP' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative float-animation"
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent blur-2xl" />

      <div className="relative glass-card p-6 max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Health Dashboard</p>
            <p className="text-white font-bold text-lg">Welcome back, Alex</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
        </div>

        {/* Heart rate chart */}
        <div className="glass rounded-2xl p-4 mb-4 border border-white/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-red-400 heartbeat-animation" />
              <span className="text-xs text-slate-400 font-medium">Heart Rate</span>
            </div>
            <span className="text-white font-bold text-lg">78 <span className="text-xs text-slate-500 font-normal">bpm</span></span>
          </div>
          <HeartRateChart />
          <p className="text-xs text-emerald-400 mt-2 font-medium">● Normal range</p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.slice(1).map(({ icon: Icon, label, value, unit, color, bg, trend }) => (
            <div key={label} className={`glass rounded-xl p-3 border border-white/6`}>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                <Icon size={16} className={color} />
              </div>
              <p className="text-white font-bold text-sm">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming appointments */}
        <div className="glass rounded-2xl p-4 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} className="text-cyan-400" />
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Upcoming</p>
          </div>
          <div className="flex flex-col gap-2">
            {appointments.map(apt => (
              <div key={apt.doctor} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs text-white font-bold flex-shrink-0">
                  {apt.avatar}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{apt.doctor}</p>
                  <p className="text-slate-500 text-xs">{apt.time}</p>
                </div>
                <span className="text-xs text-cyan-400 font-medium flex-shrink-0">View</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medication reminder badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
          className="absolute -top-4 -right-4 glass rounded-2xl px-3 py-2 border border-cyan-500/30 flex items-center gap-2 shadow-lg"
        >
          <Bell size={14} className="text-cyan-400" />
          <span className="text-xs text-white font-medium">Med reminder</span>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
          className="absolute -bottom-4 -left-4 glass rounded-2xl px-3 py-2 border border-emerald-500/30 flex items-center gap-2 shadow-lg"
        >
          <TrendingUp size={14} className="text-emerald-400" />
          <span className="text-xs text-white font-medium">98% healthy</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPreview;
