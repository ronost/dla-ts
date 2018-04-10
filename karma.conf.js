module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "src/**/!(index).ts" },
      { pattern: "test/**/*.spec.ts" }
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript", "coverage"],
      "test/**/*.spec.ts": ["karma-typescript"]
    },
    reporters: ["progress", "coverage", "karma-typescript"],
    browsers: ["Chrome"]
  });
};
