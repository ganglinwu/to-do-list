/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/*.{html,js}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: '#4891f1',
                inverted: '#b76e0e',
                redInverted: '#08efcf',
            },
        },
        fontFamily: {
            antic: ['Antic', 'monospace'],
        },
        animation: {
            bounce: 'bounce 1s infinite',
            shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        },
        keyframes: {
            bounce: {
                '0%, 100%': {
                    transform: 'translateY(-25%)',
                    'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
                },
                '50%': {
                    transform: 'translateY(0)',
                    'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
                },
            },
            shake: {
                '10%, 90%': {
                    transform: 'translate3d(-1px, 0, 0)',
                },
                '20%, 80%': {
                    transform: 'translate3d(2px, 0, 0)',
                },
                '30%, 50%, 70%': {
                    transform: 'translate3d(-4px, 0, 0)',
                },
                '40%, 60%': {
                    transform: 'translate3d(4px, 0, 0)',
                },
            },
        },
    },
    plugins: [],
};
