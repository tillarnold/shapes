import {Circle} from '..'

let canvas = document.createElement('canvas')
  , ctx = canvas.getContext('2d')
  , circle = new Circle([10, 10], 50)
  , colorSwitch = true

document.body.appendChild(canvas)
canvas.style.outline = '1px solid black'


let see = circle.createShapeEventEmitter(canvas)

see.on('click', e => {
  console.log(e)
  colorSwitch = !colorSwitch
  ctx.fillStyle = colorSwitch ? 'red' : 'blue'

  circle.fill(ctx)
})

circle.stroke(ctx)
