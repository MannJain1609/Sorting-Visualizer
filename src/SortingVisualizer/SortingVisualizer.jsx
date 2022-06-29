import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort'
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort';
import { getInsertionSortAnimations } from '../sortingAlgorithms/InsertionSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';

const ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const WINDOW_WIDTH = window.screen.width;
const NUMBER_OF_ARRAY_BARS = (WINDOW_WIDTH-500)/15;
const WINDOW_HEIGHT = window.screen.height;

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
            array.push(randomIntFromInterval(10,WINDOW_HEIGHT-320));
        }
        this.setState({array});
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0; i<animations.length; i++) {
            const barOneStyle = arrayBars[animations[i][0]].style;
            const barTwoStyle = arrayBars[animations[i][1]].style;
            setTimeout(() => {
                if(animations[i][2] === 'color') {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                } else if(animations[i][2] === 'revert') {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                } else {
                    [barOneStyle.height, barTwoStyle.height] = 
                        [barTwoStyle.height, barOneStyle.height];
                }
            }, i*ANIMATION_SPEED_MS);
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i=0; i<animations.length; i++) {
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
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0; i<animations.length; i++) {
            const barOneStyle = arrayBars[animations[i][0]].style;
            const barTwoStyle = arrayBars[animations[i][1]].style;
            setTimeout(() => {
                if(animations[i][2] === 'color') {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                } else if(animations[i][2] === 'revert') {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                } else {
                    [barOneStyle.height, barTwoStyle.height] = 
                        [barTwoStyle.height, barOneStyle.height];
                }
            }, i*ANIMATION_SPEED_MS);
        }
    }

    InsertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0; i<animations.length; i++) {
            const barOneStyle = arrayBars[animations[i][0]].style;
            const barTwoStyle = arrayBars[animations[i][1]].style;
            setTimeout(() => {
                if(animations[i][2] === 'color') {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                } else if(animations[i][2] === 'revert') {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                } else {
                    [barOneStyle.height, barTwoStyle.height] = 
                        [barTwoStyle.height, barOneStyle.height];
                }
            }, i * ANIMATION_SPEED_MS);
        }
    }


    render() {
        const {array} = this.state;
        return (
            <>
            <div className = "buttons">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.InsertionSort()}>Insertion Sort</button>
            </div>
            <p><i>NOTE: Do not try different sorts simultaneously, that case will not sort the array</i></p>
            <div className="array-container">
                {array.map((value,idx) => (
                    <div className = "array-bar"
                    key = {idx}
                    style = {{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`,
                    }}></div>
                ))}
            </div>
            </>
        );
    }
}


function randomIntFromInterval(min,max) {
    //min and max are included
    return Math.floor(Math.random() * (max-min+1) + min);
}
