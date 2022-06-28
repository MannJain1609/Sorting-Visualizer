import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations, getmergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'

const ANIMATION_SPEED_MS = 3;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const NUMBER_OF_ARRAY_BARS = 310;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i=0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }

    bubbleSort() {

    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i=0; i<animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //2 wale case me overwrite krna h
            const isColorChange = i%3 !== 2;
            if(isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i%3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barIdx, newHeight] = animations[i];
                    const barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {

    }

    heapSort() {

    }

    testSortingAlgorithms() {
        // const jsSortedArray = this.state.array.slice().sort((a,b) => a-b);
        // const mergeSortedArray = mergeSort(this.state.array);
        // console.log(arraysAreEqual(jsSortedArray,mergeSortedArray));
    }

    render() {
        const {array} = this.state;
        return (
            <div className="array-container">
                {array.map((value,idx) => (
                    <div className = "array-bar"
                    key = {idx}
                    style = {{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        );
    }
}


function randomIntFromInterval(min,max) {
    //min and max are included
    return Math.floor(Math.random() * (max-min+1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }