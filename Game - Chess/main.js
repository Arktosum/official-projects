import createChessBoard from './chessboard.js'
import {Rook,Knight,Bishop,King,Queen,Pawn} from './pieces.js'


class Chess{
    constructor(){
        this.r1 = new Rook(0);
        this.n1 = new Knight(0);
        this.b1 = new Bishop(0);
        this.k = new King(0);
        this.q = new Queen(0);
        this.b2 = new Bishop(0);
        this.n2 = new Knight(0);
        this.r2 = new Rook(0);

        this.p1 = new Pawn(0);
        this.p2 = new Pawn(0);
        this.p3 = new Pawn(0);
        this.p4 = new Pawn(0);
        this.p5 = new Pawn(0);
        this.p6 = new Pawn(0);
        this.p7 = new Pawn(0);
        this.p8 = new Pawn(0);

        this.R1 = new Rook(1);
        this.N1 = new Knight(1);
        this.B1 = new Bishop(1);
        this.K = new King(1);
        this.Q = new Queen(1);
        this.B2 = new Bishop(1);
        this.N2 = new Knight(1);
        this.R2 = new Rook(1);

        this.P1 = new Pawn(1);
        this.P2 = new Pawn(1);
        this.P3 = new Pawn(1);
        this.P4 = new Pawn(1);
        this.P5 = new Pawn(1);
        this.P6 = new Pawn(1);
        this.P7 = new Pawn(1);
        this.P8 = new Pawn(1);

        this.board = [
            [this.r1,this.n1,this.b1,this.k,this.q,this.b2,this.n2,this.r2],
            [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,this.p7,this.p8],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [this.P1,this.P2,this.P3,this.P4,this.P5,this.P6,this.P7,this.P8],
            [this.R1,this.N1,this.B1,this.K,this.Q,this.B2,this.N2,this.R2],
        ]
        this.loadBoard()
    }
    loadBoard(){
        for(let i = 0; i < 8 ; i++){
            for(let j = 0; j < 8 ; j++){
                if (this.board[i][j] != undefined){
                    cellBoard[i][j].innerHTML = `<img src = "${this.board[i][j].imgsrc}" width = 100px; height = 100px;></img>`
                }
            }
        }
    }
    chessTurn(pos){
        let piece = this.board[pos.x][pos.y]
        let allMoves = piece.allMoves(pos,this.board)
        console.log(allMoves)
    }
}

const cellBoard = createChessBoard()
let chess = new Chess()

for (let i = 0; i < 8 ; i++){
    for(let j = 0 ; j < 8 ; j++){
        cellBoard[i][j].addEventListener('click',(e)=>{
            chess.chessTurn(
                {
                    x:parseInt(e.target.id[0]),
                    y:parseInt(e.target.id[1])
                })
        })
    }
}

