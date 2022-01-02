function swap(arr, idx1, idx2) {
	const temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}

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

console.log(bubbleSort([7, 2, 6, 1, 5]));