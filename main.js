var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

var x = canvas.width / 2;
var y = canvas.height / 2;
let hue = 0;

const mouse = {
    x: null,
    y: null
}
class circleEffect {
  constructor() {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 100;
    this.colour;
  }
  update() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 30 + 20;
    hue += 3;
    this.colour = 'hsl(' + hue + ', 100%, 50%)';
  }
  draw() {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill()
  }
}

let circle = new circleEffect();

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y
    circle.update();
    circle.draw();
})