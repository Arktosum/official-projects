let chessPieces = {
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
    '17' : 'Pieces\\white-pawn.svg',
}



function isInbounds(pos){
    let r = pos.x
    let c = pos.y
    if ((r>=0 && r <= 7) && (c>=0 && c <= 7)){
        return true
    }
    return false
}


function isOccupied(pos,board){
    if (board[pos.x][pos.y] != undefined){
        return true
    }
    return false
}


function SlidingMoveFilter(r,c,k,l,board,legalMoves,attackMoves){
    if(isInbounds({x:k,y:l})){
        if (isOccupied({x:k,y:l},board)){
            if(board[r][c].color != board[k][l].color){
                attackMoves.push({x:k,y:l})
            }
            return false
        }
        else{
            legalMoves.push({x:k,y:l})
            }
        }
    return true
}


export class Rook{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}2`];
    }
    possibleMoves(pos,board){
        let r = pos.x
        let c = pos.y

        let legalMoves = []
        let attackMoves = []

    
        // Up Slide
        let tempr = r - 1
        while(tempr >= 0){
            if(SlidingMoveFilter(r,c,tempr,c,board,legalMoves,attackMoves)){
                tempr--
            }
            else{
                break
            }
        }
        // Down Slide
        tempr = r + 1
        while(tempr <= 7){
            if(SlidingMoveFilter(r,c,tempr,c,board,legalMoves,attackMoves)){
                tempr++
            }
            else{
                break
            }
        }
        // Left Slide
        let tempc = c - 1
        while(tempc >= 0){
            if(SlidingMoveFilter(r,c,r,tempc,board,legalMoves,attackMoves)){
                tempc--
            }
            else{
                break
            }
        }
        // Right Slide
        tempc = c + 1
        while(tempc <= 7){
            if(SlidingMoveFilter(r,c,r,tempc,board,legalMoves,attackMoves)){
                tempc++
            }
            else{
                break
            }
        }
        return [legalMoves,attackMoves]
    }
}


export class Knight{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}3`];
    }
    possibleMoves(pos,board){
        let r = pos.x
        let c = pos.y

        let legalMoves = []
        let attackMoves = []

        let pms = [
            [r-2,c+1],[r-2,c-1],
            [r-1,c+2],[r-1,c-2],
            [r+2,c+1],[r+2,c-1],
            [r+1,c+2],[r+1,c-2]
        ]

        for (let i = 0; i < pms.length ; i++){
            let k = pms[i][0];
            let l = pms[i][1];
            if(isInbounds({x:k,y:l})){
                if (isOccupied({x:k,y:l},board)){
                    if(board[r][c].color != board[k][l].color){
                        attackMoves.push({x:k,y:l})
                    }
                }
                else{
                    legalMoves.push({x:k,y:l})
                }
            }
        }
        return [legalMoves,attackMoves]
    }
}

export class Bishop{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}4`];
    }
    possibleMoves(pos,board){
        let r = pos.x
        let c = pos.y

        let legalMoves = []
        let attackMoves = []

    
        // top-left Slide
        let tempr = r - 1
        let tempc = c - 1
        while(isInbounds({x:tempr,y:tempc})){
            if(SlidingMoveFilter(r,c,tempr,tempc,board,legalMoves,attackMoves)){
                tempr--
                tempc--
            }
            else{
                break
            }
        }

        // top - right Slide
        tempr = r - 1
        tempc = c + 1
        while(isInbounds({x:tempr,y:tempc})){
            if(SlidingMoveFilter(r,c,tempr,tempc,board,legalMoves,attackMoves)){
                tempr--
                tempc++
            }
            else{
                break
            }
        }
        // bottom - left slide
        tempr = r + 1
        tempc = c - 1
        while(isInbounds({x:tempr,y:tempc})){
            if(SlidingMoveFilter(r,c,tempr,tempc,board,legalMoves,attackMoves)){
                tempr++
                tempc--
            }
            else{
                break
            }
        }
        //bottom-right slide
        tempr = r + 1
        tempc = c + 1
        while(isInbounds({x:tempr,y:tempc})){
            if(SlidingMoveFilter(r,c,tempr,tempc,board,legalMoves,attackMoves)){
                tempr++
                tempc++
            }
            else{
                break
            }
        }
        return [legalMoves,attackMoves]
    }
}

export class King{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}5`];
    }
}

export class Queen{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}6`];
    }
}

export class Pawn{
    constructor(color){
        this.color = color;
        this.imgsrc = chessPieces[`${color}7`];
        this.first = false
    }
    possibleMoves(pos,board){
        let r = pos.x
        let c = pos.y

        let legalMoves = []
        let attackMoves = []
        
        if (board[r][c].color == 1){
            legalMoves.push([r-1,c],[r-2,c])
        }
        if(board[r][c].color == 0){
            legalMoves.push([r+1,c],[r+2,c])
        }
        return [legalMoves, attackMoves]
    }
}