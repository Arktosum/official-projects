const chessBoard = document.querySelector('#chess-board')

export default function createChessBoard(){
    let board = []
    let checker = 0
    for(let i = 0; i < 8 ; i++){
        let subarray = []
        checker = !checker
        for(let j = 0; j < 8 ; j++){
            // Creating elements for each cell
            const cell = document.createElement('div')
            cell.classList.add('cell')
            if (checker){
                cell.classList.add('c1')
            }
            else{
                cell.classList.add('c2')
            }
            checker = !checker
            cell.id = `${i}${j}`

            //Finished Cell

            chessBoard.appendChild(cell)
            subarray.push(cell)
        }
        board.push(subarray)
    }
    return board
}