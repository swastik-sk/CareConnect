import ParticleBackground from '../components/ParticleBackground';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DoctorsSection from '../components/DoctorsSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TrustSection from '../components/TrustSection';

const Home = () => {
  return (
    <div className="relative">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Content layers above the canvas */}
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <DoctorsSection />
        <TrustSection />
        <TestimonialsSection />

        {/* CTA Banner */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-violet-500/10" />
          <div className="absolute inset-0 border-y border-white/8" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to experience <br />
              <span className="glow-text">smarter healthcare?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 50,000+ patients who've transformed how they access and manage healthcare.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/register" className="btn-primary text-base px-10 py-4">
                Create Free Account
              </a>
              <a href="/hospitals" className="btn-glass text-base px-10 py-4">
                Browse Doctors
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
