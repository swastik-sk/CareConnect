import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Stethoscope, Calendar, Clock } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Patients Served', value: 50000, suffix: '+', color: 'text-cyan-400' },
  { icon: Stethoscope, label: 'Verified Doctors', value: 1500, suffix: '+', color: 'text-blue-400' },
  { icon: Calendar, label: 'Appointments Booked', value: 100000, suffix: '+', color: 'text-violet-400' },
  { icon: Clock, label: 'Support Available', value: 24, suffix: '/7', color: 'text-emerald-400' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white">
      {count >= 1000 ? `${(count / 1000).toFixed(count % 1000 !== 0 ? 1 : 0)}K` : count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-24 px-6">
      {/* Background gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-violet-500/5" />

      <div className="max-w-7xl mx-auto relative">
        <div className="glass rounded-3xl border border-white/8 p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map(({ icon: Icon, label, value, suffix, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                    <Icon size={26} className={color} />
                  </div>
                </div>
                <Counter value={value} suffix={suffix} />
                <p className="text-slate-400 text-sm mt-2 font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
