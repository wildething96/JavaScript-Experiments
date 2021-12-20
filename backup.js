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
particlesArray = [];
const mouse = {
  x: null,
  y: null,
};
class circleEffect {
  constructor() {
    // this.x = x;
    // this.y = y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.colour;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // this.size = Math.random() * 30 + 20;
    hue += 0.005;
    this.colour = "hsl(" + hue + ", 100%, 50%)";
  }
  draw() {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});


function init(){
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new circleEffect())
    }
}
init();

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++) {
        if(particlesArray[i].x < 0 || particlesArray[i].x > canvas.width){
            particlesArray[i].speedX *= -1;
        }
        if(particlesArray[i].y < 0 || particlesArray[i].y > canvas.height){
            particlesArray[i].speedY *= -1;
        }
        particlesArray[i].update();
        particlesArray[i].draw();
        }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
