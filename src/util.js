export function swap(arr, idx1, idx2) {
	const temp = arr[idx1];
	arr[idx1] = arr[idx2];
	arr[idx2] = temp;
}

export function getRandomArray(length, max = 10000) {
  let nums = [];

  for (let i = 0; i < length; i++) {
    nums.push(Math.floor(Math.random() * max));
  }

  return nums;
}