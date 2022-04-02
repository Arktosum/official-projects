const cells = document.getElementsByClassName('cell')
const turnText = document.getElementById('turn')

const startScreen =document.getElementById('startScreen')
const gameScreen = document.getElementById('gameScreen')



class TicTacToe{
    constructor(){
        this.board = [
                        [undefined,undefined,undefined],
                        [undefined,undefined,undefined],
                        [undefined,undefined,undefined]
                    ]
        this.players = ['O','X']
        this.won = false;
        this.winner = undefined
        this.turn = 1
        this.turnCount = 0
        turnText.innerText = `Turn - ${this.players[this.turn]}`
    }
    NewTurn(cell,cell_id){
        let x = parseInt(cell_id[0])
        let y = parseInt(cell_id[1])
        if (this.board[x][y] == undefined && !this.won){
            
            this.board[x][y] = this.turn
            cell.textContent = this.players[this.turn]
            this.turnCount++

            this.checkWin()
            if (this.turnCount == 9 && !this.won){
                console.log('Draw')
                turnText.innerText = `It is a Draw!`
                return
            }
            if (this.won){
                turnText.innerText = ` ${this.players[this.turn]} has Won!`
                return
            }
        switch(this.turn){
            case 0 : this.turn = 1
            break
            case 1 : this.turn = 0
            break
            }
        turnText.innerText = `Turn - ${this.players[this.turn]}`
        }

    }
    checkWin(){
        let switchCase = (calc)=>{
            switch(calc){
                case 0 : this.won = true;
                         this.winner = 0
                         return
                case 3 : this.won = true
                         this.winner = 1
                         return 
            }
        }
        // Row wise win
        for(let i = 0; i < 3 ; i++){
            let calc = this.board[i][0] + this.board[i][1] + this.board[i][2]
            switchCase(calc)
        }
        // Column wise win
        for(let i = 0; i < 3 ; i++){
            let calc = this.board[0][i] + this.board[1][i] + this.board[2][i]
            switchCase(calc)
        }
        // First Diagonal win
        let calc = this.board[0][0] + this.board[1][1] + this.board[2][2]
        switchCase(calc)
        // Second Diagonal win
        calc = this.board[2][0] + this.board[1][1] + this.board[0][2]
        switchCase(calc)
    }

    Hologram(cell,cell_id){
        if (this.board[cell_id[0]][cell_id[1]] == undefined){
            cell.innerHTML = `<p id = 'hover-text'>${this.players[this.turn]}</p>`
        }
    }
    HologramDel(cell,cell_id){
        if (this.board[cell_id[0]][cell_id[1]] == undefined){
            cell.innerHTML = ``
        }
    }
    
}

ttt = new TicTacToe()


for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click',(e) => {
        ttt.NewTurn(e.target,e.target.id)
    })
    cells[i].addEventListener('mouseenter',(e) =>{
        ttt.Hologram(e.target,e.target.id)
    })
    cells[i].addEventListener('mouseleave',(e) =>{
        ttt.HologramDel(e.target,e.target.id)
    })
}

console.log(startScreen, gameScreen, gameOverScreen)
function startGame(){
    startScreen.style.display ='none'
    gameScreen.style.display = 'block'
}