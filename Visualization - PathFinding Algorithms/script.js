const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.appendChild(canvas)


function Stroke(ctx,color,width,func){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;    
    func()
    ctx.stroke();
}
function Fill(ctx,color,func){
    ctx.beginPath();
    ctx.fillStyle = color;
    func()
    ctx.fill();
}

function Rect(pos,width,height){
    ctx.rect(pos.x,pos.y,width,height);
}
function Ellipse(pos,r1,r2,rotation=0,start=0,end=2*Math.PI){
    ctx.ellipse(pos.x, pos.y,r1,r2,rotation,start,2 *end);
}

function Line(pos1,pos2,color,width,dotted = false,dash = 5,space = 50){
    Stroke(ctx,color,width,()=>{
        if (dotted){
            ctx.setLineDash([dash, space])
        }
        ctx.moveTo( pos1.x,pos1.y );     
        ctx.lineTo( pos2.x,pos2.y );
    })
}

// GLOBAL VARIABLES

let GRID_SIZE = 20
let CELL_SIZE = 100
let CELL_GAP = 4
let OCELL = 2*CELL_GAP + CELL_SIZE
canvas.width = OCELL * GRID_SIZE
canvas.height = OCELL * GRID_SIZE


class Node{
    constructor(pos){
        this.pos = pos
        this.is_visited = false
        this.canvasPos = {x:CELL_GAP + this.pos.x*OCELL,y:CELL_GAP + this.pos.y*OCELL}
        // Types
        // Normal , Start , End , Block , Visiting , Visited
        this.type = 'normal'
        this.is_blocked = false
        this.fval = 0
    }
    drawNode(){
        let color
        switch(this.type){
            case 'normal' : color = 'white'
                        break;
            case 'start' : color = 'orange'
                        break;
            case 'end' : color = 'blue'
                        break;
            case 'block' : color = 'black'
                        break;
            case 'neighbor' : color = 'green'
                        break;
            case 'visited' : color = 'purple'
                        break;
        }
        Fill(ctx,color,()=>{
            Rect(this.canvasPos,CELL_SIZE,CELL_SIZE)
        })    
    }
    write_Fval(){
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(this.fval, this.canvasPos.x + 10*CELL_GAP, this.canvasPos.y + 10*CELL_GAP);
    }
}



class Graph{
    constructor(GRID_SIZE){
        this.size = GRID_SIZE
        this.graph = []
        this.startNode = undefined
        this.endNode = undefined
        this.shortestNode = undefined
        this.heap = []
        for (let i=0; i<GRID_SIZE; i++){
            this.graph.push([])
            for (let j=0; j<GRID_SIZE; j++){
                let node = new Node({x:i,y:j})
                this.graph[i].push(node)
            }
        }
    }
    displayGraph(){
        console.log(this.heap.length)
        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){
                this.graph[i][j].drawNode()
                if (this.graph[i][j].fval){
                    this.graph[i][j].write_Fval()
                }
            }
        }
        
    }
    cursorToIndex(cursorPos){
        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){
                if(searchBox(this.graph[i][j].canvasPos,cursorPos)){
                    return {x:i,y:j}
                }
            }
        }
    }
    getMinNode(){
        let minNode = this.heap[0]
        let minFval = this.heap[0].fval
        for(let node of this.heap){
            if (node.fval < minFval){
                minFval = node.fval
                minNode = node
            }
        }
        this.heap.splice(this.heap.indexOf(minNode),1)
        return minNode
    }
}


function searchBox(canvasPos,cursorPos){
    return(
        (canvasPos.x <= cursorPos.x && cursorPos.x <= canvasPos.x + OCELL) &&
        (canvasPos.y <= cursorPos.y && cursorPos.y <= canvasPos.y + OCELL)
        )
}


function isInbounds(pos){
    return ((pos.x >= 0 && pos.x < GRID_SIZE) && (pos.y >= 0 && pos.y < GRID_SIZE))
}


function getNeighbors(graph,node){
    let x = node.pos.x
    let y = node.pos.y
    let neighbors = [
        [x-1,y-1],[x,y-1],[x+1,y-1],
        [x-1,y],[x+1,y],
        [x-1,y+1],[x,y+1],[x+1,y+1],
                    ]
    let validNeighbors = []
    for(let neighbor of neighbors){
        let r = neighbor[0]
        let c = neighbor[1]
        if (isInbounds({x:r,y:c}) && !graph[r][c].is_blocked && !graph[r][c].is_visited){
            validNeighbors.push(graph[r][c])
        }
    }
    return validNeighbors
}

let GRAPH = new Graph(GRID_SIZE)
GRAPH.displayGraph()

function fval(node,start,end) {
    let gval = Math.round(Math.sqrt((node.pos.x - start.pos.x)**2 + (node.pos.y - start.pos.y)**2))
    let hval = Math.round(Math.sqrt((node.pos.x - end.pos.x)**2 + (node.pos.y - end.pos.y)**2))
    node.fval = gval + hval
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x,y}
}

canvas.addEventListener('mousedown', (e)=> {
    let cursorPos = getCursorPosition(canvas, e)
    let graphPos = GRAPH.cursorToIndex(cursorPos)
    let selectedNode = GRAPH.graph[graphPos.x][graphPos.y]
    if (!GRAPH.startNode){
        selectedNode.type = 'start'
        GRAPH.startNode = selectedNode
        GRAPH.shortestNode = selectedNode
    }
    else if (!GRAPH.endNode){
        selectedNode.type = 'end'
        GRAPH.endNode = selectedNode
    }
    else{
        if (selectedNode.type === 'block'){
            selectedNode.type = 'normal'
            selectedNode.is_blocked = false
            GRAPH.displayGraph()
            return
        }
        if (selectedNode.type != 'start' && selectedNode.type != 'end'){
            selectedNode.type = 'block'
            selectedNode.is_blocked = true
        }
        
    }
    GRAPH.displayGraph()
})


document.addEventListener('keydown',(e)=>{
    let key = e.key
    switch(key){
        case 'c' : animate()
                    
    }
})


function GraphAnimation(){
    if (GRAPH.shortestNode.pos.x == GRAPH.endNode.pos.x && GRAPH.shortestNode.pos.y == GRAPH.endNode.pos.y){
        console.log("Found End Node!")
        return true
    }
    for (let i = 0 ; i< 1 ; i++){
        Fill(ctx,'grey',()=>{
            Rect({x:0,y:0},canvas.width,canvas.height)
        })
        GRAPH.displayGraph()
        if (GRAPH.startNode && GRAPH.endNode){
            let validNeighbors = getNeighbors(GRAPH.graph,GRAPH.shortestNode)
            for (let neighbor of validNeighbors){
                if (neighbor.type != 'visited'){
                    if(neighbor.type != 'end' && neighbor.type != 'start'){
                        neighbor.type = 'neighbor'
                    }
                    neighbor.drawNode()
                    fval(neighbor,GRAPH.shortestNode,GRAPH.endNode)
                    GRAPH.heap.push(neighbor)
                }
            }
            if(GRAPH.shortestNode.type != 'start'){
                GRAPH.shortestNode.type = 'visited'
            }
            GRAPH.is_visited = true
            GRAPH.shortestNode = GRAPH.getMinNode()
            
            GRAPH.displayGraph()
        }
    }
    return false
}


let SPEED = 5
let lastRenderTime = 0
function animate(currentTime){
    let r = requestAnimationFrame(animate)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SPEED) return
    // If you want to force the loop to stop,
    // cancelAnimationFrame(r)
    //- --------------------------------------------------
    if (GraphAnimation()){
        cancelAnimationFrame(r)
    }
    // ---------------------------------------------------

    lastRenderTime = currentTime

}

