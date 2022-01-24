// Disclaimer: this is a VERY basic hash function implementation.
function hash(key, arrayLen) {
  let total = 0;
  const multiplier = 31; // weird prime

  for (let char of key) {
    // map "a" to 1, "b" to 2, etc...
    const value = char.charCodeAt(0) - 96;
    total += value * multiplier;
  }

  return total % arrayLen;
}

function searchChain(key, chain) {
  for (const entry of chain) {
    if (entry[0] === key) {
      return entry;
    }
  }
}

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  set(key, value) {
    const index = hash(key, this.keyMap.length);
    const chain = this.keyMap[index] || [];
    const entry = searchChain(key, chain);

    if (entry) {
      entry = [key, value];
    } else {
      this.keyMap[index] = [...chain, [key, value]];
    }
  }

  get(key) {
    const index = hash(key, this.keyMap.length);
    const chain = this.keyMap[index] || [];
    const entry = searchChain(key, chain);

    return entry ? entry[1] : undefined;
  }

  keys() {
    const keys = [];

    this.keyMap.forEach((chain) => {
      if (chain) chain.forEach(([key]) => keys.push(key));
    });

    return keys;
  }

  values() {
    const values = [];

    this.keyMap.forEach((chain) => {
      if (chain) chain.forEach(([, val]) => values.push(val));
    });

    return values;
  }
}

const hashTable = new HashTable();

hashTable.set('red', '#FF0000');
hashTable.set('green', '#00FF00');
hashTable.set('blue', '#0000FF');
hashTable.set('yellow', '#FFFF00');

console.log(`red: ${hashTable.get('red')}`);
console.log(`green: ${hashTable.get('green')}`);
console.log(`blue: ${hashTable.get('blue')}`);
console.log(`yellow: ${hashTable.get('yellow')}`);

console.log(hashTable.keys());
console.log(hashTable.values());