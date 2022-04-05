const visualizer = document.querySelector('#visualizer')
const arraySize = document.querySelector('#array-size')
const speedControl = document.querySelector('#change-speed')


function delay(ms) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, ms); 
    }) 
}

const BAR_GAP = 1
const BAR_WIDTH = 10
const BAR_SCALE = 4
const BAR_COLOR = 'lightblue'
const BAR_COMP_COLOR = 'blue'
const BAR_SORTED_COLOR = 'green'

var ARR_SIZE = 2
const ARR_START = 2
const ARR_END = 100
var DELAY = 1000




var ARRAY = new Array()

arraySize.addEventListener('input',(e)=>{
    ARR_SIZE = arraySize.value 
    generateBarArray()
})
speedControl.addEventListener('input',(e)=>{
    DELAY = 1000 / speedControl.value 
})
class Bar{
    constructor(width,height,scale,color){
        this.width = width
        this.height = height
        this.scale = scale
        this.color = color
        this.createBar()
    }
    createBar(){
        this.bar = document.createElement('div')
        this.bar.setAttribute('class', 'bar')
        this.bar.style.width = `${this.width}px`
        this.bar.style.height = `${this.height * this.scale}px`
        this.bar.style.backgroundColor = `${this.color}`
        this.bar.style.marginRight = `${BAR_GAP}px`
        //this.bar.textContent = `${this.height}`
        //this.bar.TextAlign = 'center'
    }
    displayBar(){
        visualizer.appendChild(this.bar)
    }
}

function getRandomArray(size,start,end){
    let arr = new Array()
    for(let i = 0 ; i < size ; i++){
        arr.push(Math.round(Math.random()*end) + start)
    }
    return arr
}


function displayBars(){
    visualizer.innerHTML = ``
    ARRAY.forEach((bar) => {
        bar.displayBar()
    })
}

function getBarArray(){
    number_array = getRandomArray(ARR_SIZE,ARR_START,ARR_END)
    number_array.forEach((height)=>{
        const bar = new Bar(BAR_WIDTH,height,BAR_SCALE,BAR_COLOR)
        ARRAY.push(bar)
    })
}

function generateBarArray(){
    ARRAY = []
    getBarArray()
    displayBars()
}

async function bubbleSort(){
    for(let i = 0; i < ARRAY.length-1 ; i++){
        for(let j = 0; j < ARRAY.length - i - 1 ; j++){
            ARRAY[j].bar.style.backgroundColor = BAR_COMP_COLOR
            ARRAY[j+1].bar.style.backgroundColor = BAR_COMP_COLOR
            displayBars()
            if(ARRAY[j].height > ARRAY[j+1].height){
                await delay(DELAY)
                let temp = ARRAY[j]
                ARRAY[j] = ARRAY[j+1]
                ARRAY[j+1] = temp
            }
            ARRAY[j].bar.style.backgroundColor = BAR_COLOR
            ARRAY[j+1].bar.style.backgroundColor = BAR_COLOR
        }
        ARRAY[ARRAY.length-1-i].bar.style.backgroundColor = BAR_SORTED_COLOR;
    }
    ARRAY[0].bar.style.backgroundColor = BAR_SORTED_COLOR
}

