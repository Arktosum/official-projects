const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

canvas.width = 1920
canvas.height = 1080



c.fillRect(0, 0, canvas.width, canvas.height)


function getRandomArray(end,size){
    let array = new Array();
    for(let i=0; i< size; i++){
        array.push(Math.round(Math.random()*end))
    }
    return array
}


class Bar{
    constructor(width,height,position) {
        this.width = width
        this.height = height
        this.x = position.x
        this.y = position.y
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Visualizer{
    constructor(){

        this.BARWIDTH = 100
        this.BARHEIGHTSCALE = 10
        this.BARCOUNT = 20
        this.BARGAP = 5
        this.arrayObj = new Array();
        let array = getRandomArray(100,this.BARCOUNT)
        for(let i=0; i< array.length ; i++){
            this.arrayObj.push(new Bar(this.BARWIDTH, array[i]*this.BARHEIGHTSCALE,
                {
                'x' : i * (this.BARWIDTH + this.BARGAP), 
                'y' : canvas.height - array[i]*this.BARHEIGHTSCALE
                }))
        }
    }
    drawAll(){
        for(let i = 0 ; i < this.arrayObj.length ; i++){
            this.arrayObj[i].draw()
        }
    }
}


function swap(arr,x,y){
    let temp = arr[x]
    arr[x] = arr[y]
    arr[y] = temp
}




vis = new Visualizer()
vis.drawAll()
