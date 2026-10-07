import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Activity, ArrowRight, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticleBackground from '../components/ParticleBackground';
import { API_URL } from '../config';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Patient' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/api/auth/register`, form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const roles = ['Patient', 'Hospital Staff', 'Pharmacy Staff'];

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card p-10 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Activity size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-slate-400 text-sm">Join 50,000+ patients on CareConnect</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-400 text-xs font-medium mb-2 block uppercase tracking-wide">Full Name</label>
              <div className="flex items-center gap-3 glass rounded-xl border border-white/8 px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
                <User size={16} className="text-slate-500" />
                <input
                  type="text"
                  placeholder="Your full name"
                  className="bg-transparent flex-grow text-white placeholder-slate-600 focus:outline-none text-sm"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-2 block uppercase tracking-wide">Email</label>
              <div className="flex items-center gap-3 glass rounded-xl border border-white/8 px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
                <Mail size={16} className="text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-transparent flex-grow text-white placeholder-slate-600 focus:outline-none text-sm"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-2 block uppercase tracking-wide">Password</label>
              <div className="flex items-center gap-3 glass rounded-xl border border-white/8 px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
                <Lock size={16} className="text-slate-500" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="bg-transparent flex-grow text-white placeholder-slate-600 focus:outline-none text-sm"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-medium mb-2 block uppercase tracking-wide">Role</label>
              <div className="flex gap-2">
                {roles.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                      form.role === r
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                        : 'glass border-white/8 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <><UserCheck size={18} /> <span>Create Account</span></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
