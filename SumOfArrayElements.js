// Read input (example assumes input from console or online judge)
function sumOfArrayElements(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Example usage:
const arr1 = [1, 2, 3, 4];
console.log(sumOfArrayElements(arr1)); // Output: 10

const arr2 = [12, 34, 10];
console.log(sumOfArrayElements(arr2)); // Output: 56
