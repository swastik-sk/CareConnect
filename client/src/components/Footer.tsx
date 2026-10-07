import { Activity, GitBranch, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialIcon = ({ Icon }: { Icon: any }) => (
  <a
    href="#"
    className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
  >
    <Icon size={16} />
  </a>
);

const Footer = () => {
  return (
    <footer className="relative border-t border-white/8 mt-12">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Care</span>
                <span className="text-cyan-400">Connect</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Making healthcare smarter, faster, and more accessible for everyone. Real-time. Connected. Trusted.
            </p>
            <div className="flex gap-3">
              <SocialIcon Icon={GitBranch} />
              <SocialIcon Icon={ExternalLink} />
              <SocialIcon Icon={Mail} />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Platform</h4>
            <ul className="space-y-3">
              {['Find Doctors', 'Book Appointment', 'Medicine Search', 'Health Records', 'Emergency Support'].map(l => (
                <li key={l}>
                  <Link to="/" className="text-slate-400 text-sm hover:text-cyan-400 transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">For Partners</h4>
            <ul className="space-y-3">
              {['Hospital Portal', 'Pharmacy Dashboard', 'Admin Panel', 'API Integration', 'Analytics'].map(l => (
                <li key={l}>
                  <Link to="/" className="text-slate-400 text-sm hover:text-cyan-400 transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={15} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                123 Healthcare Blvd, Medical District
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={15} className="text-cyan-400 flex-shrink-0" />
                +1 (800) CARE-NOW
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={15} className="text-cyan-400 flex-shrink-0" />
                hello@careconnect.health
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2024 CareConnect. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map(l => (
              <a key={l} href="#" className="text-slate-500 text-xs hover:text-cyan-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
