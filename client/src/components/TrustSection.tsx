import { motion } from 'framer-motion';
import { ShieldCheck, Lock, BadgeCheck, HeartPulse, PhoneCall } from 'lucide-react';

const trustItems = [
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'End-to-end encrypted records. Your data is always yours.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'HIPAA-Ready',
    description: 'Built to meet healthcare compliance standards from day one.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Doctors',
    description: 'Every specialist is board-certified and background-checked.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: HeartPulse,
    title: 'Real-Time Updates',
    description: 'Live queue times, availability, and stock — always accurate.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: PhoneCall,
    title: '24/7 Support',
    description: 'Human support team available anytime, day or night.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
];

const TrustSection = () => {
  return (
    <section className="relative py-24 px-6" id="about">
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/8 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            Trust & Security
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built on{' '}
            <span className="glow-text">trust</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Your health data deserves the highest standards of privacy and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card p-6 border ${item.border} text-center group`}
            >
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={24} className={item.color} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
