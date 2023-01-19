addEventListener('load', function() {
    // const canvas = document.getElementById('canvas1')
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 500
    canvas.height = 800

    class Game {
        // aqui terá: atualização de todo o jogo, inimigo, jogadores, obstáculos, menus de fundo, e assim por diante
        constructor() {
            this.enemies = []
        }

        update() {

        }

        draw() {

        }

        #addNewEnemy() { 
            // Método privado, só pode ser chamado de dentro da minha classe de jogo para gerenciar
            // algum tipo de funcionalidade interna, em nosso casso adicionar um novo inimigo, na matriz this.enemies

        }
    }

    class Enemy {
        // aqui será cada inimigo individual
        constructor() {
            this.x = 100
            this.y = 100
            this.width = 100
            this.height = 100
        }

        update() {
            this.x--
        }

        draw() {
            c.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    let lastTime = 1
    function animate(timeStamp) {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        // console.log(deltaTime) // meu tempo deltano meu pc é de 16 milissegundos
    }

    animate(0)
})