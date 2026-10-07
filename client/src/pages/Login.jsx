import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Activity, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ParticleBackground from '../components/ParticleBackground';
import { API_URL } from '../config';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem('careconnect_token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card p-10 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Activity size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to your CareConnect account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-400 text-xs font-medium mb-2 block uppercase tracking-wide">Email</label>
              <div className="flex items-center gap-3 glass rounded-xl border border-white/8 px-4 py-3 focus-within:border-cyan-500/40 transition-colors">
                <User size={16} className="text-slate-500" />
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
                  placeholder="••••••••"
                  className="bg-transparent flex-grow text-white placeholder-slate-600 focus:outline-none text-sm"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
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
                <><span>Sign In</span> <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
