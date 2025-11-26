import { describe, it, expect } from "vitest";
import { calculateFibonacci } from "./quickstart";

describe("Fibonacci Calculator", () => {
  describe("Base cases", () => {
    it("should return 0 for n = 0", () => {
      expect(calculateFibonacci(0)).toBe(0);
    });

    it("should return 1 for n = 1", () => {
      expect(calculateFibonacci(1)).toBe(1);
    });
  });

  describe("Small positive numbers", () => {
    it("should return 1 for n = 2", () => {
      expect(calculateFibonacci(2)).toBe(1);
    });

    it("should return 2 for n = 3", () => {
      expect(calculateFibonacci(3)).toBe(2);
    });

    it("should return 3 for n = 4", () => {
      expect(calculateFibonacci(4)).toBe(3);
    });

    it("should return 5 for n = 5", () => {
      expect(calculateFibonacci(5)).toBe(5);
    });

    it("should return 8 for n = 6", () => {
      expect(calculateFibonacci(6)).toBe(8);
    });

    it("should return 13 for n = 7", () => {
      expect(calculateFibonacci(7)).toBe(13);
    });
  });

  describe("Larger numbers", () => {
    it("should return 21 for n = 8", () => {
      expect(calculateFibonacci(8)).toBe(21);
    });

    it("should return 34 for n = 9", () => {
      expect(calculateFibonacci(9)).toBe(34);
    });

    it("should return 55 for n = 10", () => {
      expect(calculateFibonacci(10)).toBe(55);
    });
  });

  describe("Edge cases", () => {
    it("should return 0 for negative numbers", () => {
      expect(calculateFibonacci(-1)).toBe(0);
      expect(calculateFibonacci(-5)).toBe(0);
    });
  });
});
