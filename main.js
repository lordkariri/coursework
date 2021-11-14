let lines = [];
let xStart = [];
let color = "blue";
let yStart = [];



var playing = true;
//storing the notes, chords, and sounds in an array
var scale = ['C5','G4','F4','E4','D4','C4','F3','G3'];
var chord = [['C4','E4','G4'],['A3','C4','F4'],['B3','D4','G4']];
var percussion = ["tink","hihat","snare"];
//default pallet when you open the webpage
var currentPallet = 1;
//setting all the colours as variables to they can easily be changed across the whole program
var pallet1colour1 = "#67aff0";
var pallet1colour2 = "#f0a867";
var pallet1colour3 = "#F2D42C";
var pallet2colour1 = "green";
var pallet2colour2 = "black";
var pallet2colour3 = "grey";
var pallet3colour1 = "violet";
var pallet3colour2 = "lime";
var pallet3colour3 = "magenta";
// when its pressed, the pen should not draw, when it is not pressed, the pen should draw
var backgroundButtonPressed = false;
//when the first brush is pressed (default when opening the game), the screen needs to be divided into 8 parts as there are 8 notes
var sectioningNumber = 8;
//there are 3 brushes (3 colours) 1st color represents the melody, 2nd Brush represents the harmony, 3rd Brush represents the percussion
let currentBrush =1;






// styling all the painbrush buttons so they fit with the aesthetic of the page
document.getElementById("colour1Button").style.fill= pallet1colour1;
document.getElementById("colour2Button").style.fill= pallet1colour2;
document.getElementById("colour3Button").style.fill= pallet1colour3;
document.getElementById("dropUp1Button1").style.fill= pallet2colour1;
document.getElementById("dropUp1Button2").style.fill= pallet2colour2;
document.getElementById("dropUp1Button3").style.fill= pallet2colour3;
document.getElementById("dropUp2Button1").style.fill= pallet3colour1;
document.getElementById("dropUp2Button2").style.fill= pallet3colour2;
document.getElementById("dropUp2Button3").style.fill= pallet3colour3;

//called by pressing the first paintbrush button, changes the colour to one required, and the musical attributes accordingly
function colour1(){
   
    currentBrush = 1;
    // this is going to be the melody, so 8 divisions are needed, one for each note
    var sectioningNumber = 8;
    //function called to change the notes required by the brush
    bracket = sectioning(window.innerHeight);
    //all the other buttons are set to false except the pain button
    backgroundButtonPressed = false;
    //changes colour depending on which pallet has been chosen
    if (currentPallet==1){
        currentDrawingColour = pallet1colour1;
    }
    
    else if(currentPallet==2){
        currentDrawingColour = pallet2colour1;
    }
    else{
        currentDrawingColour = pallet3colour1;
    }
    
    
  }
  //refer to colour1
function colour2(){
 
    currentBrush = 2;
  
    sectioningNumber = 3;

    bracket = sectioning(window.innerHeight);
   
    
    
    
    backgroundButtonPressed = false;
    if (currentPallet==1){
        currentDrawingColour = pallet1colour2;
    }
    
    else if(currentPallet==2){
        currentDrawingColour = pallet2colour2;
    }
    else{
        currentDrawingColour = pallet3colour2;
    }
   

}
  //refer to colour1
 
 function colour3(){
 
    currentBrush = 3;
    
  
    sectioningNumber = 3;

    bracket = sectioning(window.innerHeight);
   
    
    
    
    backgroundButtonPressed = false;
    if (currentPallet==1){
        currentDrawingColour = pallet1colour3;
        
    }
    
    else if(currentPallet==2){
        currentDrawingColour = pallet2colour3;
    }
    else{
        currentDrawingColour = pallet3colour3;
    }
 
    
   

}
//changes the pallet, and all the musical features the pallet demands
function pallet1(){
    //changes the button settings
    currentPallet = 1;
    changeColor(currentPallet);
    backgroundButtonPressed = false;
    //sets the scale, chord and percussion required. 
    scale = ['C5','G4','F4','E4','D4','C4','F3','G3'];
    chords = ['C4','C4','C4']
    
    
    //styles all the buttons to fit the aesthetic of the screen
    document.getElementById("colour1Button").style.fill= pallet1colour1;
    document.getElementById("colour2Button").style.fill= pallet1colour2;
    document.getElementById("colour3Button").style.fill= pallet1colour3;
    document.getElementById("dropUp1Button1").style.fill= pallet2colour1;
    document.getElementById("dropUp1Button2").style.fill= pallet2colour2;
    document.getElementById("dropUp1Button3").style.fill= pallet2colour3;
    document.getElementById("dropUp2Button1").style.fill= pallet3colour1;
    document.getElementById("dropUp2Button2").style.fill= pallet3colour2;
    document.getElementById("dropUp2Button3").style.fill= pallet3colour3;
    

    }
//refer to pallet 1
function pallet2(){
    scale = ['D5','A4','B4','F#4','E4','D4','G3','A3'];
    currentPallet = 2;
    changeColor(currentPallet);
    backgroundButtonPressed = false;
    document.getElementById("colour1Button").style.fill= pallet2colour1;
    document.getElementById("colour2Button").style.fill= pallet2colour2;
    document.getElementById("colour3Button").style.fill= pallet2colour3;
    document.getElementById("dropUp1").onclick= pallet1;
    document.getElementById("dropUp2").onclick= pallet3;
    document.getElementById("dropUp1Button1").style.fill= pallet1colour1;
    document.getElementById("dropUp1Button2").style.fill= pallet1colour2;
    document.getElementById("dropUp1Button3").style.fill= pallet1colour3;
    document.getElementById("dropUp2Button1").style.fill= pallet3colour1;
    document.getElementById("dropUp2Button2").style.fill= pallet3colour2;
    document.getElementById("dropUp2Button3").style.fill= pallet3colour3;


}
//refer to pallet 1
function pallet3(){
    scale = ['D5','A4','B4','F#4','E4','D4','G3','A3'];
    currentPallet = 3;
    changeColor(currentPallet);
    backgroundButtonPressed = false;
    document.getElementById("colour1Button").style.fill= pallet3colour1;
    document.getElementById("colour2Button").style.fill= pallet3colour2;
    document.getElementById("colour3Button").style.fill= pallet3colour3;
    document.getElementById("dropUp1").onclick= pallet1;
    document.getElementById("dropUp2").onclick= pallet2;
    document.getElementById("dropUp1Button1").style.fill= pallet1colour1;
    document.getElementById("dropUp1Button2").style.fill= pallet1colour2;
    document.getElementById("dropUp1Button3").style.fill= pallet1colour3;
    document.getElementById("dropUp2Button1").style.fill= pallet2colour1;
    document.getElementById("dropUp2Button2").style.fill= pallet2colour2;
    document.getElementById("dropUp2Button3").style.fill= pallet2colour3;
}
//when background button is pressed, button is set to true. 
function changeBackground(){
    backgroundButtonPressed = true;
}

  
