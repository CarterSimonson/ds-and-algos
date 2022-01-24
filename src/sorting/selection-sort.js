import { getRandomArray, swap } from "../util.js";

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let smallest = i;
    
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[smallest]) {
        smallest = j;
      }
    }

    if (smallest !== i) {
      swap(arr, i, smallest);
    }
  }

  return arr;
}

console.time('selectionSort');
const sorted = selectionSort(getRandomArray(10000));
console.timeEnd('selectionSort');

console.log(sorted);