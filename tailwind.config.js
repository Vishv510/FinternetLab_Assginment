// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                moveBg: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '100% 0%' },
                },
            },
            animation: {
                moveBg: 'moveBg 10s linear infinite alternate',
            },
        },
    },
    plugins: [],
};
