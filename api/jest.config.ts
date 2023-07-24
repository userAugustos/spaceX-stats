module.exports = {
  preset: 'ts-jest',
  modulePaths: [
    '<rootDir>'
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ["__tests__/__mocks__/*"],
  coveragePathIgnorePatterns: ["__tests__/__mocks__/*"],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

//   paths
  moduleNameMapper: {
    '@services/(.*)': ['<rootDir>/src/core/services/$1',],
    '@types/(.*)': ['<rootDir>/src/core/types/$1',],
    '@useCase/(.*)': ['<rootDir>/src/core/useCase/$1',],
    '@controller/(.*)': ['<rootDir>/src/infra/controller/$1',],
    '@cron/(.*)': ['<rootDir>/src/infra/cronJobs/$1',],
    '@database/(.*)': ['<rootDir>/src/infra/database/$1',],
    '@http/(.*)': ['<rootDir>/src/infra/http/$1',],
  },
};
