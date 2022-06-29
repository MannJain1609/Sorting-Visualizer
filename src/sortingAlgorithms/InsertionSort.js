export function getInsertionSortAnimations(array) {
    const animations = [];
    
    if(array.length <= 1)
        return animations;
    const auxiliaryArray = array.slice();
    insertionSort(auxiliaryArray,animations);
    return animations;
}

function insertionSort(array,animations) {
    for(let i=1; i<array.length; i++) {
        let j = i;
        while(j>0 && array[j-1]>array[j])
        {
            animations.push([j,j-1,'color']);
            animations.push([j,j-1,'revert']);
            animations.push([j,j-1,'swap']);
            [array[j], array[j-1]] = [array[j-1], array[j]];
            j--;
        }
    }
}