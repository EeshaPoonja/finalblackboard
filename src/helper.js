

export function saved(canvas,name)////function to save current canvas with a file name
{
  
 var dataURL = canvas.toDataURL();
  localStorage.setItem(name, dataURL);
  console.log("Canvas saved to local storage.");

}
export function open(savedDataURL,canvas,ctx){
 
    if (savedDataURL) {
        var img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          console.log("Canvas reloaded from local storage.");
        };
        img.src = savedDataURL;
      } else {
        console.log("No canvas data found in local storage.");
      }
}

export function updatectx(ctx,color){
    ctx.lineWidth = 5;
    ctx.strokeStyle  = color;
    ctx.beginPath(); // Start a new path
    
}