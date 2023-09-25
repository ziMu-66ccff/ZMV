module.exports = {
  testMatch: ['**/tests/**/*.test.ts'], // 只测试后缀为 .test.js 的文件
  runner: 'jest-electron/runner', // 指定测试的 runner
  testEnvironment: 'jest-electron/environment', //  制定测试的环境
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
};
