/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {fontFamily: {
      poppins: ['"Poppins"']
    }},
    container: {
      screens: {
        sm: '380px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      }},
  },
  
  daisyui: {  themes: ["light", "dark", "cupcake", "dim"] },

  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require("daisyui"),
    require('@tailwindcss/forms'),
    // require("tailwind-heropatterns")({
    //   // the list of patterns you want to generate a class for
    //   // the names must be in kebab-case
    //   // an empty array will generate all 87 patterns
    //   patterns: [],

    //   // The foreground colors of the pattern
    //   // if you don't specify a color, the default will be used
    //   colors: {
    //     default: "#9C92AC",
    //     "vermillion": "#ffedee" //also works with rgb(0,0,205)
    //   },
    
    //   // The foreground opacity
    //   opacity: {
    //     default: "0.4",
    //     "100": "1.0"
    //   }
    // }),

    // themeVariants({
    //   themes: {
    //       red: {
    //           selector: ".red",
    //       },
    //       blue: {
    //           selector: "[data-theme=blue]",
    //       },
    //   },
    // }),

  ],
}