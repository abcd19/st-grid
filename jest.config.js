module.exports = {

  "moduleNameMapper": {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  /*moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
  transform: {
      "^.+\\.(js|jsx|ts|tsx)$": 'ts-jest'
  },

  testEnvironment: 'node',
  setupFilesAfterEnv: ["src/setupTests.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ]*/
  //testMatch: [
  //    '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  //],

};