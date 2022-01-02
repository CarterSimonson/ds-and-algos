// This aint it
// function insertionSort(arr) {
//   if (!arr || arr.length === 0) {
//     return arr;
//   }

//   let sorted = [arr[0]];

//   for (let i = 1; i < arr.length; i++) {
//     for (let j = 0; j < sorted.length; j++) {
//       if (j === sorted.length) {
//         sorted.push(arr[i]);
//         break;
//       } else if (arr[i] < sorted[j]) {
//         sorted.splice(j, 0, arr[i]);
//         break;
//       }
//     }
//   }

//   return sorted;
// }

function moveElement(arr, startIndex, endIndex) {
  const val = arr[startIndex];
	arr.splice(startIndex, 1);
  arr.splice(endIndex, 0, val);
  return arr;
}

function insertionSort(arr) {
  if (!arr || arr.length === 0) {
    return arr;
  }

  for (let i = 1; i < arr.length; i++) {
    const selectedValue = arr[i];

    // loop through all previous elements
    for (let j = i - 1; j >= 0; j--) {
      const comparisonValue = arr[j];

      if (selectedValue > comparisonValue) {
        moveElement(arr, i, j + 1);
        break;
      } else if (j === 0) {
        moveElement(arr, i, 0);
      }
    }
  }

  return arr;
}

console.log(insertionSort([7, 2, 6, 1, 5]));