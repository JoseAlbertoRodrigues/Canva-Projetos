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

        this.markedForDeletion = false // marcada para exclusão (remover os objetos que passarem da tela, lado esquerdo)
    }
    update() {
        this.x -= this.directionX
        if (this.x < 0 - this.width) { // que o objeto se moveu totalmente para fora da tela
            this.markedForDeletion = true
        }
    }

    draw() {
        c.fillRect(this.x, this.y, this.width, this.height)
    }
}

const raven = new Raven()

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

    // adicionando os objetos
    // [...ravens].forEach(object => object.update()) não consegui usar os dois
    // [...ravens].forEach(object => object.draw())
    ravens.forEach((object) => {
        object.update()
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