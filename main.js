var canvas = document.getElementById("stage");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// var x = canvas.width / 2;
// var y = canvas.height / 2;
// var dx = 2;
// var dy = -2;

// class
