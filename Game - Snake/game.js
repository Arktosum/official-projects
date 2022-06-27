const gridElement  = document.createElement('div');


const GRID_SIZE = 10;
const CELL_SIZE = 100;

gridElement.style.display  = `grid`;
gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE},${CELL_SIZE}px)`
document.body.appendChild(gridElement);

class Cell{
    constructor(state,id){
        // 0 : 'none'
        // 1 : 'snake'
        // 2 : 'food'
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = CELL_SIZE + 'px';
        cell.style.height = CELL_SIZE + 'px';
        cell.id = id;
        switch(state){
            case 1 : cell.classList.add('snake-cell');
                    break;
            case 2 : cell.classList.add('food-cell')
                    break;
        }
        return cell;
    }
}



function initBoard(){
    let board = new Array();
    for(let i = 0; i < GRID_SIZE ; i++){
        let subArray = new Array();
        for(let j = 0; j < GRID_SIZE ; j++){
            subArray.push(0);
        }
        board.push(subArray);
    }
    return board;
}

function displayBoard(board){
    gridElement.innerHTML = ``
    for(let i = 0; i < GRID_SIZE ; i++){
        for(let j = 0; j < GRID_SIZE ; j++){
            let cell = new Cell(board[i][j],`${i}${j}`)
            gridElement.appendChild(cell);
        }
    }
}


function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 

function placeSnake(board,x,y){
    board[x][y] = 1
    displayBoard(board)
    return {x,y}
}

function placeFood(board,snakePos){
    let x = randomNumber(0,GRID_SIZE-1);
    let y = randomNumber(0,GRID_SIZE-1);
    if (x == snakePos[0] && y == snakePos[1]){
        return placeFood(board,snakePos)
    }
    board[x][y] = 2
    displayBoard(board)
    return {x,y}
}

function checkEat(snakePos,foodPos){
    if (snakePos.x == foodPos.x && snakePos.y == foodPos.y){
        return true
    }
    return false
}
let board = initBoard();
displayBoard(board);
let x = randomNumber(0,GRID_SIZE-1);
let y = randomNumber(0,GRID_SIZE-1);
let snakeHead = placeSnake(board,x,y);
let foodPos = placeFood(board,snakeHead)
let snakeBody = snakeHead
let snakeBodyArray = [snakeHead]



document.body.addEventListener('keypress',(e)=>{
    console.log(snakeBody)
    let key = e.key
    switch(key){
        case 'w' : snakeBody.x -= 1
                break;
        case 's' : snakeBody.x += 1
                break;
        case 'a' : snakeBody.y -= 1
                break;
        case 'd' : snakeBody.y += 1
                break;
        default : return
    }
    snakeBodyArray.forEach((cell)=>{
        cell.x = snakeBody.x
        cell.y = snakeBody.y
        placeSnake(board,cell.x,cell.y)
    })
    console.log(checkEat(snakeHead,foodPos))
})







