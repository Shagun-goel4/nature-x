/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", "Plus Jakarta Sans", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        surface: {
          900: "#0b1020",
          800: "#0f172a",
          700: "#111827",
          600: "#1f2937",
        },
      },
      boxShadow: {
        glow: "0 0 0 2px rgba(16,185,129,0.35), 0 0 30px rgba(16,185,129,0.25)",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.25rem",
        '3xl': "1.75rem",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .65 },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
