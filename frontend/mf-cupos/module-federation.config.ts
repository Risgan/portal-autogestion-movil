// export const mfConfig = {
//   name: "mf_cupos",
//   exposes: {},
//   shared: ["react", "react-dom"],
// };
export const mfConfig = {
  name: "cupos", // Debe coincidir con el nombre usado en el host
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App",
  },
  shared: ["react", "react-dom"],
};
