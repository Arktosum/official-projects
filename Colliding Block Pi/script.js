const canvas = document.getElementById('my-canvas');

const collision_sound = new Audio('collison_sound.mp3')

const ctx = canvas.getContext('2d');

canvas.width = 1920
canvas.height = 1080


var count = 0;
class Box{
    constructor(m,x,size,velx){
        this.m = m
        this.width = size 
        this.height = size 
        this.x = x
        this.y = canvas.height - this.height
        this.velx = velx
    }
    draw(){
        ctx.fillStyle = `red`
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    move(){
        if (this.x - this.velx > 0){
            this.x -= this.velx
        }
        else{
            this.velx = -this.velx
            count++
            console.log(count)
            console.log(this.velx)
            collision_sound.play()
        }
    }
}

function Collision(m1,u1,m2,u2){
    let v1 = (m1 - m2) * u1 / (m1 + m2) + 2 * m2 * u2 / (m1+m2);
    let v2 = (m2 - m1) * u2 / (m1 + m2) + 2 * m1 * u1 / (m1+m2);
    return [v1,v2]
}

function RectangularCollision(block1,block2){
    if(!(block1.x + block1.width < block2.x || block2.x + block2.width < block1.x)){
        collision_sound.play()
        count++
        console.log(count)
        return true
    }
    else{
        return false
    }
}

let m1 = 1
let m2 = m1 * Math.pow(100,2)
const smallBox = new Box(m1,700,100,0);
const largeBox = new Box(m2,1000,500,1);

canvas.style.backgroundColor = `white`;


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    smallBox.draw()
    largeBox.draw()
    if(RectangularCollision(smallBox,largeBox)){
        let velocities
        velocities = Collision(smallBox.m,smallBox.velx,largeBox.m,largeBox.velx)
        console.log(velocities)
        smallBox.velx = velocities[0]
        largeBox.velx = velocities[1]
    }
    smallBox.move()
    largeBox.move()
    
    requestAnimationFrame(animate)
}
animate()