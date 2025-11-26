/**
 * Calculates the nth Fibonacci number using an iterative approach.
 * 
 * The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
 * where each number is the sum of the two preceding ones.
 * 
 * @param n - The position in the Fibonacci sequence (0-indexed)
 * @returns The Fibonacci number at position n
 * 
 * @example
 * calculateFibonacci(0) // returns 0
 * calculateFibonacci(1) // returns 1
 * calculateFibonacci(6) // returns 8
 */
export function calculateFibonacci(n: number): number {
  // Base case: F(0) = 0
  if (n <= 0) return 0;
  // Base case: F(1) = 1
  if (n === 1) return 1;

  // Initialize the first two Fibonacci numbers
  let a = 0; // F(0)
  let b = 1; // F(1)
  
  // Iteratively calculate Fibonacci numbers from F(2) to F(n)
  // Using destructuring assignment for cleaner variable swapping
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  
  // Return the nth Fibonacci number
  return b;
}

console.log(calculateFibonacci(6)); // Should output 8