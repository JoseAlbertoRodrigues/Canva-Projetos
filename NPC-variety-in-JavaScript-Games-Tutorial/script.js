addEventListener('load', function() {
    // const canvas = document.getElementById('canvas1')
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 500
    canvas.height = 800

    class Game {
        // aqui terá: atualização de todo o jogo, inimigo, jogadores, obstáculos, menus de fundo, e assim por diante
        constructor(c, width, height) {
            this.c = c
            this.width = width
            this.height = height
            this.enemies = []
            this.enemyInterval = 1000
            this.enemyTimer = 0
            // this.#addNewEnemy() // nova instância do meu objeto, console.log(this.enemies) // ver se funcionou
        }

        update(deltaTime) {
            // cria um novo array no mesmo, com a propriedade que eu passei
            this.enemies = this.enemies.filter(object => !object.markedForDeletion)
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy()
                this.enemyTimer = 0
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(object => object.update())
        }

        draw() {
            this.enemies.forEach(object => object.draw(this.c))
        }

        #addNewEnemy() {
            // Método privado, só pode ser chamado de dentro da minha classe de jogo para gerenciar
            // algum tipo de funcionalidade interna, em nosso casso adicionar um novo inimigo, na matriz this.enemies

            this.enemies.push(new Worm(this)) //agora fiz a sybstituição, this.enemies.push(new Enemy(this))

        }
    }

    class Enemy {
        // aqui será cada inimigo individual
        constructor(game) {
            this.game = game
            // console.log(this.game) // tenho acesso a largura do meu jogo
            this.markedForDeletion = false
            
            // this.x = this.game.width // aqui estará logo atrás da da borda direita da tela
            // this.y = Math.random() * this.game.height // altura aleatória da tela, eu consigo isso por causa do this em: this.enemies.push(new Enemy(this))
            // this.width = 100
            // this.height = 100
        }

        update() {
            this.x -= this.velocityX * deltaTime
            // remove enemies
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true
            }
        }

        draw(c) {
            c.drawImage(
                this.image,
                0,
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

    class Worm extends Enemy {
        constructor() {
            super(game)
            this.spriteWidth = 229
            this.spriteHeight = 171
            this.width = this.spriteWidth / 2
            this.height = this.spriteHeight / 2
            this.x = this.game.width // aqui estará logo atrás da da borda direita da tela
            this.y = Math.random() * this.game.height // altura aleatória da tela, eu consigo isso por causa do this em: this.enemies.push(new Enemy(this))
            this.image = worm // está vindo do html, sem precisar usar o getElementById... // console.log(this.image)
            this.velocityX = Math.random() * 0.1 + 0.1
        }
    }

    const game = new Game(c, canvas.width, canvas.height) // ver se funcionou, novo objeto em branco
    let lastTime = 1
    function animate(timeStamp) {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp // console.log(deltaTime) // meu tempo deltano meu pc é de 16 milissegundos

        game.update(deltaTime)
        game.draw()
    }

    animate(0)
})