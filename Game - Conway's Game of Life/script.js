const gridElement = document.createElement('div');
const startBtn = document.getElementById('start-btn')

const GRID_SIZE = 20
const CELL_SIZE = 100
gridElement.style.display = 'grid'
gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE},${CELL_SIZE}px)`
document.body.appendChild(gridElement)


class Cell{
    constructor(state,id){
        this.cell = document.createElement('div');
        this.cell.id = id;
        this.cell.style.width = CELL_SIZE + 'px'
        this.cell.style.height = CELL_SIZE + 'px'
        this.cell.style.border = `1px solid black`
        this.cell.addEventListener('click',(e)=>{
            let x , y
            [x,y] = e.target.id.split('-')
            console.log(x,y)
            if (myBoard[x][y]){
                myBoard[x][y] = 0
            }
            else{
                myBoard[x][y] = 1
            }
            displayBoard(myBoard)
        })
        this.state = state
        if (state){
            this.cell.setAttribute('class','live-cell')
        }
        else{
            this.cell.setAttribute('class','dead-cell')
        }
    }
}


function initBoard(){
    let board = [];
    for (let i = 0; i < GRID_SIZE ; i++){
        let subArray = []
        for(let j = 0; j < GRID_SIZE ; j++){
            subArray.push(0)
        }
        board.push(subArray)
    }
    return board
}



function displayBoard(board){
    gridElement.innerHTML = ``
    for(let i = 0; i < GRID_SIZE ; i++){
        for(let j = 0; j < GRID_SIZE ; j++){
            let cell = new Cell(board[i][j],`${i}-${j}`)
            gridElement.appendChild(cell.cell)
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isInbounds(x,y){
    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE){
        return true
    }
    return false
}

function GetNeighbors(r,c){
    let neighbours = [
        [r-1,c-1],[r-1,c],[r-1,c+1],
        [r,c-1],[r,c+1],
        [r+1,c-1],[r+1,c],[r+1,c+1],
                        ]
    let NEIGHBOURS = []
    for(let i = 0; i < neighbours.length; i++){
        let x = neighbours[i][0]
        let y = neighbours[i][1]
        if(isInbounds(x,y)){
            NEIGHBOURS.push([x,y])
        }
    }
    return NEIGHBOURS
}

function nextIteration(board){
    let changes = []
    let count = 0
    for(let i = 0; i < GRID_SIZE ; i++){
        for(let j = 0; j < GRID_SIZE ; j++){
            let neighbours = GetNeighbors(i,j)
            let liveCount = 0
            let deadCount = 0
            neighbours.forEach((Ncell)=>{
                let x = Ncell[0]
                let y = Ncell[1]

                if (board[x][y]){
                    liveCount++
                }
                else{
                    deadCount++
                }
            })
            if (board[i][j]){
                if (liveCount < 2){
                    changes.push([i,j,0])
                }
                if(liveCount > 3){
                    changes.push([i,j,0])
                }
            }
            else{
                if(liveCount == 3){
                    changes.push([i,j,1])
                }
            }
        }
    
    }
    return changes
}

let myBoard = initBoard()


displayBoard(myBoard)

startBtn.addEventListener('click',async ()=>{
    while (true){
        let changes = nextIteration(myBoard)
    changes.forEach((change)=>{
        let x = change[0]
        let y = change[1]
        let state = change[2]
        myBoard[x][y] = state
    })
    displayBoard(myBoard)
    await sleep(1000*0.5)
    }
})
