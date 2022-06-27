const canvas = document.getElementById('my-canvas');
const approxText = document.getElementById('approx')

approxText.style.fontSize = `2em`
document.body.style.margin = 0

const PI = Math.PI
console.log(PI)
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = 1920
CANVAS_HEIGHT = 1080
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const ANIMATION_SPEED = 0.1

canvas.style.backgroundColor = `black`

const delay = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function drawLine(width,color,x1,y1,x2,y2){
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke()
}

let piScaling = 200
drawLine(2,'white',0,PI*piScaling,CANVAS_WIDTH,PI*piScaling)


async function Leibnitz(){
    let pi = 0
    let sign = 0
    let i = 1
    let Y = [0,0]
    let printWidth = 1

    console.log(1/2)
    while (true){
            if(sign % 2 == 0){
                pi += 1 / i
                sign = 1
            }
            else if(sign % 2 == 1){
                pi -= 1/i
                sign = 0
            }

        Y[0] = Y[1]
        Y[1] = pi 
        let prev_width = printWidth
        drawLine(1,'white',printWidth*15,Y[0]*piScaling*4,(++printWidth)*15,Y[1]*piScaling*4)
        console.log(prev_width,Y[0]*4,printWidth,Y[1]*4)
        approxText.innerText = `Approximation : ${pi*4} | Iterations : ${i}`
        await delay(ANIMATION_SPEED*1000)
        i+=2
    }
    
}
Leibnitz()


