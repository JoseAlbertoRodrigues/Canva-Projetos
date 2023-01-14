// eu digo ao VS CODE que esse é um projeto de tela e ele irá
// sugerir métodos de tela html embutidos para mim
/** @type {HTMLCanvasElement} */

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

CANVAS_WIDTH = canvas.width = 500
CANVAS_HEIGHT = canvas.height = 1000

const numberOfEnemies = 10 // números de inimigos
const enemiesArray = [] // armazenar todos os inimigo

// const enemyImage = new Image()
// enemyImage.src = './image/skeleton/skeleton-animation_00.png'
let gameFrame = 0

/*
enemy1 = {
    x: 10,
    y: 50,
    width: 200,
    height: 200
} */

class Enemy {
    constructor() {
        // Tornar uma propriedade de classe JavaScript,
        this.image = new Image()
        this.image.src = './image/skeleton/skeleton-animation_00.png'

        // this.speed = Math.random() * 4 - 2 // mover na velocidade entre -2 e +2; left and right
        
        this.spriteWidth = 266 // 293 do ex video // largura da imagem
        this.spriteHeight = 207 // 155 do ex video // altura de uma imagem vezes a quantidade de imagem no sprite
        this.width = this.spriteWidth / 2.5         // 100 // posso randomizar para tamanhos aleatórios
        this.height = this.spriteHeight / 2.5       //100

        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)

        this.frame = 0
        this.flapSpeed = Math.floor(Math.random * 3 + 1) // usando o floor a multiplicação fica inteira, mover as assas aleatórias, diferente umas das outras
    }

    update() {
        // enemy movement
        // this.x += this.speed
        // this.y += this.speed
        
        // Movimento aleatório centralizado
        this.x += Math.random() * 15 - 7.5
        this.y += Math.random() * 15 - 7.5

        // animate sprite ( outra maneira melhor de fazer verei em outro vídeo)
        // executar basicamente a cada dois loop do loop de animação if (gameFrame % 2 === 0) {
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
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

// 20:31