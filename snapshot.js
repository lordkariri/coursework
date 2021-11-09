function download(){
   
    var canvas = document.getElementById("drawingCanvas");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
    window.location.href = image;
    
};
download_img = function(el) {
    // get image URI from canvas object
    var imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
  };
