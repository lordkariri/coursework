class Note {
    //set the properties of each note
    constructor(pitch, volume, brush, pause,xstart,xcoOrds,ycoOrds) {
     
      this.pitch = pitch;
      this.volume = volume;
      this.brush = brush;
      this.pause = pause;
      this.xstart = xstart;
      this.xcoOrds = xcoOrds
      
      this.ycoOrds = ycoOrds
      
      for (let i = 0; i < this.xcoOrds.length; i++) {
         this.xcoOrds[i] = parseInt(this.xcoOrds[i]);
         this.ycoOrds[i] = parseInt(this.ycoOrds[i]);
      }
      
     
      //play the note!
      playMusic(this.pitch, this.volume, this.brush,0,this.xcoOrds,this.ycoOrds,false);
    }
    getcoords(){
       return this.xcoOrds;
    }
 }
 //used to play the note
 function playMusic(pitch, volume, brush, pause,xcoOrds,ycoOrds,interacting){
    // if the user has pressed the "play button" then play the associated interaction with the line. 
   if (interacting){
      addDotAnimations(xcoOrds,ycoOrds);
   }   
   
   //resets the time...
    const now = Tone.now();
    //if the line has been drawn with brush 1 then play the melody
    if (brush == 1){
       //load the sounds
        Tone.loaded().then(() => {
           
         sampler.volume.value = volume;
          //sampler is an instrument, play the sampler at the correct pitch for 1 measure and wait the appropriate amount of time before starting it
         sampler.triggerAttackRelease(scale[pitch], "1m",now+pause);
         
        })
        
        
        
        
       
       
        
     //if the line has been drawn with brush 2 then play the harmony    
    } else if (brush == 2){
         //set the volime of the note
         sampler.volume.value = volume;
        //find the right chord that needs to be played and play all 3 notes of the chord for 1 measure and wait the appropriate amount of time before starting it
        sampler.triggerAttackRelease(chord[pitch][0], "1m",now+pause)
        sampler.triggerAttackRelease(chord[pitch][1], "1m",now+pause)
        sampler.triggerAttackRelease(chord[pitch][2], "1m",now+pause)
       
        //if the line has been drawn with brush 3 then play the percussion
    } else if (brush == 3){
       //load the sounds
       //depending on the pitch of the line play a different sound
       Tone.loaded().then(() => {
            if (pitch==0){
               //if the line is at the bottom of the screen play a hihat, starting at the appropriate time
                hihat.start(now+pause);
            }else if (pitch==1){
                //if the line is in the middle of the screen then play a snare drum for 1 measure starting at the appropriate measure
                snareDrum.triggerAttackRelease('4n',now+pause)
            }else if (pitch==2){
               //if the line is toward the top of the screen then play the kick drum
                kickDrum.triggerAttackRelease('C1', '1m',now+pause)
            }
        }) 
    
    } 
    //return pitch;
 }
  //creates a Beat object, each node on the tree stores one beat
 class Beat{
    //the mainNote is the value that will represent the beat defaulted to the melody node and it is the value that will be inserted into the tree
    constructor(mainNote, notes) {
        this.mainNote = mainNote;
        
        //each beat can story many Note objects that will be stored in the array this.notes...
        this.notes = [notes];
        this.brushes = [];
        this.brushes.push(this.notes[0].brush);
        //this.max = maximum x value
        //this.min = minimum x value
    
        
        
        
    }
    //if you want to add a new note to this beat
    addNote(newNote){
       //add the note to the array notes...
       this.notes.push(newNote);
       this.brushes.push(newNote.brush);
       //change max and min vaue
       //making sure the note with brush one (the melody) is always at the start of the list
       //if (newNote.brush == 1){
       //   this.notes.reverse();
          //this.mainNote= newNote.xstart;
          //delete the old one
          //change the node of tree
       //}     
    }
    deleteNote(){
       
       for (let i = 0; i < this.notes.length; i++) {
          if(this.notes[i].brush == this.brushes[this.brushes.length -1]){
             this.notes.splice(i);
             this.brushes.splice(this.brushes.length -1);
          }
          
       }
       //change max value and change min value
       console.log(this.notes);
       if (this.notes.length == 0){
          
          //delete this beat from music
          return true
          //if this node was a root node then reset everything. 

       }
       return false
       
    }
    getNotes(){
        return(this.notes)
    }
 } 
 

 
 
 