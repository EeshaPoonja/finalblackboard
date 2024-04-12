import React, { useRef, useEffect, useState } from 'react';

const Whiteboard = () => {
  
  function tryme(e){
    setColor(e.target.value);
    console.log(e.target.value)
  }
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState('#EEEEEE');
  const [erase,seterase]=useState('0')
  const [x, setx] = useState(0); 
  const [y, sety] = useState(0);
  const [shoulddisplay, set_shoulddisplay] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
   //context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.fillStyle = "#222831";
context.fillRect(0, 0, canvas.width, canvas.height);
    setCtx(context);
   
  }, []);
  function changepos(e){
    setx(e.nativeEvent.offsetX);
    sety(e.nativeEvent.offsetY);
  }

function image(){
  let person = prompt("Paste image address");
  console.log(person);
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = person;
  image.onload = () => {
 
    ctx.drawImage(image, x, y, image.width, image.height);
}}
function create_rect(){

 console.log(color)
 seterase('0')
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle  = color;
  ctx.beginPath(); // Start a new path

  ctx.rect(x, y, 150, 100); // Add a rectangle to the current path
  ctx.stroke();
}
function create_circle(){
  console.log(color)
  seterase('0')
   const canvas = canvasRef.current;
   const ctx = canvas.getContext("2d");
   ctx.lineWidth = 5;
   ctx.beginPath();
   ctx.strokeStyle = color;
   ctx.arc(x, y, 50, 0, 2 * Math.PI);
   ctx.stroke();

  
 }
 function create_Line(){
  console.log(color)
  seterase('0')
   const canvas = canvasRef.current;
   const ctx = canvas.getContext("2d");
   ctx.lineWidth = 5;
   ctx.beginPath(); // Start a new path

ctx.lineTo(x, y); // Draw a line to (150, 100)

ctx.lineTo(x+100, y); // Draw a line to (150, 100)
ctx.strokeStyle = color;
ctx.stroke(); // Render the path
   

  
 }

/*function execute_Rect(e){
  console.log(e)
  if( e.currentTarget.className==='but1'){
     
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = props.color;
  create_rect();
  console.log('1');}
  else{
    
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'white';
    create_rect();
    console.log('2');
  }
}*/
function shapes(e){
  set_shoulddisplay(!shoulddisplay);
}
function erasedone(e){
seterase('1')
ctx.lineWidth = 50;

//  ctx.clearRect(x, y, 300,200);

}
function clearscreen(e){
  const canvas = canvasRef.current;
  ctx.fillStyle =  "#222831";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  }
function pen(e){
  seterase('0');
  ctx.lineWidth = 5;
}

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);
  };

  const draw = (e) => {
   
    if (!isDrawing) return;
    if(erase==='1'){
      setColor("#222831");
    }
    else{
   setColor(color);}
    ctx.beginPath();
    
   ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle =color;
   ctx.stroke();
   ctx.closePath(); // Line to bottom-left corner
   setLastX(e.nativeEvent.offsetX);
   setLastY(e.nativeEvent.offsetY);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className='all'>
      <div className='arrangefeatures'>
      <h3>MyBoard</h3>
      <input type="color" id="colorPicker"  value={color}onChange={tryme} ></input>
         <button  className='but0' onClick={pen}>pen</button>

    
    
       <button  className='but2' onClick={erasedone}>erase</button>
       <button  className='but3' onClick={clearscreen}>clearall</button>
     
       <button className='but6' onClick={image}>image</button>
       <button className='buts' onClick={shapes}>shapes</button>
       {shoulddisplay && (<div className='colu'>
       <button className='but1' onClick={create_rect}>rect</button>
       <button className='but4' onClick={create_circle}>circle</button>
       <button className='but5' onClick={create_Line}>line</button>
       </div>)}
       </div>
    <canvas 
      ref={canvasRef}
     
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
    onMouseOut={finishDrawing}
    onClick={changepos}
    />

    </div>
  );
};

export default Whiteboard;
