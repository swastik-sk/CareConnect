/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0a0f1e',
          light: '#0d1526',
          200: '#111827',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.08)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a0f1e 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #22d3ee, #3b82f6)',
        'glow-cyan': 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
        'glow-blue': 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.37)',
        'cyan-glow': '0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(34,211,238,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient-shift 4s ease infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
