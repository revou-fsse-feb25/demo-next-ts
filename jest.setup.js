// Learn more: https://github.com/testing-library/jest-dom
require("@testing-library/jest-dom");

// Mock fetch globally
global.fetch = jest.fn();

// Reset all mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});
