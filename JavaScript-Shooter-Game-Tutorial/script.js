const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let timeToNextRaven = 0 // tempo para o próximo raven
let ravenInterval = 500 // 500 milissegundos
let lastTime = 0 // variavel para manter o valor do registro data/hora do loop anterior

let ravens = []

class Raven {
    constructor() {
        this.width = 100
        this.height = 50
        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height)
        this.directionX = Math.random() * 5 + 3 // movimento, velocidade horizontal
        this.directionY = Math.random() * 5 - 2.5 // fica subindo e decendo o personagem, eixo y
    }
    update() {
        this.x -= this.directionX
    }

    draw() {
        c.fillRect(this.x, this.y, this.width, this.height)
    }
}

const raven = new Raven()

function animate(timestamp) {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

}

animate()