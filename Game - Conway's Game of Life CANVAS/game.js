const canvas  = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.style.backgroundColor = 'black'

const CELL_SIZE = 400
const GRID_SIZE = 6
const CELL_GAP = 20
canvas.width = (GRID_SIZE * CELL_SIZE) + CELL_GAP
canvas.height =  (GRID_SIZE * CELL_SIZE) + CELL_GAP

document.body.appendChild(canvas)


function Rect(x,y,width,height,color){
    ctx.fillStyle = color
    ctx.fillRect(x,y,width,height)
}

function RandomNumber(min,max){
    return Math.floor(Math.random() * (max - min) + min)
}


Rect(0,0,canvas.width,canvas.height,'black')


function gridSelect(x,y,color){
    Rect((x*CELL_SIZE)+CELL_GAP,(y*CELL_SIZE)+CELL_GAP,CELL_SIZE-CELL_GAP,CELL_SIZE-CELL_GAP,color)
}


function initBoard(){
    let board = []
    for(let i=0;i<GRID_SIZE ; i++){
        let subArray = []
        for(let j=0;j<GRID_SIZE ; j++){
            subArray.push(0)
        }
        board.push(subArray)
    }
    return board
}



function displayBoard(board){
    for(let i=0;i < GRID_SIZE ; i++){
        for(let j= 0;j < GRID_SIZE ; j++){
            switch(board[i][j]){
                case 0: gridSelect(i,j,'#d3d3d3');
                        break;
                case 1: gridSelect(i,j,'yellow');
                        break;
            }
        }
    }
}

function inBounds(r,c){
    if (r >= 0 && r < GRID_SIZE && c>= 0 && c < GRID_SIZE){
        return true
    }
    return false
}
function neighbourCells(r,c){
    let neighbours = [
        [r-1,c-1],[r-1,c],[r-1,c+1],
        [r,c-1],[r,c+1],
        [r+1,c-1],[r+1,c],[r+1,c+1]
    ]
    let validNeighbours = []
    for(let neighbor of neighbours){
        let x = neighbor[0]
        let y = neighbor[1]
        if (inBounds(x,y)){
            validNeighbours.push(neighbor)
        }
    }
    return validNeighbours
}

function turnMove(board){
    let changes = []
    for(let i = 0 ; i < GRID_SIZE ; i++){
        for(let j = 0 ; j < GRID_SIZE ; j++){
            // For Every Cell
            let state = board[i][j]
            let validNeighbors = neighbourCells(i,j)
            let liveCount = 0
            let deadCount = 0
            for(let neighbor of validNeighbors){
                let x = neighbor[0]
                let y = neighbor[1]
                switch(board[x][y]){
                    case 0 : deadCount++;
                            break;
                    case 1 : liveCount++;
                            break;
                }
            }
            // Cell is alive
            if(state == 1){
                // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                if (liveCount < 2){
                    changes.push([i,j,0])
                }
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                else if (liveCount > 3){
                    changes.push([i,j,0])
                }
            }
            else{
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if(liveCount == 3){
                    changes.push([i,j,1])
                }
                
            }
            
        }
        
    }
    return changes
}

let board = initBoard()
displayBoard(board)

board = [
    [0,0,0,0,0,0],
    [0,0,0,1,0,0],
    [0,1,0,1,0,0],
    [0,0,1,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
]

displayBoard(board)






let lastRenderTime = 0
const SPEED = 2

function animate(currentTime){
    requestAnimationFrame(animate)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SPEED) return

    let changes = turnMove(board)

    for(let change of changes){
        let x = change[0]
        let y = change[1]
        let state = change[2]
        board[x][y] = state
    }
    displayBoard(board)

    lastRenderTime = currentTime

}
animate()