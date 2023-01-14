// eu digo ao VS CODE que esse é um projeto de tela e ele irá
// sugerir métodos de tela html embutidos para mim
/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 1000

const numberOfEnemies = 20
const enemiesArray = []

let gameFrame = 0

class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = './image/skeleton/sprite-skeleton.png'

        // this.speed = Math.random() * 3 - 2

        this.spriteWidth = 266
        this.spriteHeight = 207

        this.width = this.spriteWidth / 2
        this.height = this.spriteHeight / 2

        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)

        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 6 + 1)

        this.angle = Math.random() * 10
        this.angleSpeed = Math.random() * 0.5 
        this.curve = Math.random() * 200 + 50
    }

    update() {
        // enemy movement
        this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2)
        this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/90) + (canvas.height/2 - this.height/2)
        // this.y = this.curve * Math.cos(this.angle * Math.PI/180) + (canvas.height/2 - this.height/2)
        // this.x += this.speed
        // this.y += this.speed
        // this.y += this.curve * Math.sin(this.angle)
        this.angle += this.angleSpeed // this.angle += 0.05
        
        // if(this.x + this.width < 0) {
        //     this.x = canvas.width
        // }
        // this.y += this.speed

        // Movimento aleatório centralizado
        // this.x += Math.random() * 5 - 2.5
        // this.y += Math.random() * 5 - 2.5

        // animate sprite
        // ( outra maneira melhor de fazer verei em outro vídeo)
        // executar basicamente a cada dois loop do loop de animação if (gameFrame % 2 === 0) {
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 13 ? this.frame = 0 : this.frame++
        }
    }

    draw() {
        // c.fillRect(this.x, this.y, this.width, this.height)
        // Podemos alterar aqui
        // c.strokeRect(this.x, this.y, this.width, this.height)
        //c.drawImage(enemyImage, this.x, this.y, this.width, this.height) // usar a img abaixo para fazer a animação de sprite

        // exibir apenas o primeiro quadro da imagem com
        // área que queremos cortar: 0, 0, this.spriteWidth, this.spriteHeight
        // this.frame * this.spriteWidth => serve para fazer a multiplicação entre a largura do sprite 0*1, 0*2 até o tamanho do sprite
        //c.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        
        // Agora refiro a está imagem
        c.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

// const enemy1 = new Enemy()
for(let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy()) // será execultado 100 vezes
}
// console.log(enemiesArray)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    enemiesArray.forEach((enemy) => {
        enemy.draw()
        enemy.update()
    })
    gameFrame++
}

animate()
