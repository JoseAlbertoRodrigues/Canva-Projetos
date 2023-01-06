// console.log(gsap)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')

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

// Fazer um efeito para que as particulas desapareçam lentament
const friction = 0.99
// Adicionando construtor para particulas, para poder fazer explosão de particulas
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1 // para fazer as particulas desaparecer
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01
    }
}

// colocar o jogador no centro
const x = canvas.width / 2
const y = canvas.height / 2

// const player = new Player(100, 100, 30, 'blue')
const player = new Player(x, y, 10, 'white')
const projectiles = []
const enemies = []
const particles = []

// const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', { x: 1, y: 1 })

// função para gerar inimigos
function spawnEnemies() {
    setInterval(() => {
        // console.log('go')
        // Obter tamanhos de inimigos aleatórios, que seja maior que 4
        const radius = Math.random() * (30 - 5) + 5
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

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

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
let score = 0
// loop de animação
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    particles.forEach((particle, index) => { // qualquer coisa que eu precisar para fazer o loop, devo renderizar
        // fazer as particulas desaparecer
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    });
    projectiles.forEach((projectile, index) => {
        projectile.update()

        // remove from edges of screen
        if (
            projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        
        // end Game
        if (dist - enemy.radius - player.radius < 1) {
            // console.log('end game')
            cancelAnimationFrame(animationId)
        }

        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            // when projectiles touch enemy
            if (dist - enemy.radius - projectile.radius < 1) {
                // create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 2,
                            enemy.color, {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        })
                    )
                }

                if (enemy.radius - 10 > 5) {
                    // increase our score
                    score += 100
                    scoreEl.innerHTML = score

                    // enemy.radius -= 10
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        // console.log('removido da tela')
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    // remove from scene altogther
                    // increase our score
                    score += 250
                    scoreEl.innerHTML = score
                    setTimeout(() => {
                        // console.log('removido da tela')
                        enemies.splice(index, 1)
                        projectiles.splice(projectileIndex, 1)
                    }, 0)
                }
            }
        })
    })
}

addEventListener('click', (event) => {
    // const projectile = new Projectile(event.clientX, event.clientY, 5, 'red', null)
    console.log(projectiles)
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(
        new Projectile(canvas.width / 2, canvas.height / 2, 5, 'white', velocity)
    )
})

startGameBtn.addEventListener('click', () => {
    // console.log('go')
    // Chama no final do arquivo
    animate()
    spawnEnemies()
    modalEl.style.display = 'none'
})

// Encolher o inimigo quando acertar o projétil nele
// 1:29:27