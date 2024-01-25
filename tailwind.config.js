import plugin from 'tailwindcss/plugin'

// css bundle optimization
const colors = ["black", "white", "red", "green", "blue"];
const prefixes = ["bg", "border", "text", "placeholder"];

// This includes bg of all necessary colors and shade
const regex = () => {
    const color = colors.join("|");
    const pres = prefixes.map((p) => `${p}-(${color})`).join("|");
    return new RegExp(`(${pres})-+`);
};

module.exports = {
    content: ["./dist/**/*.html", "./src/**/*.{js,jsx,ts,tsx}", "./*.html"],
    safelist: [{ pattern: regex() }],
    plugins: [
        plugin(function({ addBase, theme }) {
          addBase({
            'h1': { fontSize: theme('fontSize.2xl') },
            'h2': { fontSize: theme('fontSize.xl') },
            'h3': { fontSize: theme('fontSize.lg') },
          })
        })
      ]
};