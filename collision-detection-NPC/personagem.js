const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const image1 = new Image()
image1.src = './image/player/Idle (1).png'
const image2 = new Image()
image2.src = './image/player/Idle (2).png'
const image3 = new Image()
image3.src = './image/player/Idle (3).png'
const image4 = new Image()
image4.src = './image/player/Idle (4).png'
const image5 = new Image()
image5.src = './image/player/Idle (5).png'
const image6 = new Image()
image6.src = './image/player/Idle (6).png'
const image7 = new Image()
image7.src = './image/player/Idle (7).png'
const image8 = new Image()
image8.src = './image/player/Idle (8).png'
const image9 = new Image()
image9.src = './image/player/Idle (9).png'
const image10 = new Image()
image10.src = './image/player/Idle (10).png'

let gameFrame = 0

addEventListener('load', function() {
    class Player {
        constructor(image) {
            this.position = {
                x: 200,
                y: 200
            }
    
            this.velocity = {
                x: 0,
                y: 0
            }
            this.frame = 0
            // this.image = image
            // this.width = image.width * 0.4
            // this.height = image.height * 0.4
            // const image = new Image()
            // image.src = './image/player/Idle (7).png'
            // // só utilizar quando a imagem tiver carregada
            image.onload = () => {
                this.image = image
                this.width = image.width * 0.4
                this.height = image.height * 0.4
            }
    
        }

        update() {
            if (gameFrame % 2 === 0) {
                this.frame > 9 ? this.frame = 0 : this.frame++
            }
        }
    
        draw() {
            if( this.image) {
                c.fillStyle = 'white'
                // c.fillRect(this.position.x, this.position.y, this.width, this.height)
                // c.strokeRect(this.position.x, this.position.y, this.width, this.height)
                
                c.drawImage(
                    this.image,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height
                    )
            }
        }
    }

    const player1 = new Player(image1)
    const player2 = new Player(image2)
    const player3 = new Player(image3)
    const player4 = new Player(image4)
    const player5 = new Player(image5)
    const player6 = new Player(image6)
    const player7 = new Player(image7)
    const player8 = new Player(image8)
    const player9 = new Player(image9)
    const player10 = new Player(image10)

    const spritePlayers = [player1, player2,player3,player4,player5,player7, player8, player9, player10]


    function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // player1.draw()
    // spritePlayers.forEach((spritePlayer) => {
    //     console.log(spritePlayer)
    //     spritePlayer.update()
    //     spritePlayer.draw()
    // })
    }
    // gameFrame++
    animate()
})



