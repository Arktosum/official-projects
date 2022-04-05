let piecesToSvg = {
    '02' : 'Pieces\\black-rook.svg',
    '03' : 'Pieces\\black-knight.svg',
    '04' : 'Pieces\\black-bishop.svg',
    '05' : 'Pieces\\black-king.svg',
    '06' : 'Pieces\\black-queen.svg',
    '07' : 'Pieces\\black-pawn.svg',

    '12' : 'Pieces\\white-rook.svg',
    '13' : 'Pieces\\white-knight.svg',
    '14' : 'Pieces\\white-bishop.svg',
    '15' : 'Pieces\\white-king.svg',
    '16' : 'Pieces\\white-queen.svg',
    '17' : 'Pieces\\white-pawn.svg'
}

export class ChessPiece{
    constructor(color){
        this.color = color;
    }
    isInBounds(pos){
        if ((pos.x >= 0 && pos.x <= 7) && (pos.y >= 0 && pos.y <=7)){
            return true
        }
        return false
    }
    isOccupied(pos,board){
        if (board[pos.x][pos.y] != undefined){
            return true
        }
        return false
    }
}


export class Rook extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}2`]
    }
}


export class Knight extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}3`]
    }
    allMoves(pos,board){
        let legalMoves = []
        let attackMoves = []

        let positions = [
            [pos.x-2,pos.y+1],
            [pos.x-2,pos.y-1],
            [pos.x-1,pos.y+2],
            [pos.x-1,pos.y-2],
            [pos.x+2,pos.y+1],
            [pos.x+2,pos.y-1],
            [pos.x+1,pos.y+2],
            [pos.x+1,pos.y-2],
        ]
        for(let i = 0; i < positions.length ; i++){
            let k = positions[i][0]
            let l = positions[i][1]
            if (this.isInBounds({x : k , y : l})){
               if(this.isOccupied({x : k, y : l},board)){
                    if(board[pos.x][pos.y].color != board[k][l].color){
                        attackMoves.push({x:k,y:l})
                    }
                    else{
                        legalMoves.push({x:k,y:l})
                    }
                }
            }
        }
        console.log(legalMoves,attackMoves)
    }
}


export class Bishop extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}4`]
    }
}


export class King extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}5`]
    }
}


export class Queen extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}6`]
    }
}


export class Pawn extends ChessPiece{
    constructor(color){
        super(color);
        this.imgsrc = piecesToSvg[`${this.color}7`]
    }
}

