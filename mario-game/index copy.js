// Plataforma - platform
// import platform from '../img/platform.png'
import platform from '../img/platform-one.png'
import hills from '../img/11.png'
import background from '../img/background.png'

// console.log(platform)

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// canvas.width = innerWidth
// canvas.height = innerHeight
canvas.width = 1024
canvas.height = 576

// const gravity = 1.5
const gravity = 0.8
class Player {
    constructor () {
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
        } else {
            this.velocity.y = 0
        }
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
      c.drawImage(this.image, this.position.x, this.position.y)
        // Não vou usar mais esse
        // c.beginPath()
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // c.fill()
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
      c.drawImage(this.image, this.position.x, this.position.y)
        // Não vou usar mais esse
        // c.beginPath()
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // c.fill()
    }
}

function createImage(imageSrc) {
    // imagem da plataforma
    const image = new Image()
    image.src = imageSrc
    return image
}

const platformImage = createImage(platform)

// console.log(image)

const player = new Player()
// const platform = new Platform()

const platforms = [
  new Platform({
    x: -1,
    y: 470,
    image: platformImage
  }),
  new Platform({x: platformImage.width - 3, y:470, image: platformImage}),
//   new Platform({x: 400, y:470, image}),
//   new Platform({x: 550, y:470, image:platformImage})
]

const genericObjects = [
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

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

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
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= 5
            })
        } else if(keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += 5
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
    // if (scrollOffset > 2000) {
    //     console.log('You Win! Parabêns!')
    // }
}

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
            player.velocity.y -= 10
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
            player.velocity.y -= 10
            break
    }
    console.log(keys.right.pressed)
})

// 65 a  -> seta: ArrowLeft
// 83 s  -> seta: ArrowDown
// 68 d  -> seta: ArrowRight
// 87 w  -> seta: ArrowUp
