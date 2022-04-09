import {Grid} from './board.js'
import {Rook , Knight , Bishop , King, Queen, Pawn} from './pieces.js'

var audio = new Audio('chess_move.mp3');




class Chess{
    constructor(){
        this.r1 = new Rook(0)
        this.n1 = new Knight(0)
        this.b1 = new Bishop(0)
        this.k = new King(0)
        this.q = new Queen(0)
        this.b2 = new Bishop(0)
        this.n2 = new Knight(0)
        this.r2 = new Rook(0)
        this.p1 = new Pawn(0)
        this.p2 = new Pawn(0)
        this.p3 = new Pawn(0)
        this.p4 = new Pawn(0)
        this.p5 = new Pawn(0)
        this.p6 = new Pawn(0)
        this.p7 = new Pawn(0)
        this.p8 = new Pawn(0)


        this.R1 = new Rook(1)
        this.N1 = new Knight(1)
        this.B1 = new Bishop(1)
        this.K = new King(1)
        this.Q = new Queen(1)
        this.B2 = new Bishop(1)
        this.N2 = new Knight(1)
        this.R2 = new Rook(1)
        this.P1 = new Pawn(1)
        this.P2 = new Pawn(1)
        this.P3 = new Pawn(1)
        this.P4 = new Pawn(1)
        this.P5 = new Pawn(1)
        this.P6 = new Pawn(1)
        this.P7 = new Pawn(1)
        this.P8 = new Pawn(1)

        this.board = [
            [this.r1,this.n1,this.b1,this.k,this.q,this.b2,this.n2,this.r2],
            [this.p1,this.p2,this.p3,this.p4,this.p5,this.p6,this.p7,this.p8],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,this.B1,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [this.P1,this.P2,this.P3,this.P4,this.P5,this.P6,this.P7,this.P8],
            [undefined,this.N1,this.B1,this.K,this.Q,this.B2,this.N2,this.R2]
            ]
        // White Goes first
        this.turn = 1
        this.legalMoves = []
        this.attackMoves = []
        this.selectedPos = {}
        this.loadBoard()
    }
    loadBoard(){
        console.log('reloading board...')
        for(let i=0;i < 8 ; i++){
            for(let j=0;j < 8 ; j++){
                if(this.board[i][j]){
                    chessGrid[i][j].innerHTML = `<img src="${this.board[i][j].imgsrc}" width = 100px; height = 100px;></img>`
                }
                else{
                    chessGrid[i][j].innerHTML = ``
                }
                chessGrid[i][j].addEventListener('click',(e)=>{
                    this.gameTurn({
                        x : parseInt(e.target.id[0]),
                        y : parseInt(e.target.id[1])
                    })
                })
            }
        }
    }
    gameTurn(pos){
        let piece = this.board[pos.x][pos.y];
        this.destroyMoves()
        if(this.checkInPath(pos)){
            this.selectedPos = undefined
            this.legalMoves = []
            this.attackMoves = []
            this.turn = !this.turn
            return
        }
        if (piece.color == this.turn){
            this.selectedPos = pos
            if (piece != undefined){
                let allMoves = piece.possibleMoves(pos,this.board)
                this.legalMoves = allMoves[0]
                this.attackMoves = allMoves[1]
                console.log(allMoves)
                this.displayMoves()
            }
        }
    }

    checkInPath(pos){
        for(let i = 0; i < this.legalMoves.length ; i++){
            if(pos.x == this.legalMoves[i].x && pos.y == this.legalMoves[i].y){
                this.MovePiece({x:this.selectedPos.x,y:this.selectedPos.y},{x:pos.x, y:pos.y})
                this.loadBoard()
                return true
            }
        }
        for(let i = 0; i < this.attackMoves.length ; i++){
            if (pos.x == this.attackMoves[i].x && pos.y == this.attackMoves[i].y){
                this.MovePiece({x:this.selectedPos.x,y:this.selectedPos.y},{x:pos.x, y:pos.y})
                this.loadBoard()
                return true
            }
        }
        return false
    }
    MovePiece(pos1,pos2){
        this.board[pos2.x][pos2.y] = this.board[pos1.x][pos1.y];
        this.board[pos1.x][pos1.y] = undefined;
        audio.play();
    }
    displayMoves(){
        for(let i = 0; i < this.legalMoves.length; i++){
            chessGrid[this.legalMoves[i].x][this.legalMoves[i].y].classList.add('movable')
        }

        for(let i = 0; i < this.attackMoves.length; i++){
            chessGrid[this.attackMoves[i].x][this.attackMoves[i].y].classList.add('attackable')
        }
    }

    destroyMoves(){
        for(let i = 0; i < this.legalMoves.length; i++){
            chessGrid[this.legalMoves[i].x][this.legalMoves[i].y].classList.remove('movable')
        }

        for(let i = 0; i < this.attackMoves.length; i++){
            chessGrid[this.attackMoves[i].x][this.attackMoves[i].y].classList.remove('attackable')
        }
    }
    
}

let chessGrid = new Grid()
let chessGame = new Chess()

