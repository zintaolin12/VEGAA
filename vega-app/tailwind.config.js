export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f19',          // deep black-blue
        card: '#121826',        // binance-like card
        border: '#1e293b',
        primary: '#2563eb',     // blue
        primarySoft: '#1d4ed8',
        text: '#e5e7eb',
        muted: '#9ca3af',
      },
    },
  },
  plugins: [],
}
