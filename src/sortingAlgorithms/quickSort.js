export function getQuickSortAnimations(array) {
    const animations = [];

    if(array.length <= 1)
        return animations;
    const auxiliaryArray = array.slice();
    quickSort(auxiliaryArray,0,array.length-1, animations);
    return animations;
}

function quickSort(array,left,right,animations) {
    if(left < right) {
        const index = partition(array,left,right,animations);
        quickSort(array,left,index-1,animations);
        quickSort(array,index+1,right,animations);
    }
}

function partition(array,left,right,animations) {
    const pivot = array[right];
    let i = left;

    for(let j=left; j<right; j++) {
        animations.push([i,j,'color']);
        animations.push([i,j,'revert']);

        if(array[j]<=pivot) {
            animations.push([i,j,'swap']);
            [array[i], array[j]] = [array[j], array[i]];
            i++;
        }
    }

    animations.push([i,right,'color']);
    animations.push([i,right,'revert']);
    animations.push([i,right,'swap']);
    [array[i], array[right]] = [array[right], array[i]];
    return i;
}