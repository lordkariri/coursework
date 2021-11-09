/* 





const red = drawingCanvas.getContext("2d");
var bracket = sectioning(window.innerHeight);


 
   
function interactions(){
    var i;
    for (i = 1; i < xCoOrds.length; i++) {
        red.strokeStyle = "red";
        red.beginPath();
        red.moveTo(xCoOrds[i-1], yCoOrds[i-1]);
        red.lineTo(xCoOrds[i], yCoOrds[i]);
        red.stroke();  
    }
}
 
    

download_img = function(el) {
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
  };

} 


function start(melody,scale,playing){
    console.log(playing);
    for (let i = 0; i < melody.length; i++) {
        setTimeout(() => scale[melody[i]].play(), (i+1)*1000);
    } 
    if (playing){
        start(yStart,scale);
    }
    
    
}




function soundConverter(Ypos,bracket){

    var note = Math.ceil(Ypos/bracket)-1;
    

    return note;
}

function sectioning(innerHeight){
   
    var bracket = innerHeight/8
    return bracket;
}


 
function order(x,y) {
   
	for (let i = 0; i < x.length; i++) {
		for (let j = 0; j < x.length; j++) {
			if (x[j] > x[j + 1]) {
                x[j] = x.splice(j+1, 1, x[j])[0];
                y[j] = y.splice(j+1, 1, y[j])[0];
				
			}
        }  
	}	
}

 */

 