export function getRandomArray(length) {
  let nums = [];

  for (let i = 0; i < length; i++) {
    nums.push(Math.floor(Math.random() * 10000));
  }

  return nums;
}