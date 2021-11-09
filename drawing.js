


var currentDrawingColour = pallet1colour1;


var canvas = document.getElementById("drawingCanvas");
const red = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var bracket = sectioning(window.innerHeight);
const ctx = canvas.getContext("2d"); 
let painting = false;
let index = -1;
let restore_array = [];
let xCoOrds = [];
let yCoOrds = [];
let lineX = [];
let lineY = [];
let lineColor = [];


function startPosition(e){
    xStart.push(e.clientX);
    yStart.push(e.clientY);
    yStart[yStart.length-1] = soundConverter(yStart[yStart.length - 1],bracket);
   
  
    painting = true;
    draw(e);
}
function finishedPosition() {
    lineX.push(xCoOrds);
    lineY.push(yCoOrds);
    lineColor.push(currentBrush);
    xCoOrds = []
    yCoOrds = []
    painting = false;
    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index+=1;
    console.log(lineColor);
    
    
    
    
    ctx.beginPath();
    
    
}
function changeColor(currentPallet){
 
    
   
    var i;
    for (lineNum = 0; lineNum < lineX.length; lineNum++) {
        
        
        for (i = 0; i< lineX[lineNum].length; i++){
            ctx.moveTo(lineX[lineNum][i], lineY[lineNum][i]);
            
            if (currentPallet ==1){
                if (lineColor[lineNum]==1){
                    currentDrawingColour = pallet1colour1
                } else if (lineColor[lineNum] == 2){
                    currentDrawingColour = pallet1colour2    
                } else if (lineColor[lineNum]==3){
                    console.log("called 2");
                    currentDrawingColour = pallet1colour3
                }
            } else if (currentPallet ==2){
                if (lineColor[lineNum]==1){
                    currentDrawingColour = pallet2colour1
                } else if (lineColor[lineNum] == 2){
                    currentDrawingColour = pallet2colour2    
                } else if (lineColor[lineNum] ==3){
                    currentDrawingColour = pallet2colour3
                }
            } else if (currentPallet ==3) {
                if (lineColor[lineNum]==1){
                    currentDrawingColour = pallet3colour1
                } else if (lineColor[lineNum] == 2){
                    currentDrawingColour = pallet3colour2    
                } else if (lineColor[lineNum] == 3) {
                    currentDrawingColour = pallet3colour3
                }
            }
            
            ctx.strokeStyle = currentDrawingColour;
            ctx.beginPath();
            
            ctx.lineTo(lineX[lineNum][i], lineY[lineNum][i]);
            ctx.stroke(); 
            ctx.closePath();
            
        }
        
        
         
        
    }
}

function draw(e){
    //console.log(color);
    if(!painting) return;
    if (backgroundButtonPressed) return;
    
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentDrawingColour; 
    xCoOrds.push(e.clientX);
    yCoOrds.push(e.clientY);
    
    ctx.moveTo(e.clientX, e.clientY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}
function undo(){


    if(index <= 0){
        
        ctx.clearRect(0,0,canvas.width,canvas.height)
        index -= 1;
        restore_array.splice(-1);
    } else {
        
        
        
        restore_array.splice(-1);
        
        ctx.putImageData(restore_array[index-1],0,0);
        index -= 1;
       
    }
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);  

download_img = function(el) {
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
  };




function start(melody,scale,playing){
    //console.log(playing);
    for (let i = 0; i < melody.length; i++) {
        setTimeout(() => scale[melody[i]].play(), (i+1)*1000);
    } 
    if (playing){
        start(yStart,scale);
    }
    
    
}




