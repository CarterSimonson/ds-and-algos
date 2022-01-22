import { getRandomArray } from "../util.js";

function swap(arr, idx1, idx2) {
	const temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}

function partition(input, left, right) {
  // Select a pivot and move it to the end
  const middle = Math.floor((left + right) / 2);
  const pivot = input[middle];
  swap(input, middle, right);

  // Count items less than pivot and swap them to the left
  let leftWallIndex = left;
  for (let i = left; i < right; i++) {
    if (input[i] < pivot) {
      swap(input, i, leftWallIndex);
      leftWallIndex++;
    }
  }

  swap(input, right, leftWallIndex);
  return leftWallIndex;
}

function quickSort(input, left = 0, right = input.length - 1) {
  if (left >= right) {
    return;
  }

  const pivot = partition(input, left, right);
  quickSort(input, left, pivot - 1);
  quickSort(input, pivot + 1, right);

  return input;
}

console.time('quickSort');
const sorted = quickSort(getRandomArray(10000));
console.timeEnd('quickSort');

console.log(sorted);