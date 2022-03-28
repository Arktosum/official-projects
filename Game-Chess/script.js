const cells = document.getElementsByClassName('cell')

for (var i = 0; i < cells.length; i++){
    cells[i].addEventListener('click',(e)=>{
        console.log(e.target.id)
    })
}

//    0 -> black
//    1 -> white
//    2 -> rook
//    3 -> knight
//    4 -> bishop
//    5 -> king
//    6 -> queen
//    7 -> pawn


let pieceToSvg = {
    '02' : 'pieces\\black-rook.svg',
    '03' : 'pieces\\black-knight.svg',
    '04' : 'pieces\\black-bishop.svg',
    '05' : 'pieces\\black-king.svg',
    '06' : 'pieces\\black-queen.svg',
    '07' : 'pieces\\black-pawn.svg',

    '12' : 'pieces\\white-rook.svg',
    '13' : 'pieces\\white-knight.svg',
    '14' : 'pieces\\white-bishop.svg',
    '15' : 'pieces\\white-king.svg',
    '16' : 'pieces\\white-queen.svg',
    '17' : 'pieces\\white-pawn.svg',
}


function loadBoard(board){
    cellIndex = 0
    for (var i = 0; i < 8;i++){
        for (var j = 0; j < 8 ;j++){
            if (board[i][j] != '-'){
                cells[cellIndex].innerHTML = `<img src = "${pieceToSvg[board[i][j]]}" width = "100px" height = "100px"></img`
            }
            cellIndex++
        }
    }
}
function initBoard(){
    board = [
        ['02','03','04','05','06','04','03','02'],
        ['07','07','07','07','07','07','07','07'],
        ['-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-'],
        ['17','17','17','17','17','17','17','17'],
        ['12','13','14','15','16','14','13','12']
    ]
    loadBoard(board)
    return board
}

initBoard()

