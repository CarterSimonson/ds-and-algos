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

class Node {
  constructor(val = null, priority = 0) {
    this.val = val;
    this.priority = priority
  }
}

export default class MaxPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push(new Node(val, priority));

    let index = this.values.length - 1;
    while (true) {
      const parentIndex = getParentIndex(index);
      const parentPriority = this.values[parentIndex]?.priority !== undefined ? this.values[parentIndex]?.priority : Infinity;

      if (parentPriority < priority) {
        swap(this.values, parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }
  
  dequeue() {
    if (this.values.length === 0) {
      return null;
    }

    // Swap the first and last values, then bubble down to rebalance
    swap(this.values, 0, this.values.length - 1);
    const removed = this.values.pop();

    let index = 0;
    const node = this.values[index];
    while (true) {
      const leftIndex = getLeftIndex(index);
      const rightIndex = getRightIndex(index);
      const leftPriority = this.values[leftIndex]?.priority !== undefined ? this.values[leftIndex]?.priority : -Infinity;
      const rightPriority = this.values[rightIndex]?.priority  !== undefined ? this.values[rightIndex]?.priority : -Infinity;

      if (leftPriority >= rightPriority && leftPriority > node?.priority) {
        swap(this.values, leftIndex, index);
        index = leftIndex;
      } else if (rightPriority >= leftPriority && rightPriority > node?.priority) {
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
// const priorityQueue = new MaxPriorityQueue();

// getRandomArray(25, 10).forEach((val) => {
//   priorityQueue.enqueue(val, val);
// });

// while(true) {
//   const next = priorityQueue.dequeue();

//   if (next) {
//     console.log(next);
//   } else {
//     break;
//   }
// }