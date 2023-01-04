const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Construtor do Jogador
class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()

    }
}

// Adicionando Construtor dos Projeteis
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// colocar o jogador no centro
const x = canvas.width / 2
const y = canvas.height / 2

// const player = new Player(100, 100, 30, 'blue')
const player = new Player(x, y, 30, 'blue')
player.draw()

function animate() {
    requestAnimationFrame(animate)
    projectile.draw()
    projectile.update()
}

addEventListener('click', (event) => {
    // const projectile = new Projectile(event.clientX, event.clientY, 5, 'red', null)
    const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', {x: 1, y: 1})
    projectile.draw()
})

// Chama no final do arquivo
animate()