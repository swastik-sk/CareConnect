import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/hospitals', label: 'Doctors' },
  { href: '/hospitals', label: 'Appointments' },
  { href: '/medicines', label: 'Medicines' },
  { href: '#about', label: 'About' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0f1e]/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-300">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Care</span>
            <span className="text-cyan-400">Connect</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
            Login
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-sm relative z-10"
            >
              Book Appointment
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/8 px-6 py-4"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-4 py-3 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/8">
                <Link to="/login" className="btn-glass text-center text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-center text-sm">Book Appointment</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
