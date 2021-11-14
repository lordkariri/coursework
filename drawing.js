


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
let lineWidth = [];
let d=null;
let t=0;
let tempX=0;
let tempy=0;

function startPosition(e){
    tempX=e.clientX;    // Elena modified: start click pointX remember
    tempY=e.clientY;    // Elena modified: start click pointY remember
    xStart.push(e.clientX);
    yStart.push(e.clientY);
    yStart[yStart.length-1] = soundConverter(yStart[yStart.length - 1],bracket);
   
    // Elena modified: start point time
    d = new Date();
    t = d.getTime();

    painting = true;
    
    draw(e,true); // Elena modified: second parameter is setting start point width by 1
}
function finishedPosition() {
    lineX.push(xCoOrds);
    lineY.push(yCoOrds);
    lineWidth.push(ctx.lineWidth);
    lineColor.push(currentBrush);
    xCoOrds = []
    yCoOrds = []
    painting = false;
    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index+=1;
    //volumeOfLine = volume(ctx.lineWidth.toFixed());
    
    
    
    
    ctx.beginPath();
    
    
}

function volume(width){
    if (width<40){
        
    }
}
function changeColor(currentPallet){
 
    
    
    // for every line on the page
    for (lineNum = 0; lineNum < lineX.length; lineNum++) {
        //for all the coordinates on the line.
        
        for (i = 0; i< lineX[lineNum].length; i++){
            //move the mouse to the start coordinate of the line
            ctx.moveTo(lineX[lineNum][i], lineY[lineNum][i]);
            //find out what colour the line is supposed to be 
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
            //set the paint brush to the right colour
            ctx.strokeStyle = currentDrawingColour;
            ctx.lineWidth = lineWidth[lineNum];
            ctx.beginPath();
            
            ctx.lineTo(lineX[lineNum][i], lineY[lineNum][i]);
            ctx.stroke(); 
            ctx.closePath();
            
        }
        
        
         
        
    }
}

function draw(e,s){
    
    if(!painting) return;
    if (backgroundButtonPressed) return;
    ctx.strokeStyle = currentDrawingColour;

    // Elena modified: end point time
    d = new Date();
    var p=d.getTime() - t;

    if(s) // Elena modified: check start point
        ctx.lineWidth = 20; // Elena modified: initial lineWidth
    else {
        if(p<5000)
            ctx.lineWidth = 20+60*p/5000;  // Elena modified: ratio lineWidth
        else
            ctx.lineWidth = 80; // Elena modified: max lineWidth
    }
    

    ctx.lineCap = "round";
    
   
    xCoOrds.push(e.clientX);
    yCoOrds.push(e.clientY);
    ctx.strokeStyle = currentDrawingColour;
    ctx.moveTo(tempX, tempY);           // Elena modified: draw line - start
    ctx.lineTo(e.clientX, e.clientY);   // Elena modified: draw line - end
    ctx.stroke();
    tempX=e.clientX;    // Elena modified: start click pointX reset
    tempY=e.clientY;   
     // Elena modified: start click pointX reset

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




