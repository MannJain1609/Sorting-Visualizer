export function getMergeSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSort(auxiliaryArray,0,array.length-1, animations);
    return animations;
}

function mergeSort(
    arr,
    left,
    right,
    animations
) {
   if(left<right) {
       const mid = Math.floor((left+right)/2);

       mergeSort(arr,left,mid,animations);
       mergeSort(arr,mid+1,right,animations);

       merge(arr,left,mid,right,animations);
   }
}

function merge(
    arr,
    left,
    mid,
    right,
    animations
) {
    const copyArr = arr.slice();
    let k = left;
    let i = left;
    let j = mid+1;
    while(i <= mid && j <= right) {
        //change the color of two indices to be compared
        animations.push([i,j]);
        //revert the color change
        animations.push([i,j]);

        if(arr[i] <= arr[j]) {
            //we overwrite the value of arr[i] at position k
            animations.push([k,arr[i]]);
            copyArr[k++] = arr[i++];
        } else {
             //we overwrite the value of arr[j] at position k
            animations.push([k,arr[j]]);
            copyArr[k++] = arr[j++];
        }
    }
    //The same thing for remaining left or right arrays
    while(i <= mid)
    {
        //i == k
        animations.push([i, k]);
        animations.push([i, k]);

        animations.push([k, arr[i]]);
        copyArr[k++] = arr[i++];
    }
    while(j <= right) {
        //j == k
        animations.push([j, k]);
        animations.push([j, k]);

        animations.push([k, arr[j]]);
        copyArr[k++] = arr[j++];
    }

    //Copy the copyArr in the mainArray
    for(i = left; i<=right; i++)
        arr[i] = copyArr[i];
}

// export const mergeSort = array => {
//     if(array.length === 1) return array;
//     const mid = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0,mid+1));
//     const secondHalf = mergeSort(array.slice(mid+1));
//     const sortedArray = [];

//     let i=0,j=0;
//     while(i<firstHalf.length && j<secondHalf.length) {
//         if(firstHalf[i] < secondHalf[j]) {
//             sortedArray.push(firstHalf[i++]);
//         } else {
//             sortedArray.push(secondHalf[j++]);
//         }
//     }
//     while(i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// }

