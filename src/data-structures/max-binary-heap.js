import { swap } from "../util.js";

function getParentIndex(index) {
  return Math.floor((index - 1) / 2);
}

function getLeftIndex(index) {
  return 2 * index + 1;
}

function getRightIndex(index) {
  return 2 * index + 2;
}

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);

    let index = this.values.length - 1;
    while (true) {
      const parentIndex = getParentIndex(index);
      const parent = this.values[parentIndex] || Infinity;

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
      const left = this.values[leftIndex] || -Infinity;
      const right = this.values[rightIndex] || -Infinity;

      if (left > val) {
        swap(this.values, leftIndex, index);
        index = leftIndex;
      } else if (right > val) {
        swap(this.values, rightIndex, index);
        index = rightIndex;
      } else {
        break;
      }
    }

    return removed;
  }
}

const maxBinaryHeap = new MaxBinaryHeap();
maxBinaryHeap.insert(52);
maxBinaryHeap.insert(12);
maxBinaryHeap.insert(2);
maxBinaryHeap.insert(28);
maxBinaryHeap.insert(33);
maxBinaryHeap.insert(68);
maxBinaryHeap.insert(31);
console.log(maxBinaryHeap.values);
maxBinaryHeap.remove();
console.log(maxBinaryHeap.values);