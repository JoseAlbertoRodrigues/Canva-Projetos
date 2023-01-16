let playerState = 'idle'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value
})

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

// c.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

const playerImage = new Image()
playerImage.src = '../image/shadow_dog.png' // ../image/shadow_dog.png

const spriteWidth = 575 // 6876 / 12 = 573px de largura, vai ficar 575 porque o ultimo quadro está um pouco menor
const spriteHeight = 523  // 5230 / 10 = 523px de altura

let gameFrame = 0 // controlar o tempo da animação (aumentando o valor infinitamente)
const staggerFrames = 5 // para desacelerar ou acelerar a animação (gameFrame % staggerFrames === 0) a cada 5 quadro é verdadeiro

const spriteAnimations = []
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 9,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 6,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth
        let positionY = index * spriteHeight
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames
})
console.log(spriteAnimations)

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame / staggerFrames)  % spriteAnimations[playerState].loc.length // % 6 // floor para ficar número inteiro

    let frameX = spriteWidth * position
    let frameY = spriteAnimations[playerState].loc[position].y

    c.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    gameFrame++
}

animate()









/*
pode ser usado, por exemplo, para Sprites irregulares, pode ser valores de pixel para largura e altura que podem
ser diferentes para cada quadro e, principalmente, conterá array de locais esse array de locais conterá um conjunto
de JAVASCRIPT objetos e cada um desses objetos terá propriedades x e y, cada um desses objetos representa um quadro
nessa animação específica, e suas propriedades x e y serão as coordenadas necessárias se quisermos usar o método 
draw para cortar esse quadro específico do folha de sprite dessa forma podemos acessar quaquer quadro que quisermos
a qualquer MediaStreamAudioDestinationNode, direcionando diretamene as posições nesta matriz.
posso apenas percorrer esta matriz localização com um loop for sempre reproduzirá a animação inteira para mim sem a
necessidade de configurar o número de quadros cada animação tem, cada vez ele saberá quantos quadros essa animação tem
com base no número do objetos nesta matriz de localização cada objeto será um quadro.

spriteAnimations = [
    'idle' = {
        loc: [
            { x: 0, y: 0 },
            { x: 575, y: 0 },
            { x: 1150, y: 0 },
            { x: 1725, y: 0 },
            { x: 2300, y: 0 },
            { x: 2875, y: 0 },
            { x: 3450, y: 0 },
        ]
    },
    'jump' = {
        loc: [

        ]
    },
    'run' = {
        loc: [

        ]
    }
]

animationStates = [] estado da animação (será um tipo de mapa que corresponde a minha folha de sprite)
*/



/**
 *
 *
 const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

// c.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)

const playerImage = new Image()
playerImage.src = '../image/shadow_dog.png' // ../image/shadow_dog.png

const spriteWidth = 575 // 6876 / 12 = 573px de largura, vai ficar 575 porque o ultimo quadro está um pouco menor
const spriteHeight = 523  // 5230 / 10 = 523px de altura
let frameX = 0  // 10 * spriteWidth (tamanho da imagem que tiver, é o total de números)
let frameY = 0  // 4 * spriteHeight (tamanho da imagem que tiver, é o total de números)

let gameFrame = 0 // controlar o tempo da animação (aumentando o valor infinitamente)
const staggerFrames = 5 // para desacelerar ou acelerar a animação (gameFrame % staggerFrames === 0) a cada 5 quadro é verdadeiro

function animate() {
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    requestAnimationFrame(animate)
    c.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

    if (gameFrame % staggerFrames === 0) {
        if (frameX < 6) {
            frameX++
        } else {
            frameX = 0
        }
    }
    
    gameFrame++
}

animate()
 */