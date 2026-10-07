import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Morgan',
    role: 'Patient',
    rating: 5,
    text: 'CareConnect completely transformed how I manage my health. Booking appointments is seamless and the real-time wait times save me hours every visit.',
    initials: 'AM',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Priya Nair',
    role: 'Parent',
    rating: 5,
    text: 'As a parent, finding a pediatrician quickly was always stressful. CareConnect connects me to the right doctors in seconds. Absolutely life-changing.',
    initials: 'PN',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'David Kim',
    role: 'Senior Patient',
    rating: 5,
    text: 'The medicine finder feature helped me locate my prescriptions nearby when I was traveling. I felt so safe knowing CareConnect had my back.',
    initials: 'DK',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-28 px-6" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-6">
            Patient Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by{' '}
            <span className="glow-text">50,000+ patients</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real stories from real patients who found better healthcare through CareConnect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 relative overflow-hidden group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={48} className="text-cyan-400" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 leading-relaxed mb-7 text-sm relative z-10">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
