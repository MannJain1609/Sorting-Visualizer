export function getBubbleSortAnimations(array) {
    const animations = [];
    if(array.length<=1)
        return animations;
    const auxiliaryArray = array.slice();
    BubbleSort(auxiliaryArray, animations);
    return animations;
}

function BubbleSort(array, animations) {
    const size = array.length;
    for(let i =0; i<size; i++) {
        for(let j =0; j<size-i-1; j++) {
            animations.push([j,j+1,'color']);
            animations.push([j,j+1,'revert']);
            if(array[j]>array[j+1]) {
                animations.push([j,j+1,'swap']);
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
}