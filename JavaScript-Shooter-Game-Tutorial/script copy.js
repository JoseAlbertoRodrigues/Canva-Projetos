// const canvas = document.querySelector('canvas')
const canvas = document.getElementById('canvas1')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

// collisionCanvas - para hitbox
const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = innerWidth
collisionCanvas.height = innerHeight

let score = 0 // pontuação
let gameOver = false
c.font = '50px Impact' // fonte da pontuação

let timeToNextRaven = 0 // tempo para o próximo raven
let ravenInterval = 500 // 500 milissegundos
let lastTime = 0 // variavel para manter o valor do registro data/hora do loop anterior

let ravens = []

class Raven {
    constructor() {
        this.spriteWidth = 271
        this.spriteHeight = 194
        this.sizeModifier = Math.random() * 0.6 + 0.4 // modificador de tamanho
        this.width = this.spriteWidth * this.sizeModifier // a multiplicação é mais rapida que a divisão
        this.height = this.spriteHeight * this.sizeModifier

        this.x = canvas.width
        this.y = Math.random() * (canvas.height - this.height)
        this.directionX = Math.random() * 5 + 3 // movimento, velocidade horizontal
        this.directionY = Math.random() * 5 - 2.5 // fica subindo e decendo o personagem, eixo y

        this.markedForDeletion = false // marcada para exclusão (remover os objetos que passarem da tela, lado esquerdo)

        this.image = new Image()
        this.image.src = '../image/raven.png' // 1626x194
        this.frame = 0
        this.maxFrame = 4

        // controlar a velocidade dos frames de acordo com o tempo, para cada um será diferente
        this.timeSinceFlap = 0
        this.flapInterval = Math.random() * 50 + 50

        // cor aleatória para cada raven
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)]
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'

        this.hasTrail = Math.random() > 0.5
    }
    update(deltaTime) {
        // mover em direção oposta se atingir a borda superior ou inferior
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1 // muda de direção
        }

        // movendo aleatóriamente para cima ou para baixo de acordo com o eixo y vertical
        this.x -= this.directionX
        this.y += this.directionY

        if (this.x < 0 - this.width) { // que o objeto se moveu totalmente para fora da tela
            this.markedForDeletion = true
        }
        this.timeSinceFlap += deltaTime // aumentao tempo de deltaTime por cada quadro
        if (this.timeSinceFlap > this.flapInterval) { // se for verdadeiro faça o que está abaixo
            if (this.frame > this.maxFrame) {
                this.frame = 0
            } else {
                this.frame++
            }
            this.timeSinceFlap = 0
            if (this.hasTrail) {
                for(let i = 0; i < 5; i++) {
                    particles.push(new Particle(this.x, this.y, this.width, this.color))
                }
            }
        }

        if (this.x < 0 - this.width) {
            gameOver = true
        }
        // console.log(deltaTime)
    }

    draw() {
        // c.strokeRect(this.x, this.y, this.width, this.height)
        collisionCtx.fillStyle = this.color
        collisionCtx.fillRect(this.x, this.y, this.width, this.height)
        c.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
            )
    }
}

let explosions = []
class Explosion {
    constructor(x, y, size) {
        this.image = new Image()
        this.image.src = '../image/boom.png'
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.size = size
        this.x = x
        this.y = y
        this.frame = 0

        this.sound = new Audio()
        this.sound.src = '../audio/boom.wav'

        this.timeSinceLastFrame = 0 // variável para acumular valores de tempo delta
        this.frameInterval = 200 // limite para o próximo quadro for adicionado
        this.markedForDeletion = false
    }

    update(deltaTime) {
        if (this.frame === 0) { // existe maneira melhor de colocar som
            this.sound.play()
        }
        this.timeSinceLastFrame += deltaTime
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++
            this.timeSinceLastFrame = 0
            if ( this.frame > 5) {
                this.markedForDeletion = true
            }
        }
    }

    draw() {
        c.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y - this.size / 4,
            this.size,
            this.size
        )
    }
}

let particles = []
class Particle {
    constructor(x, y, size, color) {
        this.size = size
        this.x = x + this.size / 2 + Math.random() * 50 - 25
        this.y = y + this.size / 3 + Math.random() * 50 - 25
        this.radius = Math.random() * this.size/10
        this.maxRadius = Math.random() * 20 + 35
        this.markedForDeletion = false
        this.speedX = Math.random() * 1 + 0.5
        this.color = color
    }

    update() {
        this.x += this.speedX
        this.radius += 0.5
        if (this.radius > this.maxRadius - 5) {
            this.markedForDeletion = true
        }
    }

    draw() {
        c.save()
        c.globalAlpha = 1 - this.radius/this.maxRadius
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        c.fill()
        c.restore()

    }
}

// draw Score
function drawScore() {
    c.fillStyle = 'black'
    c.fillText('Score: ' + score, 50, 75)
    c.fillStyle = 'white'
    c.fillText('Score: ' + score, 55, 80)
}

// draw Game Over
function drawGameOver() {
    c.textAlign = 'center'
    c.fillStyle = 'black'
    c.fillText('GAME OVER, your score is ' + score, canvas.width/2, canvas.height/2)
    c.fillStyle = 'white'
    c.fillText('GAME OVER, your score is ' + score, canvas.width/2 + 5, canvas.height/2 + 5)
}

// evento ouvinte de click
addEventListener('click', function(e) {
    // console.log(e.x, e.y) // cordenadas x e y em relação a viewport
   
    // detecção pela cor do pixel em que clicamos, verificam a área da tela
    // e retonam uma matriz como um objeto
    // chamado : Uint8ClampedArray, é uma estrutura de dados simples cheia de números inteiros de 8 bits
    // não atribuidos, é fixada, o que significa que pode conter apenas números inteiros entre um determinado 
    // valor especificamente 0 e 255
    
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
    // console.log(detectPixelColor)

    // variavel para obter a matriz
    const pc = detectPixelColor.data
    // console.log(pc)
    // colisão acho que aqui está deixando lento quando clico
    ravens.forEach(object => {
        // se for verdadeiro temos colisão
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            // collision detected
            object.markedForDeletion = true
            score++
            explosions.push(new Explosion(object.x, object.y, object.width))
            // console.log(explosions)
        }
    })

})

function animate(timestamp) {
    c.clearRect(0, 0, canvas.width, canvas.height)
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
    // valor em milissegundo entre o registro dataEhora, e o valor do registro de dataEhora salvo
    let deltaTime = timestamp - lastTime
    lastTime = timestamp  //testar console.log(timestamp)
    timeToNextRaven += deltaTime // tempo para o próximo corvo esta aumentando cerca de 16 milessegundo por cada quadro //console.log(deltaTime)

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven())
        timeToNextRaven = 0 // quando atingir o tempo de 500 milissegundo ele volta a zero, para começar a contar novamente
        // console.log(ravens)

        // classificar os elementos em ordem crescente ou decrecente
        // para que os corvos maiores apareçam na frente
        // posso escolher de acordo com várias propriedades do corvo: this.width usado na função(a.width)
        ravens.sort(function(a, b) {
            return a.width - b.width
        })
    }
    // console.log(deltaTime) // aqui o deltaTime o primeiro valor é NAN
    // console.log(timestamp) // o primeiro valor aqui da (UNDEFINED) esse é a raiz do problema, é só eu colocar um valor no: animate(0)

    drawScore()
    
    particles.forEach((object) => {
        object.update(deltaTime)
        object.draw()
    })
    // adicionando os objetos
    // [...particles, ...ravens, ...explosions].forEach(object => object.update(deltaTime)) // não consegui usar os dois
    // [...particles, ...ravens, ...explosions].forEach(object => object.draw())
    ravens.forEach((object) => {
        object.update(deltaTime)
        object.draw()
    })

    explosions.forEach((object) => {
        object.update(deltaTime)
        object.draw()
    })

    // excluir o objeto que passar do canto esquerdo da tela
    ravens = ravens.filter(object => !object.markedForDeletion)
    explosions = explosions.filter(object => !object.markedForDeletion)
    particles =particles.filter(object => !object.markedForDeletion)

    // game Over
    if (!gameOver) { // se for falso
        requestAnimationFrame(animate)
    } else {
        drawGameOver()
    }
}

animate(0)

// meu computador serve um quadro a cada 16 milissegundo as vezes 33 ou mais

/**
 *
    [...ravens] array literal, 3 pontos são chamados de spread operator

    estou espalhando meu array ravens dentro deste novo array rápido que criei,
    permite espalhar iterável como este array ravens para ser expandido outro array

    [...ravens].forEach(object => object.update())
    percorrerá toda a matriz de ravens e irá acionar o método de atualização em todos eles,
    já que estamos dentro do loop de animação, isso acontecerá para cada quadro de animação,
    farei exatamente a mesma coisa para draw()
 */