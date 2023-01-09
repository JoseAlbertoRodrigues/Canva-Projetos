// Plataforma - platform
// import platform from '../img/platform.png'
import platform from '../img/platform-one.png'
import hills from '../img/11.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

// console.log(platform)

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight
canvas.width = 1024
canvas.height = 576

// const gravity = 1.5
const gravity = 1.5
class Player {
    constructor () {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw() {
        c.beginPath()
        c.fillStyle ='red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fill()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
        // aqui vou remover para quando o personagem cair da plataforma, ele sair do cenario, para perder vida ou game over
        // else {
        //     this.velocity.y = 0
        // }
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height

    }

    draw() {
        c.beginPath()
        c.drawImage(this.image, this.position.x, this.position.y)
        // Não vou usar mais esse
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fill()
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.beginPath()
        c.drawImage(this.image, this.position.x, this.position.y)
        // Não vou usar mais esse
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fill()
    }
}

function createImage(imageSrc) {
    // imagem da plataforma
    const image = new Image()
    image.src = imageSrc
    return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

// console.log(image)

let player = new Player()
// const platform = new Platform()

let platforms = [
// new Platform({ x: -1, y: 470, image: platformImage }),
// new Platform({x: platformImage.width - 3, y:470, image: platformImage}),
// new Platform({x: platformImage.width * 4 + 100, y:470, image: platformImage}),
//   new Platform({x: 400, y:470, image}),
//   new Platform({x: 550, y:470, image:platformImage})
]

let genericObjects = [
    // new GenericObject({ x: -1, y: -1, image:  createImage(background) }),
    // new GenericObject({ x: -1, y: -1, image: createImage(hills) })
]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
let scrollOffset = 0

function init() {

    platformImage = createImage(platform)
    // console.log(image)

    player = new Player()
    // const platform = new Platform()

    platforms = [
        new Platform({
            x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width, y:420, image: createImage(platformSmallTall)}),
        // new Platform({x: platformImage.width * 3 + 300, y:270, image: createImage(platformSmallTall)})
    new Platform({
        x: -1,
        y: 470,
        image: platformImage
    }),
    new Platform({x: platformImage.width - 3, y:470, image: platformImage}),
    new Platform({x: platformImage.width * 2 + 100, y:470, image: platformImage}),
    new Platform({x: platformImage.width * 3 + 300, y:470, image: platformImage}),
    new Platform({x: platformImage.width * 4 + 300 - 2, y:470, image: platformImage}), // quado ouver imenda na plataforma
    new Platform({x: platformImage.width * 5 + 700 - 2, y:470, image: platformImage})
    //   new Platform({x: 400, y:470, image}),
    //   new Platform({x: 550, y:470, image:platformImage})
    ]

    genericObjects = [
        new GenericObject({
            x: -1,
            y: -1,
            image:  createImage(background)
        }),
        new GenericObject({
            x: -1,
            y: -1,
            image:  createImage(hills)
        })
    ]
    scrollOffset = 0
}


function animate() {
    requestAnimationFrame(animate)
    // c.clearRect(0, 0, canvas.width, canvas.height)
    //agora vou usar o fillStyle e fillRect, porque coloquei o background-color: black
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    
    platforms.forEach((platform) => {
      platform.draw()
    })
    player.update()

    // key Pressed
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * .66
            })
        } else if(keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * .66
            })
        }
    }

    // platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    // console.log(scrollOffset) testar se a rolagem passou de um determinado valor
    // win condition
    if (scrollOffset > platformImage.width * 5 + 300 - 2) {
        console.log('You Win! Parabêns!')
    }

    // lose condition
    if (player.position.y > canvas.height) {
        // console.log('You lose!, você perdeu')
        init()
    }
}

init()
animate()

// {keyCode} Pegar uma propriedade especifica do objeto event
addEventListener('keydown', ({key}) => {
    // console.log(event.key)
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = true
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = true
            break
        case 'w':
            console.log('up')
            // empurrar para cima sinal de -
            player.velocity.y -= 25
            break
    }
    console.log(keys.right.pressed)
})

// adicionado para o jogador parar de se mover quando pressionar uma tecla
addEventListener('keyup', ({key}) => {
    // console.log(event.key)
    switch (key) {
        case 'a':
            console.log('left')
            keys.left.pressed = false
            break
        case 's':
            console.log('down')
            break
        case 'd':
            console.log('right')
            keys.right.pressed = false
            break
        case 'w':
            console.log('up')
            // empurrar para cima sinal de -
            // player.velocity.y -= 10
            break
    }
    console.log(keys.right.pressed)
})

// 65 a  -> seta: ArrowLeft
// 83 s  -> seta: ArrowDown
// 68 d  -> seta: ArrowRight
// 87 w  -> seta: ArrowUp
