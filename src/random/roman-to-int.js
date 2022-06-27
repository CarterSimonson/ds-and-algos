var romanToInt = function(s) {
  const values = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
  };

  const specialCases = {
    "I": ["X", "V"],
    "X": ["L", "C"],
    "C": ["D", "M"]
  }

  let total = 0;
  let index = 0;

  while(index < s.length) {
    const char = s.charAt(index);
    const nextChar = s.charAt(index + 1);

    let isSpecialCase = false;
    for (const val of specialCases[char] || []) {
      if (val === nextChar) {
        isSpecialCase = true;
      }
    }

    if (isSpecialCase) {
      total += values[nextChar] - values[char];
      index += 2;
    } else {
      total += values[char];
      index += 1;
    }
  }

  return total;
}

// Examples:
// III -> 3
// LVIII -> 58
// MCMXCIV -> 1994
console.log(romanToInt("III"));
console.log(romanToInt("LVIII"));
console.log(romanToInt("MCMXCIV"));