function binarySearch(values, search){
    let start = 0;
    let end = values.length - 1;
    
    while(end - start >= 0) {
        const middle = Math.floor((end + start) / 2);
        const middleEl = values[middle];
        
        if (middleEl === search) {
            return middle;
        } else if (middleEl < search) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    
    return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5], 2));