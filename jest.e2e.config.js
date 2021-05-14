module.exports = {

  "moduleNameMapper": {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },
  //setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  coveragePathIgnorePatterns: ['/node_modules/','index.tsx', 'setUp.tsx'],
  preset: "jest-puppeteer",
  testMatch: [
        '<rootDir>/**/*.e2e.(js|jsx|ts|tsx)'
  ]
};