module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
      extend: {
        colors: {
          primary: "#041eb3",
        },
        backgroundImage: {
          'primary-gradient': 'linear-gradient(to right, #041eb3, #00bfff)',
        },
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
    plugins: [],
    important: true,
  };