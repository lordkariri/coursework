
let counter = 0;
Tone.Transport.start()
//set the default speed to 600 beats per minute
Tone.Transport.bpm.value = 600;
//this list will keep track of how many beats there are in the song
var numberOfBeats = [];
//sets the degault volume to 2.
let vol = 2;
let lastIndex = 0;

    
//loads the sounds i will use. "sampler" is a type of keyboard and was sorced from "salamander"
const sampler = new Tone.Sampler({
    //getting the notes i need
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
//instrument "sampler" has been initialised
//initilising my snare drum
const snare = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/snare.wav").toDestination();
//initialising my hihat
const hihat = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/hihat.wav").toDestination();

//initialising my "tink" sound

const tink = new Tone.Player("https://js-beginners.github.io/javascript30-drumkit/sounds/tink.wav").toDestination();
// initialsing the kickdrum
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






//this is called as soon as the mouse has been lifted up (ie a line has been drawn)
//takes in the first y coordinate of the line, the bracket represents the number of possible notes on the screen
function soundConverter(Ypos,bracket,width){
    
    
    

    // if the user is drawing then....
    if (backgroundButtonPressed == false){
      // works out which bracket the line falls into, to determine its note
      var pitch = Math.ceil(Ypos/bracket)-1;
      //creates a new Note object, with all the details of the note
      
      for (let i= 0; i < xcoOrds.length; i++) {
        xcoOrds[i] = parseInt(xcoOrds[i]);
        ycoOrds[i] = parseInt(ycoOrds[i])
      }
      var volume = volumeCalculator(width);
      var newNote = new Note(pitch, volume, currentBrush, 0, xstart[xstart.length-1],xcoOrds,ycoOrds);
      if (numberOfBeats.length == 0){
        var beat = new Beat(newNote.xstart,newNote);
        numberOfBeats.push(beat);
        //music.inOrder();
        music.insertIter(beat.mainNote,beat);
        lastIndex = numberOfBeats.length-1;
            
      }else{
        let noteAdded = false;
        for (let i = 0; i < numberOfBeats.length; i++) {
          
          if (isItEllibile(newNote, numberOfBeats[i]) && noteAdded == false){
            numberOfBeats[i].addNote(newNote);
            lastIndex = i;
            
            noteAdded = true;
          }
         
        }
        if (!noteAdded){
          
          var beat = new Beat(newNote.xstart,newNote);
          numberOfBeats.push(beat);
          music.insertIter(beat.mainNote,beat);
          lastIndex = numberOfBeats.length-1;
        }
      }
      
      
      
    
    //inserts the beat into the music
    //
}
}

function sectioning(innerHeight){
   
    var bracket = innerHeight/sectioningNumber;
    
    return bracket;
}
function volumeCalculator(width){
  if (width<30){
    return -10
  }else if(width<50){
    return 0
  }else{
    return 10
  }
}

function isItEllibile(note,beat){
  
  return doesTheBrushExist(note,beat) && isThereOverlap(note.xcoOrds,beat.allxcoOrds);
}
function doesTheBrushExist(note,beat){
  return !(beat.brushes.includes(note.brush))
}
function isThereOverlap(notexcoOrds,beatxcoOrds){
   
  return true
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
   
  


