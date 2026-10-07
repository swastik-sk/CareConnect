import { motion } from 'framer-motion';
import { Search, Calendar, FileText, Video, Pill, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Search,
    title: 'Find a Doctor',
    description: 'Search specialists by expertise, location, and live availability.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(34,211,238,0.2)',
    href: '/hospitals',
  },
  {
    icon: Calendar,
    title: 'Book Appointment',
    description: 'Seamlessly schedule visits with verified healthcare professionals.',
    color: 'from-blue-500 to-violet-600',
    glow: 'rgba(59,130,246,0.2)',
    href: '/hospitals',
  },
  {
    icon: FileText,
    title: 'Digital Health Records',
    description: 'Access and share your encrypted medical history securely.',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.2)',
    href: '/dashboard',
  },
  {
    icon: Video,
    title: 'Online Consultation',
    description: 'Connect with doctors instantly via HD video consultations.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.2)',
    href: '/dashboard',
  },
  {
    icon: Pill,
    title: 'Medicines & Prescriptions',
    description: 'Find medicines nearby and reserve them in real time.',
    color: 'from-orange-500 to-red-500',
    glow: 'rgba(249,115,22,0.2)',
    href: '/medicines',
  },
  {
    icon: Phone,
    title: 'Emergency Support',
    description: '24/7 emergency assistance and instant hospital connection.',
    color: 'from-red-500 to-rose-600',
    glow: 'rgba(239,68,68,0.2)',
    href: '/hospitals',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const FeaturesSection = () => {
  return (
    <section className="relative py-28 px-6" id="services">
      {/* Section heading */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Everything you need,{' '}
            <span className="glow-text">in one place</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            CareConnect brings hospitals, doctors, and pharmacies together—giving you instant, intelligent access to the healthcare you deserve.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, description, color, glow, href }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 group cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: `0 0 0 0 ${glow}`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]"
                style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {description}
                </p>

                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:gap-3 transition-all duration-300"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
