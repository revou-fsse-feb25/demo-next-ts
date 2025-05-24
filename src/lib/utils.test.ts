import { add } from "./utils";

// describe is a Jest function to group related tests.
// It takes a name (string) and a callback function containing the tests.
describe("add function", () => {
  // test (or it) is a Jest function to define an individual test case.
  // It takes a name (string) and a callback function containing the test logic.
  test("should return the sum of two positive numbers", () => {
    // Arrange: Set up your test data and conditions.
    const num1 = 2;
    const num2 = 3;
    const expectedSum = 5;

    // Act: Call the function or perform the action you want to test.
    const result = add(num1, num2);

    // Assert: Check if the result matches your expectation.
    // expect is a Jest function that lets you make assertions.
    // .toBe() is a "matcher" that checks for strict equality (===).
    expect(result).toBe(expectedSum);
  });

  test("should return the sum when one number is negative", () => {
    expect(add(-5, 10)).toBe(5);
  });

  test("should return the sum of two negative numbers", () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test("should return zero when adding zero to a number", () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
  });
});
