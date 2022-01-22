class Node {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }

  setVal(val) {
    this.val = val;
  }

  setPrev(node) {
    this.prev = node;
  }

  setNext(node) {
    this.next = node;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const node = new Node(val);

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      node.setPrev(this.tail);
      this.tail.setNext(node);
      this.tail = node;
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }
    
    const popped = this.tail;
    if (popped.prev) {
      this.tail = popped.prev;
      this.tail.setNext(null);
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return popped;
  }

  unshift(val) {
    const node = new Node(val);
    
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      const unshifted = this.head;
      this.head = node;
      this.head.setNext(unshifted);
      unshifted.setPrev(this.head);
    }

    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }
    
    const shifted = this.head;
    if (shifted.next) {
      this.head = shifted.next;
      this.head.setPrev(null);
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return shifted;
  }

  get(index) {
    let count = 0;
    let currentNode = this.head;

    while(currentNode) {
      if (count === index) {
        return currentNode;
      }

      count += 1;
      currentNode = currentNode.next;
    }

    return null;
  }

  set(index, val) {
    const node = this.get(index);

    if (node) node.setVal(val);
    return Boolean(node);
  }

  insert(index, val) {
    const node = new Node(val);

    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      this.unshift(val);
    } else if (index === this.length) {
      this.push(val);
    } else if (index <= this.length) {
      const prev = this.get(index - 1);
      const next = prev.next;
      prev.setNext(node);
      next.setPrev(node);
      node.setPrev(prev);
      node.setNext(next);
    }

    this.length++;
    return true;
  }

  remove(index) {
    let removed;

    if (index < 0 || index >= this.length) {
      return undefined;
    } else if (index === 0) {
      removed = this.shift();
    } else if (index === this.length - 1) {
      removed = this.pop();
    } else {
      const node = this.get(index);
      const prev = node.prev;
      const next = node.next;
      prev.setNext(next);
      next.setPrev(prev);

      removed = node;
    }

    this.length--;
    return removed;
  }

  reverse() {
    let current = this.tail;

    while(current) {
      const prev = current.prev;
      const next = current.next;

      current.setPrev(next);
      current.setNext(prev);

      current = prev;
    }

    const tail = this.tail;
    this.tail = this.head;
    this.head = tail;
    return this;
  }

  log() {
    let output = "";
    let node = this.head;
    
    while(node) {
      output += node.val;

      if (node.next) {
        output += " <-> ";
      }

      node = node.next;
    }

    console.log(output);
  }
}

const list = new DoublyLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.log();