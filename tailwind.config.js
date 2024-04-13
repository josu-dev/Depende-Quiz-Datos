import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config}*/
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-muted': 'hsl(var(--color-primary-muted) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        'secondary-muted': 'hsl(var(--color-secondary-muted) / <alpha-value>)',
        info: 'hsl(var(--color-info) / <alpha-value>)',
        success: 'hsl(var(--color-success) / <alpha-value>)',
        warning: 'hsl(var(--color-warning) / <alpha-value>)',
        error: 'hsl(var(--color-error) / <alpha-value>)'
      },
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        'shake': {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0) rotate(8deg)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0) rotate(-6deg)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0) rotate(6deg)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0) rotate(-8deg)'
          }
        }
      },
    },
  },
  plugins: [forms, typography],
};
