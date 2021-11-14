const synth = new Tone.Synth().toDestination();

const now = Tone.now()
Tone.Transport.start()
Tone.Transport.bpm.value = 600;

let vol = 2;

    

const sampler = new Tone.Sampler({
    
    urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
    },
    release: 1,
    volume : 2,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
   
}).toDestination();

const snare = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/snare.wav").toDestination();

const hihat = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/hihat.wav").toDestination();

	

const tink = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/tink.wav").toDestination();

const kickDrum = new Tone.MembraneSynth({
    volume: 6
  }).toMaster();

const lowPass = new Tone.Filter({
    frequency: 8000,
  }).toMaster();
  
const snareDrum = new Tone.NoiseSynth({
    volume: 3,
    noise: {
      type: 'white',
      playbackRate: 3,
    },
    envelope: {
      attack: 0.001,
      decay: 0.50,
      sustain: 0.15,
      release: 0.03,
    },
}).connect(lowPass);




const bass = new Tone.Synth({
    oscillator : {
      type : "triangle"
    }
  }).toMaster();

  
//snareDrum.triggerAttackRelease('4n')







function soundConverter(Ypos,bracket){
   
    var note = Math.ceil(Ypos/bracket)-1;
    music.insertIter(xStart[xStart.length-1],1);

   
  
    
    if (currentBrush == 1){
        //kickDrum.triggerAttackRelease('C1', '1m')
        //Tone.loaded().then(() => {
            //hihat.start();
            //if (note==0){
             //   hihat.start();
            //}else if (note==1){
            //    snare.start();
            //}else if (note==2){
            //tink.start();
            //}
        //})
        
        sampler.triggerAttackRelease(scale[note], "1m")
        
        
    } else if (currentBrush == 2){
        
        snareDrum.triggerAttackRelease('4n')
        sampler.triggerAttackRelease(chord[note][0], "1m")
        sampler.triggerAttackRelease(chord[note][1], "1m")
        sampler.triggerAttackRelease(chord[note][2], "1m")
       
        
    } else if (currentBrush == 3){
       Tone.loaded().then(() => {
            if (note==0){
                hihat.start();
            }else if (note==1){
                snareDrum.triggerAttackRelease('4n')
            }else if (note==2){
                kickDrum.triggerAttackRelease('C1', '1m')
            }
        }) 
    
    } 
   
    
    
   
    return note;
}

function sectioning(innerHeight){
   
    var bracket = innerHeight/sectioningNumber;
    
    return bracket;
}


 
function order(x,y) {
    
    
    quickSort([1, 6, 1, 5, 3, 2, 1, 4]);

	
}
const quickSort = arr => {
   
    const a = [...arr];

    if (a.length < 2) return a;
    const pivotIndex = Math.floor(arr.length / 2);
    
    const pivot = a[pivotIndex];
    
    const [lo, hi] = a.reduce(
    
      (acc, val, i) => {
        if (val < pivot || (val === pivot && i != pivotIndex)) {
          acc[0].push(val);
        } else if (val > pivot) {
          acc[1].push(val);
        }
        
        return acc;
      },
      [[], []]
    );
  
    return [...quickSort(lo), pivot, ...quickSort(hi)];
  };
   
  



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

