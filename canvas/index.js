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
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Adicionando Construtor dos inimigos
class Enemy {
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
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// colocar o jogador no centro
const x = canvas.width / 2
const y = canvas.height / 2

// const player = new Player(100, 100, 30, 'blue')
const player = new Player(x, y, 30, 'blue')
const projectiles = []
const enemies = []

// const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', { x: 1, y: 1 })

// função para gerar inimigos
function spawnEnemies() {
    setInterval(() => {
        // console.log('go')
        // Obter tamanhos de inimigos aleatórios, que seja maior que 4
        const radius = Math.random() * (30 - 4) + 4
        let x
        let y

        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
            // const y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        } else {
            // x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius 
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = 'green'

        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
        )
    
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

let animationId
// loop de animação
function animate() {
    animationId = requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach(projectile => {
        projectile.update()
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        
        if (dist - enemy.radius - player.radius < 1) {
            // console.log('end game')
            cancelAnimationFrame(animationId)
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (dist - enemy.radius - projectile.radius < 1) {
                setTimeout(() => {
                    // console.log('removido da tela')
                    enemies.splice(index, 1)
                    projectiles.splice(projectileIndex, 1)
                }, 0)
            }
        })
    })
}

addEventListener('click', (event) => {
    // const projectile = new Projectile(event.clientX, event.clientY, 5, 'red', null)
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(
        new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity)
    )
})

// Chama no final do arquivo
animate()
spawnEnemies()

// detectar a colisão sempre que um inimigo atingir um de nossos player,
// sempre que isso acontecer vamos remover o inimigo da tela e pausar o jogo
// 58 minutos de video