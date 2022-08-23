import React from 'react';
import './SortingVisualizer.css';

//Animation Speed in ms
let speed = 1;
// Change this value for the number of bars (value) in the array.
let numberOfBars = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'lightblue';

let comparedArray = []; 

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
    for (let i = 0; i < numberOfBars; i++) {
      array.push(Math.floor(Math.random()* 300)+5);
    }
    this.setState({array});
  }

  setBarsandSpeed(){
    const bar = document.getElementById('number'); 
    const actionSpeed = document.getElementById('speed'); 
    if(bar.value > 250){
        return; 
    }
    numberOfBars = bar.value;
    speed = actionSpeed.value; 
    this.resetArray(); 
  }

  showArray(array){
      console.log(array);
  }

  async showAnimations(){
      const arrayBars = document.getElementsByClassName('array-bar'); 
      for(let i =0; i < comparedArray.length; i ++){
        let bar1 = arrayBars[comparedArray[i][0]].style; 
        let bar2 = arrayBars[comparedArray[i][1]].style; 
        bar1.backgroundColor = 'red'; 
        bar2.backgroundColor = 'red'; 
        await new Promise((resolve) => setTimeout(resolve, speed)); 
        bar1.backgroundColor = 'lightblue'; 
        bar2.backgroundColor = 'lightblue'; 
      }
    }



  //normal merge sort but during the comparison phase we somehow get the index of the lines we are comparing in the original 
  //array so we can show that we are testing the two and when the elements are swapped we have a way of doing that visually
  showSolution(array){
      let bars = document.getElementsByClassName('array-bar'); 
        for(let i =0; i < array.length; i++){
            bars[i].style.height = `${array[i]}px`; 
        }
    }
  async mergeSortHelper(array, left, right){
    this.mergeSort(array, left, right); 
    this.showAnimations(); 
    await new Promise((resolve) => setTimeout(resolve, numberOfBars* 30)); 
    this.showSolution(array); 
  }
  mergeSort(array, left, right){
    if(right > left){
        let mid = Math.floor(left + (right-left)/ 2); 
        this.mergeSort(array, left, mid); 
        this.mergeSort(array, mid+1, right); 
        this.merge(array, left, mid, right); 
    }
  }

  merge(array, left, mid, right){ 
      let n1 = mid - left +1; 
      let n2 = right - mid; 
      let leftArray = [n1]; 
      let rightArray = [n2]; 
      for(let i = 0; i < n1; i++){
          leftArray[i] = array[left+i]; 
      }
      for(let j = 0; j < n2; j++){
          rightArray[j] = array[mid +1+ j]; 
      }
      let i = 0; 
      let j = 0; 
      let k = left; 
      while(i < n1 && j < n2){
          comparedArray.push([k, mid + j + 1]); 
          if(leftArray[i] <= rightArray[j]){ 
              array[k] = leftArray[i]; 
              i++; 
          }
          else{
            array[k] = rightArray[j]; 
            j++; 
          }
          k++; 
      }
      while(i < n1){
          array[k] = leftArray[i]; 
          i++; 
          k++; 
      }
      while(j < n2){
          array[k] = rightArray[j]; 
          j++; 
          k++; 
      }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }



  render() {
    const {array} = this.state;
    return (
        <div className = "main-container">
            <div className = "options-container">
                <label htmlFor = "bars">Enter the number of bars you would like (max: 250): </label>
                <input id = 'number' name = "bars" type = "number"  max = "250" defaultValue={200}></input>
                <label htmlFor = "speed">Enter the speed in ms for each action</label>
                <input id = "speed" name = "speed" type = "number" defaultValue={3}></input>
                <button onClick = {() => this.setBarsandSpeed()}>Go!</button>
            </div>
            <div className = "array-container">
                {array.map((value, idx) =>(
                    <div className = "array-bar"
                    key = {idx}
                    style = {{
                        backgroundColor: PRIMARY_COLOR, 
                        height: `${value}px`
                    }}></div>
                ))}
            </div>
            <div className = "buttons-container">
                <button onClick = {() => this.resetArray()}>Reset Array</button>
                <button onClick = {() => this.mergeSortHelper(array, 0, array.length -1)}>Merge Sort</button>
                <button onClick = {() => this.showArray(array)}>show array</button>
            </div>
        </div>

    );
  }
}


