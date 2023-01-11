const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700
let gameSpeed = 10

const background1 = new Image()
background1.src = '../mario-game/img/background-1.png'
const background2 = new Image()
background2.src = '../mario-game/img/background-2.png'
const background3 = new Image()
background3.src = '../mario-game/img/background-3.png'
const background4 = new Image()
background4.src = '../mario-game/img/background-4.png'
const background5 = new Image()
background5.src = '../mario-game/img/background-5.png'

addEventListener('load', function() {
    const slider = document.querySelector('#slider')
    slider.value = gameSpeed

    const showGameSpeed = document.querySelector('#showGameSpeed')
    showGameSpeed.innerHTML = gameSpeed

    slider.addEventListener('change', function(e) {
        // console.log(e.target.value)
        gameSpeed = e.target.value
        showGameSpeed.innerHTML = gameSpeed
    })

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 750
            this.image = image
            this.speedModifier = speedModifier
            this.speed = gameSpeed * this.speedModifier
        }
        update() {
            this.speed = gameSpeed * this.speedModifier

            if(this.x <= -this.width) {
                this.x = 0
            }
            this.x = Math.floor(this.x - this.speed)
        }
        draw() {
            c.drawImage(this.image, this.x, this.y, this.width, this.height)
            c.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }
    }

    const layer1 = new Layer(background1, 0.2) // 5 pixels por quadro
    const layer2 = new Layer(background2, 0.4)
    const layer3 = new Layer(background3, 0.6)
    const layer4 = new Layer(background4, 0.8)
    const layer5 = new Layer(background5, 1)

    const gameObjects = [layer1, layer2, layer3, layer4, layer5]

    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        gameObjects.forEach((gameObject) => {
            gameObject.update()
            gameObject.draw()
        })
    }
    animate()
})


/**
 * Esse é o final, só vou tirar os comentários do código de cima
 */



/**
 *  outra maneira
 
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight

const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700
let gameSpeed = 10
let gameFrame = 0

const background1 = new Image()
background1.src = '../mario-game/img/background-1.png'
const background2 = new Image()
background2.src = '../mario-game/img/background-2.png'
const background3 = new Image()
background3.src = '../mario-game/img/background-3.png'
const background4 = new Image()
background4.src = '../mario-game/img/background-4.png'
const background5 = new Image()
background5.src = '../mario-game/img/background-5.png'

// o valor do botão slider passa a ser o valor do gameSpeed
const slider = document.querySelector('#slider')
slider.value = gameSpeed

const showGameSpeed = document.querySelector('#showGameSpeed')
showGameSpeed.innerHTML = gameSpeed

// agora para alterar quando eu mexer no botão
// sempre que o usuário clicar
slider.addEventListener('change', function(e) {
    // console.log(e.target.value)
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = gameSpeed
})


class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 750
        // this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }
    update() {
        // execulta sempre que o método update() é chamado
        this.speed = gameSpeed * this.speedModifier
        this.x = this.frame * this.speed % this.width

        //if(this.x <= -this.width) {
            // Portanto, esse ponto x precisa ser compensado pelo valor atual de this.x2
            // this.x é para ser compensado se houver lacuna, se ele não for redefinidos
        //    this.x = 0
        //}
        // if(this.x2 <= -this.width) {
        //     // A mesma coisa para o this.x2
        //     this.x2 = this.width + this.x + this.speed
        // }
        // para que as contas sejam inteiras, não tenha pontos quebrados
        // posso pegar agora essas duas variáveis e desenhar duas imagens identicas
        // this.x = Math.floor(this.x - this.speed)
        // this.x2 = Math.floor(this.x - this.speed)
    }
    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
        c.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

const layer1 = new Layer(background1, 0.2) // 5 pixels por quadro
const layer2 = new Layer(background2, 0.4)
const layer3 = new Layer(background3, 0.6)
const layer4 = new Layer(background4, 0.8)
const layer5 = new Layer(background5, 1)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    gameObjects.forEach((gameObject) => {
        gameObject.update()
        gameObject.draw()
    })

    gameFrame--
}

animate()
 * 
 */






/** 
 * 
 * Essa maneira é melhor, mas não preciso ter todo esse deslocamento que fiz 
 * aqui nas imagens em update()
 * COM ISSO FAREI MAIS UMA ATUALIZAÇÃO PARA MELHORAR E FICAR MAIS LIMPO O CÓDIGO

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight

const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700
let gameSpeed = 10

const background1 = new Image()
background1.src = '../mario-game/img/background-1.png'
const background2 = new Image()
background2.src = '../mario-game/img/background-2.png'
const background3 = new Image()
background3.src = '../mario-game/img/background-3.png'
const background4 = new Image()
background4.src = '../mario-game/img/background-4.png'
const background5 = new Image()
background5.src = '../mario-game/img/background-5.png'

// o valor do botão slider passa a ser o valor do gameSpeed
const slider = document.querySelector('#slider')
slider.value = gameSpeed

const showGameSpeed = document.querySelector('#showGameSpeed')
showGameSpeed.innerHTML = gameSpeed

// agora para alterar quando eu mexer no botão
// sempre que o usuário clicar
slider.addEventListener('change', function(e) {
    // console.log(e.target.value)
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = gameSpeed
})


class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 750
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }
    update() {
        // execulta sempre que o método update() é chamado
        this.speed =gameSpeed * this.speedModifier

        if(this.x <= -this.width) {
            // Portanto, esse ponto x precisa ser compensado pelo valor atual de this.x2
            // this.x é para ser compensado se houver lacuna, se ele não for redefinidos
            this.x = this.width + this.x2 - this.speed 
        }
        if(this.x2 <= -this.width) {
            // A mesma coisa para o this.x2
            this.x2 = this.width + this.x + this.speed
        }
        // para que as contas sejam inteiras, não tenha pontos quebrados
        // posso pegar agora essas duas variáveis e desenhar duas imagens identicas
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }
    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
        c.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

const layer1 = new Layer(background1, 0.2) // 5 pixels por quadro
const layer2 = new Layer(background2, 0.4)
const layer3 = new Layer(background3, 0.6)
const layer4 = new Layer(background4, 0.8)
const layer5 = new Layer(background5, 1)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    gameObjects.forEach((gameObject) => {
        gameObject.update()
        gameObject.draw()
    })

}

animate()

 */




/*

Esse Maneira é melhor de fazer,
Mas na funcão animation() fica com muitas repetições e acaba ficando cansativo isso,
então é melhor criar uma variavel do tipo ARRAY para armazenar tudo dentro de um só lugar

class Layer {
    constructor(image, speedModifier) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 750
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }
    update() {
        // execulta sempre que o método update() é chamado
        this.speed =gameSpeed * this.speedModifier

        if(this.x <= -this.width) {
            // Portanto, esse ponto x precisa ser compensado pelo valor atual de this.x2
            // this.x é para ser compensado se houver lacuna, se ele não for redefinidos
            this.x = this.width + this.x2 - this.speed 
        }
        if(this.x2 <= -this.width) {
            // A mesma coisa para o this.x2
            this.x2 = this.width + this.x + this.speed
        }
        // para que as contas sejam inteiras, não tenha pontos quebrados
        // posso pegar agora essas duas variáveis e desenhar duas imagens identicas
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }
    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
        c.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }
}

const layer1 = new Layer(background1, 0.5) // 5 pixels por quadro
const layer2 = new Layer(background2, 0.8)
const layer3 = new Layer(background3, 1)
const layer4 = new Layer(background4, 1.2)
const layer5 = new Layer(background5, 1.4)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // fica muito repetitivo, principalmente se tiver muita coisa

    // layer1.update()
    // layer1.draw()
    // layer2.update()
    // layer2.draw()
    // layer3.update()
    // layer3.draw()
    // layer4.update()
    // layer4.draw()
    // layer5.update()
    // layer5.draw()
}

animate()

*/






// Animação simples de parallax, mas não tão eficiênte
// let gameSpeed = 5
// let x = 0
// let x2 = 2400
// function animate() {
//     requestAnimationFrame(animate)
//     c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     c.drawImage(background4, x, 0)
//     c.drawImage(background4, x2, 0)
//     if ( x < -2400) {
//         x = 2400 + x2 - gameSpeed
//     } else {
//         x -= gameSpeed
//     }
//     if ( x2 < -2400) {
//         x2 = 2400 + x - gameSpeed
//     } else {
//         x2 -= gameSpeed
//     }
// }