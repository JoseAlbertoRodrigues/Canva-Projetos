const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let timeToNextRaven = 0 // tempo para o próximo raven
let ravenInterval = 500 // 500 milissegundos
let lastTime = 0 // variavel para manter o valor do registro data/hora do loop anterior

let score = 0 // pontuação
c.font = '50px Impact' // fonte da pontuação

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
        }

        // console.log(deltaTime)
    }

    draw() {
        c.strokeRect(this.x, this.y, this.width, this.height)
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
// const raven = new Raven()

function drawScore() {
    c.fillStyle = 'black'
    c.fillText('Score: ' + score, 50, 75)
    c.fillStyle = 'white'
    c.fillText('Score: ' + score, 55, 80)
}


function animate(timestamp) {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    // valor em milissegundo entre o registro dataEhora, e o valor do registro de dataEhora salvo
    let deltaTime = timestamp - lastTime
    lastTime = timestamp  //testar console.log(timestamp)
    timeToNextRaven += deltaTime // tempo para o próximo corvo esta aumentando cerca de 16 milessegundo por cada quadro //console.log(deltaTime)

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven())
        timeToNextRaven = 0 // quando atingir o tempo de 500 milissegundo ele volta a zero, para começar a contar novamente
        // console.log(ravens)
    }
    // console.log(deltaTime) // aqui o deltaTime o primeiro valor é NAN
    // console.log(timestamp) // o primeiro valor aqui da (UNDEFINED) esse é a raiz do problema, é só eu colocar um valor no: animate(0)

    drawScore()
    // adicionando os objetos
    // [...ravens].forEach(object => object.update()) não consegui usar os dois
    // [...ravens].forEach(object => object.draw())
    ravens.forEach((object) => {
        object.update(deltaTime)
        object.draw()
    })

    // excluir o objeto que passar do canto esquerdo da tela
    ravens = ravens.filter(object => !object.markedForDeletion)

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