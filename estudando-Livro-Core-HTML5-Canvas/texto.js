// var canvas = document.getElementById('canvas')
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

c.font = '38pt Arial'
c.fillStyle = 'cornflowerblue'
c.strokeStyle = 'blue'

c.fillText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15)
c.strokeText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15)
