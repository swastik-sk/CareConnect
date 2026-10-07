import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardPreview from './DashboardPreview';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-gradient-radial from-blue-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-600/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow-animation" />
              Real-time Healthcare Platform — Now Live
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6"
            >
              Healthcare,{' '}
              <br />
              <span className="glow-text gradient-animation">Reimagined.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              CareConnect unifies hospitals, doctors, and pharmacies on a single intelligent platform. Find care instantly, book without waiting, and track your health in real time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-primary flex items-center gap-2 text-base px-8 py-4"
                >
                  Get Started Free <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/hospitals">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-glass flex items-center gap-2 text-base px-8 py-4"
                >
                  <Play size={16} className="text-cyan-400" /> Explore Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <ShieldCheck size={16} className="text-cyan-400" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <ShieldCheck size={16} className="text-blue-400" />
                <span>Verified Doctors</span>
              </div>
            </motion.div>
          </div>

          {/* Right column — floating dashboard */}
          <div className="flex justify-center lg:justify-end">
            <DashboardPreview />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
