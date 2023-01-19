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

        }

        update() {

        }

        draw() {

        }
    }

    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0, 0, canvas.width, canvas.height)

        c.fillRect(50,50, 100, 100)
    }

    animate()
})