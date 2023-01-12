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
    canvas.height = this.innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        c.beginPath()
        c.rect(this.x, this.y, this.width, this.height)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

// Implementation
let rectangle1
let rectangle2
function init() {
    rectangle1 = new Rectangle(400, 300, 50, 50, 'tomato')
    rectangle2 = new Rectangle(700, 300, 100, 100, 'purple')
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    rectangle1.x = mouse.x
    rectangle1.y = mouse.y
    rectangle1.update()
    rectangle2.update()

    //collision
    if (rectangle1.x > rectangle2.x + rectangle2.width ||
        rectangle1.x + rectangle1.width < rectangle2.x ||
        rectangle1.y > rectangle2.y + rectangle2.height ||
        rectangle1.y + rectangle1.height < rectangle2.y) {
            // No Collision Detected
            rectangle1.color = 'yellow'
            // rectangle1.color= this.color
        } else {
            // Collision Detected
            rectangle1.color = 'black'
            console.log('collision')
        }
    }


    //collision um pouco menos eficiente, mais não deixa de ser ruim
    // if (rectangle1.x < rectangle2.x + rectangle2.width &&
    //     rectangle1.x + rectangle1.width > rectangle2.x &&
    //     rectangle1.y < rectangle2.y + rectangle2.height &&
    //     rectangle1.y + rectangle1.height > rectangle2.y) {
    //         // Collision Detected
    //         rectangle1.color = 'green'
    //         console.log('collision')
    //     } else {
    //         // No Collision Detected
    //         rectangle1.color = 'tomato'
    //         // rectangle1.color= this.color
    //     }
    // }

init()
animate()