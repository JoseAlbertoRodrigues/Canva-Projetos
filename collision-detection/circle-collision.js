const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
let mouse = {
    // x: innerWidth / 2,
    // y: innerHeight / 2
    x: 10,
    y: 10
}

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
]

// Event Listeners
addEventListener("mousemove", function(event) {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener("resize", function() {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Pythagorean theorem
// EX: (    x1    ,     y1    ,     x2    ,    y2     )
// EX: (circle1.x1, circle1.y1, circle2.x2, circle2.y2)
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    
    // console.log(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)))
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

// Objects
class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color

    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}


// Implementation
let circle1
let circle2
function init() {
    circle1 = new Circle(300, 300, 100, 'black')
    circle2 = new Circle(undefined, undefined, 30, 'red')
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    circle1.update()
    circle2.x = mouse.x
    circle2.y = mouse.y
    circle2.update()

    // collision
    if ( getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < (circle1.radius + circle2.radius)) {
        // circle1.color = colors[2]
        circle1.color = 'red'
    } else {
        circle1.color = 'black'
    }

    // collision
    // if ( getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < (circle1.radius + circle2.radius)) {
    //     // circle1.color = colors[2]
    //     circle1.color = 'red'
    // } else if ( getDistance(circle1.x, circle1.y, circle2.x, circle2.y) > (circle1.radius + circle2.radius)) {
    //     circle1.color = 'black'
    // } else {
    //     circle1.color = this.color
    // }

    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
}

init()
animate()