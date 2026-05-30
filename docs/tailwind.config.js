/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        bg:       '#0c0d12',
        surface:  '#111218',
        raised:   '#181a24',
        card:     '#1e2130',
        border:   '#2a2d3d',
        muted:    '#6b7194',
        accent:   '#e8aa00',
        'accent-l': '#ffd84d',
        'type-ref':  '#a78bfa',
        'type-prim': '#60a5fa',
        'type-lit':  '#4ade80',
        'type-fn':   '#fb923c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
