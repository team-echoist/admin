module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:4173/"],
      startServerCommand: "yarn run preview",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
