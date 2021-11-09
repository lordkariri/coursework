



var c = document.getElementById("backgroundCanvas");

var backgroundctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#FF6138";
var animations = [];
var circles = [];
var backgroundButtonPressed = false;



var colorPicker = (function() {
  
  var currentBackgroundColour = "#FF6138";
  
  
  
  
  function current() {
    return currentBackgroundColour
  }
  function newColour(newBackgroundColour){
    currentBackgroundColour = newBackgroundColour;
  }
  
  return {
    current: current,
    newColour: newColour
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}



function handleEvent(e) {
    

    var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1)
    var rgba = imgData.data;
    var newBackgroundColour = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
    
    //colorPicker.newColour(newBackgroundColour)
    
    if (e.touches) { 
      e.preventDefault();
      e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextBackgroundColour = newBackgroundColour;
    if (backgroundButtonPressed==true){
      playing = false;
      var nextBackgroundColour = newBackgroundColour;
    }
    //option1
    else {
      var nextBackgroundColour = colorPicker.current();
      var currentColor = "white";;
    } 
    //option2
    /* else {
      var nextBackgroundColour = colorPicker.current();
      var currentColor = newBackgroundColour;
    } */
    //option3
    /* else {
      var nextBackgroundColour = colorPicker.current();
      var currentColor = "white";;
    } */
    
    
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextBackgroundColour
    });
    if (backgroundButtonPressed==true){
      colorPicker.newColour(newBackgroundColour);

    }
    
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  backgroundctx.globalAlpha = this.opacity || 1;
  backgroundctx.beginPath();
  backgroundctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    backgroundctx.strokeStyle = this.stroke.color;
    backgroundctx.lineWidth = this.stroke.width;
    backgroundctx.stroke();
  }
  if (this.fill) {
    backgroundctx.fillStyle = this.fill;
    backgroundctx.fill();
  }
  backgroundctx.closePath();
  backgroundctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  update: function() {
    backgroundctx.fillStyle = bgColor;
    backgroundctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  backgroundctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);

  if (!!window.location.pathname.match(/fullcpgrid/)) {
    startFauxClicking();
  }
  
})();



function startFauxClicking() {
  setTimeout(function(){
    fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
    startFauxClicking();
  }, anime.random(200, 900));
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}
document.addEventListener("touchstart", handleEvent);
document.addEventListener("mousedown", handleEvent);
