import { getRandomArray } from "../util.js";

function merge(a, b) {
  const sorted = [];

  let aPivot = 0;
  let bPivot = 0;

  while (sorted.length < a.length + b.length) {
    // Compare the elements at each pivot
    // The lesser value should be pushed to "sorted" and the pivot should be incremented
    const aVal = a[aPivot] || Infinity;
    const bVal = b[bPivot] || Infinity;

    if (aVal < bVal) {
      sorted.push(aVal);
      aPivot += 1;
    } else {
      sorted.push(bVal);
      bPivot += 1;
    }
  }

  return sorted;
}

function mergeSort(input) {
  if (input.length <= 1) {
    return input;
  }

  const middleIndex = Math.floor(input.length / 2);
  const left = mergeSort(input.slice(0, middleIndex));
  const right = mergeSort(input.slice(middleIndex));

  return merge(left, right);
}

console.time('mergeSort');
const sorted = mergeSort(getRandomArray(10000));
console.timeEnd('mergeSort');

console.log(sorted);