import { getRandomArray, swap } from "../util.js";

function bubbleSort(arr) {
  for (let i = arr.length; i > 1; i--) {
    let didSwap = false;

    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        didSwap = true;
      }
    }

    if (!didSwap) break;
  }

  return arr;
}

console.time('bubbleSort');
const sorted = bubbleSort(getRandomArray(10000));
console.timeEnd('bubbleSort');

console.log(sorted);