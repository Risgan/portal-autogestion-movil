export const mfConfig = {
  name: "facturacion",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App",
  },
  shared: ["react", "react-dom"],
};
