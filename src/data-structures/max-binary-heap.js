import { swap, getRandomArray } from "../util.js";

function getParentIndex(index) {
  return Math.floor((index - 1) / 2);
}

function getLeftIndex(index) {
  return 2 * index + 1;
}

function getRightIndex(index) {
  return 2 * index + 2;
}

export default class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);

    let index = this.values.length - 1;
    while (true) {
      const parentIndex = getParentIndex(index);
      const parent = this.values[parentIndex] !== undefined ? this.values[parentIndex] : Infinity;

      if (parent < val) {
        swap(this.values, parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }
  
  remove() {
    if (this.values.length === 0) {
      return null;
    }

    // Swap the first and last values, then bubble down to rebalance
    swap(this.values, 0, this.values.length - 1);
    const removed = this.values.pop();

    let index = 0;
    const val = this.values[index];
    while (true) {
      const leftIndex = getLeftIndex(index);
      const rightIndex = getRightIndex(index);
      const left = this.values[leftIndex] !== undefined ? this.values[rightIndex] : -Infinity;
      const right = this.values[rightIndex] !== undefined ? this.values[rightIndex] : -Infinity;

      if (left >= right && left > val) {
        swap(this.values, leftIndex, index);
        index = leftIndex;
      } else if (right >= left && right > val) {
        swap(this.values, rightIndex, index);
        index = rightIndex;
      } else {
        break;
      }
    }

    return removed;
  }
}

// Test:
const maxBinaryHeap = new MaxBinaryHeap();

getRandomArray(25, 10).forEach((val) => {
  maxBinaryHeap.insert(val);
});

console.log(maxBinaryHeap.values);

function validate() {
  maxBinaryHeap.values.forEach((val, index) => {
    const parent = maxBinaryHeap.values[getParentIndex(index)];
  
    if (parent !== undefined && parent < val) {
      console.log(`Invalid! ${parent} is less than ${val}`);
    }
  });
}

validate();
for(let i = 0; i < maxBinaryHeap.values.length; i++) {
  maxBinaryHeap.remove();
}
validate();