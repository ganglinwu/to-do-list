/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/*.{html,js}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: '#4891f1',
            },
        },
    },
    plugins: [],
};
