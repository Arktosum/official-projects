const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const score = document.getElementById("score")
const time = document.getElementById("time")



const CELL_SIZE = 100;
const CELL_GAP = 2
const GRID_SIZE = 20
const OUT_CELL = CELL_SIZE + 2*CELL_GAP
var SPEED = 5

const BOARD_COLOR = '#d3d3d3'
const HEAD_COLOR = 'yellow'
const BODY_COLOR = 'green'
const FOOD_COLOR = 'red'

canvas.width = GRID_SIZE * OUT_CELL
canvas.height = GRID_SIZE * OUT_CELL


function Rect(pos,width,height,color){
    ctx.fillStyle = color
    ctx.fillRect(pos.x,pos.y,width,height)
}

Rect({x:0,y:0},canvas.width,canvas.height,'black')

function FOR(length,func){
    for(let i = 0 ; i < length ; i++){
        func(i)
    }
}

function DFOR(length1,length2,func){
    for(let i = 0 ; i < length1 ; i++){
        for(let j = 0 ; j < length2 ; j++){
            func(i,j)
        }
    }
}

function placeCell(pos,color){
    Rect({x:pos.x*OUT_CELL + CELL_GAP , y: pos.y*OUT_CELL + CELL_GAP},CELL_SIZE,CELL_SIZE,color)
}




function insideGrid(pos){
    if(pos.x >= 0 && pos.x <=GRID_SIZE && pos.y >= 0 && pos.y<GRID_SIZE){
        return true
    }
    return false
}

function equalCoords(pos1,pos2){
    if(pos1.x == pos2.x && pos1.y == pos2.y){
        return true
    }
    return false
}

function getRandomNumber(min,max){
    return Math.floor(Math.random()*(max-min) + min)
}



document.body.appendChild(canvas)


class Pos{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

function displaySnake(Snake){ 
    for(let i= 0 ; i<Snake.length ; i++){
        if(i==0){
            placeCell(Snake[i],HEAD_COLOR)
        }
        else{
            placeCell(Snake[i],BODY_COLOR)
        }
    }
    
}


function getFood(Snake){
    let x = getRandomNumber(1,GRID_SIZE-2)
    let y = getRandomNumber(1,GRID_SIZE-2)
    for(let body of Snake){
        if (equalCoords({x,y},body)){
            return getFood(Snake)
        }
    }
    return new Pos(x,y)
}

// Place Head at Middle of the board
let HeadPos = new Pos(Math.floor(GRID_SIZE/2),Math.floor(GRID_SIZE/2));
let Snake = [HeadPos]
let foodPos = getFood(Snake)
displaySnake(Snake)



let inputDir = new Pos(0,0)

function updateHead(){
    let head = Snake[0]
    let oldPos = {x: head.x, y: head.y}
    head.x += inputDir.x
    head.y += inputDir.y
    return oldPos
}
function updateSnake(OldHead){
    let NEW = OldHead
    for(let i=0; i<Snake.length; i++){
        if (i!=0){
            //store
            let old = Snake[i]
            // update
            Snake[i] = NEW
            // propagate
            NEW = old
        }
    }
}

function gameOver(){
    let head = Snake[0]
    let hitBoundary = ()=>{
        let hit = false
        DFOR(GRID_SIZE,GRID_SIZE,(i,j)=>{
            if (i==0 || j==0 || i == GRID_SIZE -1 || j == GRID_SIZE-1){
                if (head.x == 0 || head.y == 0 || head.x == GRID_SIZE-1 || head.y == GRID_SIZE-1){
                    console.log("hit")
                    hit = true;
                }
                placeCell({x:i,y:j},"orange")
            }
        }) 
        return hit
    }
    let hitBody = ()=>{
        for(let i=0; i<Snake.length ; i++){
            if(i!=0){
                if(equalCoords(head,Snake[i])){
                    return true
                }
            }
        }
        return false
    }
    return hitBoundary() || hitBody()
}

let timeCount = 0
let scoreCount = 0
let lastRenderTime = 0
function animate(currentTime){
    requestAnimationFrame(animate)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SPEED) return
    time.innerHTML = `Time: ${Math.floor(timeCount++ / SPEED)}`
    let drawBoard = ()=>{
        DFOR(GRID_SIZE,GRID_SIZE,(i,j)=>{
            placeCell({x:i,y:j},BOARD_COLOR)
        })
    }
    drawBoard()
    let oldHeadPos = updateHead()
    if(gameOver()){
        if(!alert('game over!')){
            window.location.reload()
        }
        
        return
    }
    updateSnake(oldHeadPos)
    placeCell(foodPos,FOOD_COLOR)
    if(equalCoords(Snake[0],foodPos)){
        score.innerHTML = `Score: ${++scoreCount}`
        let tail = Snake.slice(-1)[0]
        console.log(tail)
        let newSegmentPos = new Pos(tail.x-inputDir.x, tail.y-inputDir.y)
        Snake.push(newSegmentPos)
        foodPos = getFood(Snake)
        SPEED +=1
    }
    displaySnake(Snake)
    lastRenderTime = currentTime

}
animate()



document.body.addEventListener('keydown',(e)=>{
    let key = e.key
    switch(key){
        case 'ArrowUp' : if(inputDir.y != 1){
                        inputDir.x = 0
                        inputDir.y = -1
                    }
                break;
        case 'ArrowDown' :if(inputDir.y != -1){
                        inputDir.x = 0
                        inputDir.y = 1
                    }
                break;
        case 'ArrowLeft' : if(inputDir.x != 1){
                        inputDir.x = -1
                        inputDir.y = 0
                    }
                break;
        case 'ArrowRight' : if(inputDir.x != -1){
                        inputDir.x = 1
                        inputDir.y = 0
                    }
                break;
        default : break;
    }
})