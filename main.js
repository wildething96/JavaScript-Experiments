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
    // this.x = mouse.x;
    // this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.colour = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    hue += 0.01;
    // this.colour = "hsl(" + hue + ", 100%, 75%)";
    if (this.size > 0.02) this.size -= 0.05;
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

  for (let i = 0; i < 20; i++) {
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
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 80) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].colour;
        ctx.lineWidth = particlesArray[i].size / 20;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    // if (particlesArray[i].x < 0 || particlesArray[i].x > canvas.width) {
    //   particlesArray[i].speedX *= -1;
    // }
    // if (particlesArray[i].y < 0 || particlesArray[i].y > canvas.height) {
    //   particlesArray[i].speedY *= -1;
    // }
    if (particlesArray[i].size <= 1) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  //   hue += 0.2;
  requestAnimationFrame(animate);
}
animate();
