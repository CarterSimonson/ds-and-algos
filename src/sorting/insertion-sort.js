import { getRandomArray } from "../util.js";

function moveElement(arr, startIndex, endIndex) {
  const val = arr[startIndex];
	arr.splice(startIndex, 1);
  arr.splice(endIndex, 0, val);
  return arr;
}

function insertionSort(arr) {
  if (!arr || arr.length === 0) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    const selectedValue = arr[i];

    // Loop through all previous elements
    for (let j = i - 1; j >= 0; j--) {
      const comparisonValue = arr[j];

      if (selectedValue > comparisonValue) {
        moveElement(arr, i, j + 1);
        break;
      } else if (j === 0) {
        moveElement(arr, i, 0);
      }
    }
  }

  return arr;
}

console.time('insertionSort');
const sorted = insertionSort(getRandomArray(10000));
console.timeEnd('insertionSort');

console.log(sorted);