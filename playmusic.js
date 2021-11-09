const synth = new Tone.Synth().toDestination();

const now = Tone.now()
Tone.Transport.start()
Tone.Transport.bpm.value = 600;

    

const sampler = new Tone.Sampler({
    urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

const snare = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/snare.wav").toDestination();

const hihat = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/hihat.wav").toDestination();

	

const tink = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/tink.wav").toDestination();



function play(){
    const synth = new Tone.Synth().toDestination();

    const now = Tone.now()
    Tone.Transport.start()
    Tone.Transport.bpm.value = 600;

    

    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    Tone.loaded().then(() => {
        sampler.triggerAttackRelease("C4", "1m", now)
        sampler.triggerAttackRelease("E4", "1m", now)
        sampler.triggerAttackRelease("G4", "1m", now)
    })
    
}
function soundConverter(Ypos,bracket){
    //rounds to the nearest number
    
    var note = Math.ceil(Ypos/bracket)-1;
    console.log(note);
    
    if (currentBrush == 1){
        
        
        sampler.triggerAttackRelease(scale[note], "1m")
    } else if (currentBrush = 2){
        sampler.triggerAttackRelease(chord[note][0], "1m")
        sampler.triggerAttackRelease(chord[note][1], "1m")
        sampler.triggerAttackRelease(chord[note][2], "1m")
    } else if (currentBrush = 3){
        Tone.loaded().then(() => {
            percussion.start(now);
            
        });
    } 
   
    
    
   
    return note;
}

function sectioning(innerHeight){
    //console.log(innerHeight);
    var bracket = innerHeight/sectioningNumber;
    
    return bracket;
}


 
function order(x,y) {
    //console.log(x);
    //console.log(y);
	for (let i = 0; i < x.length; i++) {
		for (let j = 0; j < x.length; j++) {
			if (x[j] > x[j + 1]) {
                x[j] = x.splice(j+1, 1, x[j])[0];
                y[j] = y.splice(j+1, 1, y[j])[0];
				
			}
        }
        
	}
	//console.log(x);
    //console.log(y);
}


//var canvas = document.getElementById("canvas");
/* var ctx = canvas.getContext("2d");
ctx.strokeStyle = "Green";
var posY = 0;
var lineLength = 10;
var speed = 2;

function drawLine() {
	ctx.beginPath();
  ctx.moveTo(10, posY);
  ctx.lineTo(10, posY+lineLength);
  ctx.stroke();
}

function moveLine () {
	posY += speed;
  
  if (posY < 0 || posY > canvas.height) {
	  speed = speed * -1;
  }
}

function loop() {
	// clear old frame;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  moveLine();
  drawLine();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
 */

