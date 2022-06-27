const root = document.getElementById('root');
const grid = document.createElement('div')
grid.id = 'grid'

root.appendChild(grid)



let GRID_SIZE = 20
let CELL_SIZE = 100

let mousedown = false

class Node{
    constructor(gridElement,pos){
        this.element = document.createElement('div')
        this.type = 'node'
        this.pos = pos
        this.element.classList.add(this.type)
        this.element.id = `${pos.x}-${pos.y}`
        this.gval = 0
        this.hval = 0
        this.fval = 0
        gridElement.appendChild(this.element)

        this.prev = undefined

        this.element.addEventListener('mousedown',(e)=>{
            mousedown = true
        })
        
        this.element.addEventListener('mouseenter',(e)=>{
            if(mousedown){
                let nodePos = e.target.id.split('-')
                let node = GRID.getNode({x:nodePos[0], y:nodePos[1]})
                GRID.updateNode({x:nodePos[0], y:nodePos[1]},'wall')
            }
        })
        
        this.element.addEventListener('mouseup',(e)=>{
            mousedown = false
        })
    }
    showFval(){
        return
        this.element.innerHTML = `
        <div style = 'text-align : center;'>${this.gval}</div>
        <div style = 'text-align : center;'>${this.hval}</div>
        <div style = 'text-align : center; font-size : 2em; color : red;'>${this.fval}</div>
        `
    }
}


class Grid{
    constructor(gridElement){
        this.element = gridElement
        this.element.style.height = `${CELL_SIZE*GRID_SIZE}px`
        this.element.style.width = `${CELL_SIZE*GRID_SIZE}px`
        this.element.style.backgroundColor = `lightblue`
        this.element.style.gridTemplateColumns = `repeat(${GRID_SIZE},${CELL_SIZE}px)`


        this.grid = []
        for(let i = 0 ; i < GRID_SIZE ; i++){
            let subArray = []
            for (let j = 0; j < GRID_SIZE ; j++){
                let node = new Node(this.element,{x:i,y:j})
                this.element.appendChild(node.element)
                subArray.push(node)
            }
            this.grid.push(subArray)
        }

        this.heap = []
    }
    getNode(pos){
        return this.grid[pos.x][pos.y]
    }
    updateNode(pos,type){
        let nodeElement = document.getElementById(`${pos.x}-${pos.y}`)
        let node = this.getNode(pos)
        node.type = type
        nodeElement.classList = []
        nodeElement.classList.add(`node`)
        nodeElement.classList.add(node.type)
    }
    getShortestNode(node){ 
        let nodeInd = -1
        for(let i = 0; i < this.heap.length;i++){
            if (this.heap[i] == node){
                nodeInd = i
                break;
            }
        }
        if (nodeInd != -1){
            this.heap.splice(nodeInd, 1)
        }

        // for (let i = 0; i < this.heap.length; i++){
        //     console.log(`Node ${i} : ${this.heap[i].fval}`)
        // }
        let ShortestNode = this.heap[0]
        let shortestFval = this.heap[0].fval
        for(let i = 0; i < this.heap.length; i++){
            if (this.heap[i].fval < shortestFval){
                ShortestNode = this.heap[i]
                shortestFval = this.heap[i].fval
            }
        }
        return ShortestNode
    }
}


let GRID = new Grid(grid)


let startNode = undefined
let endNode = undefined

let shortestNode = undefined


// Mode 0 -> Dijkstra
// Mode 1 -> A*
let mode = 0


document.addEventListener('click',(e)=>{
    let nodePos = e.target.id.split('-')
    let node = GRID.getNode({x:nodePos[0], y:nodePos[1]})

    if (!startNode){
        startNode = node
        shortestNode = startNode
        GRID.updateNode({x:nodePos[0], y:nodePos[1]}, 'start')
    }
    else if (!endNode){
        endNode = node
        GRID.updateNode({x:nodePos[0], y:nodePos[1]}, 'end')
    }
    else{

        if (node.type == 'wall'){
            GRID.updateNode({x:nodePos[0], y:nodePos[1]},'node')
        }
        else{
            GRID.updateNode({x:nodePos[0], y:nodePos[1]},'wall')
        }
    }
})

document.addEventListener('keypress',(e)=>{
    let key = e.key
    switch(key){
        case 'c' : AlgoAnimate();
    }
})


function isInbounds(pos){
    return ((pos.x >= 0 && pos.x < GRID_SIZE) && (pos.y >= 0 && pos.y < GRID_SIZE))
}
function getNeighbors(node){
    let x = node.pos.x
    let y = node.pos.y
    //With Diagonals
    // let neighbours = [
    //     [x-1,y-1],[x,y-1],[x+1,y-1],
    //     [x-1,y],[x+1,y],
    //     [x-1,y+1],[x,y+1],[x+1,y+1]
    //     ]
    //Without Diagonals
    let neighbours = [
        [x,y-1],
        [x-1,y],[x+1,y],
        [x,y+1]
        ]
    let validNeighbours = []
    for(let neighbour of neighbours){
        let r = neighbour[0]
        let c = neighbour[1]
        
        if (isInbounds({x:r,y:c})){
            let validNode = GRID.getNode({x:r,y:c})
            if (validNode.type != 'wall' && validNode.type != 'start' && validNode.type != 'visited'){validNeighbours.push(validNode)}
        }
    }
    return validNeighbours
}

function calcFval(node,startNode,endNode){
    let nodePos = node.pos
    let startNodePos = startNode.pos
    let endNodePos = endNode.pos
    let gval = Math.round(Math.sqrt((nodePos.x - startNodePos.x)**2 + (nodePos.y - startNodePos.y) **2)*1000)
    let hval = Math.round(Math.sqrt((nodePos.x - endNodePos.x)**2 + (nodePos.y - endNodePos.y) **2)*1000)
    node.gval = gval
    node.hval = hval
    switch(mode){
        case 0: // Dijkstra
                node.fval = gval
                break;
        case 1 :// A*
                node.fval = hval - gval
                break;
    }
}

function AlgoAnimate(){
    if(shortestNode.pos.x == endNode.pos.x && shortestNode.pos.y == endNode.pos.y){
        console.log("found Target!")
        let temp = shortestNode
        let i = 0;
        while(temp){
            GRID.updateNode({x:temp.pos.x, y:temp.pos.y},'shortestPath')
            temp = temp.prev
            i++;
        }
        GRID.updateNode({x:startNode.pos.x, y:startNode.pos.y},'start')
        GRID.updateNode({x:endNode.pos.x, y:endNode.pos.y},'end')
        return
    }
    console.log('animate!')
    calcFval(shortestNode,startNode,endNode)
    shortestNode.showFval()
    GRID.updateNode({x:shortestNode.pos.x, y:shortestNode.pos.y},'visited')
    let neighbours = getNeighbors(shortestNode)
    
    for (let neighbour of neighbours){
        neighbour.prev = shortestNode
        if (neighbour.type == 'neighbor'){
            calcFval(neighbour,startNode,endNode)
            neighbour.showFval()
        }
        else{
            GRID.updateNode({x:neighbour.pos.x,y:neighbour.pos.y},'neighbor')
            calcFval(neighbour,startNode,endNode)
            neighbour.showFval()
            GRID.heap.push(neighbour)
        }
    }
    shortestNode = GRID.getShortestNode(shortestNode)
}

