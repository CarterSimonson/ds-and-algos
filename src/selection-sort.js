function swap(arr, idx1, idx2) {
	const temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}


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

console.log(selectionSort([7, 2, 6, 1, 5]));