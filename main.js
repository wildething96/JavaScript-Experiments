var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let hue = 0;
particlesArray = [];

const mouse = {
  x: null,
  y: null,
};
class circleEffect {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.colour = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    hue += 0.01;
    // this.colour = "hsl(" + hue + ", 100%, 50%)";
    if (this.size > 0.2) this.size -= 0.1;
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

  for (let i = 0; i < 10; i++) {
    particlesArray.push(new circleEffect());
    // hue += 20;
  }
});

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new circleEffect());
//   }
// }
// init();

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].x < 0 || particlesArray[i].x > canvas.width) {
      particlesArray[i].speedX *= -1;
    }
    if (particlesArray[i].y < 0 || particlesArray[i].y > canvas.height) {
      particlesArray[i].speedY *= -1;
    }
    if (particlesArray[i].size <= 0.5) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
//   hue += 0.2;
  requestAnimationFrame(animate);
}
animate();
