import React, { useRef, useEffect, useState } from 'react';
import {Note} from './components/steps';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';
//import ImageIcon from '@mui/icons-material/Image';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {saved,open,updatectx} from './helper.js'



const Whiteboardmob = () => {
 ////initialize all values
const canvasRef = useRef(null);
const [ctx, setCtx] = useState(null);
const [isDrawing, setIsDrawing] = useState(false);
const [lastX, setLastX] = useState(0);
const [lastY, setLastY] = useState(0);
const [color, setColor] = useState('#EEEEEE');
const [a,seta]=useState(100);
const [b,setb]=useState(50);
const [vary,setvary]=useState(100);
const [dim,setdim]=useState(50);
const [show, setshow] = useState(false);
const [erase,seterase]=useState('0');
const [pe,setape]=useState(false);
const [mshall,setmshall]=useState(false);
// const [x, setx] = useState(0); 
// const [y, sety] = useState(0);
const [shoulddisplay, set_shoulddisplay] = useState(false);
const [c, setc] = useState(0);

const [notes, setnotes] = useState(null);
const [data,setdata]=useState('');

const [shape,setshape]=useState(false);

const [fulltext,setfull]=useState([]);
const [v,setv]=useState(10);
const [mycolor,setmycolor]=useState(color);

const [linew,setlinew]=useState(2);
useEffect(() => {///set the default
  const canvas = canvasRef.current;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const context = canvas.getContext('2d');
 //context.lineJoin = 'round';
  context.lineCap = 'round';
  //context.lineWidth = linew;
  context.fillStyle = "#222831";
context.fillRect(0, 0, canvas.width, canvas.height);
  setCtx(context);
 
}, []);









function stepsave() ////function to save current step canvas
{
 const canvas = canvasRef.current;
 let name="savecanvas";
 saved(canvas,name);
}
function stepres() ////function to restore previously saved step canvas
{
    const canvas = canvasRef.current;
    var savedDataURL = localStorage.getItem("savecanvas");
     open(savedDataURL,canvas,ctx)
}
function save(){////function to save current canvas with a file name
  const canvas = canvasRef.current;
  let name=prompt('give your file name')
  saved(canvas,name);
}
 
  function opend()////function to restore saved  canvas with a file name
  {
    let name=prompt('filename')
    const canvas = canvasRef.current;
    var savedDataURL = localStorage.getItem(name);
     open(savedDataURL,canvas,ctx)
  }
  function tryme(e) ////set color of first colorpicker
  {
    setColor(e.target.value);
    console.log(e.target.value)
  }

   function changepos(e){

    setLastX(e.nativeEvent.offsetX);
   setLastY(e.nativeEvent.offsetY);
    console.log(lastX,lastX)
  
    if(c==='1'){/////c='1' is set when you create a rectangle
      stepsave()
      seterase('0');
      setshow(true)
      updatectx(ctx,color)
       
        ctx.rect(lastX,lastY, a, b); // Add a rectangle to the current path
      
        ctx.stroke();
       
    }
    else if(c==='2'){/////c='2' is set when you create a circle
      stepsave();
      setshow(true);
        console.log(color)
        seterase('0')
        updatectx(ctx,color)
         ctx.arc(lastX,lastY, dim, 0, 2 * Math.PI);
         ctx.stroke();
    }
    else if(c==='3'){/////c='3' is set when you create a line
      stepsave()
        seterase('0');
        setshow(true);
     //   const canvas = canvasRef.current;
     //   const ctx = canvas.getContext("2d");
     updatectx(ctx,color)
     ctx.lineTo(lastX,lastY); // Draw a line to (150, 100)
     ctx.lineTo(lastX+vary,lastY); // Draw a line to (150, 100)
     ctx.stroke(); // Render the path
    }
 /*else if(c==='4'){/////c='4' is set when you want to display an image
    create_image()
 }*/
 else if(c==='8'){/////c='8' is set when you create a square
  stepsave()
  console.log(color)
  seterase('0');
 setshow(true)
 updatectx(ctx,color)
  ctx.rect(lastX,lastY, a, a); // Add a rectangle to the current path
 
  ctx.stroke();
}

    
    else{ ///else track current location
        setLastX(e.nativeEvent.offsetX);
        setLastY(e.nativeEvent.offsetY);
    }
    setape(false);
  
  }




  ////function to display image as per user preference
 /* function create_image(){
  /*  let person = prompt("Paste image address");
        const image = new Image();
        image.src = person;
        image.onload = () => {
        ctx.drawImage(image,lastX,lastY, image.width, image.height);}
        console.log('image')
   
 }*/
////functions to set the value of c to determine if any of the shapes or image is to be placed on canvas
function create_rect(){
setc('1');
set_shoulddisplay(false);
setnotes(false);
myhide();

}
function create_square(){
  setc('8');
  set_shoulddisplay(false);
  setnotes(false);
  myhide();
  }
function create_circle(){
setc('2');
set_shoulddisplay(false);
myhide();
  
 }
 function create_Line(){
    setc('3');
    set_shoulddisplay(false);
    myhide();
    
 }
 /*function image(){
  setshow(false)
    setc('4');
    alert('click on the position')
 }*/
 
///display list to choose from rect,shape,circle
function shapes(e){
  set_shoulddisplay(!shoulddisplay);
  setnotes(false);

  
}
///erase the screen
function erasedone(e){
  setshow(false);
seterase('1');
setc('0');
setnotes(false);
ctx.lineWidth = 50;
myhide()
}

////clear entire screen
function clearscreen(e){
  const canvas = canvasRef.current;
  setnotes(null);
  setfull([]);
  ctx.fillStyle =  "#222831";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setshow(false);
  setnotes(false);
  setc('0');
myhide();
  }

  ////use pen functionality
function pen(){
  seterase('0');
  setc(0);
  setshow(false);
  setnotes(false);
  ctx.lineWidth = linew;
  setmshall(false);
  setape(true);
}



/// allow drawing on canvas
  const startDrawing = (e) => {
    setape(false);
    setnotes(false);
    setIsDrawing(true);
    var rect1 = e.target.getBoundingClientRect();
    setLastX( e.targetTouches[0].pageX - rect1.left);
    setLastY(e.targetTouches[0].pageY - rect1.top);
  };
////start drawing (erase or pen)
  const draw = (e) => {

    if (!isDrawing) return;
    if(erase==='1'){
      setColor("#222831");
    }
   
    else{
   setColor(color);}
    ctx.beginPath();
    
   ctx.moveTo(lastX, lastY);
   var rect2 = e.target.getBoundingClientRect();

    ctx.lineTo(e.targetTouches[0].pageX - rect2.left,e.targetTouches[0].pageY - rect2.top);
    ctx.strokeStyle =color;
   ctx.stroke();
   ctx.closePath(); // Line to bottom-left corner
   var rect3 = e.target.getBoundingClientRect();
    setLastX( e.targetTouches[0].pageX - rect3.left);
    setLastY(e.targetTouches[0].pageY - rect3.top);
  };


  ///allow addnotes
 function addnotes(){
  setshow(false);
  setnotes(1);
myhide();
 

 }
 ///end drawing
  const finishDrawing = () => {
    setIsDrawing(false);
  };

  ///update the notes content
  function write(e){
    setdata(e.target.value);
  }
////add notes
  function writingdone(){
 setnotes(notes+1);

 setfull(fulltext=>[...fulltext,data])
 console.log(fulltext);
  }


///update size of shapes
function update(e){
 
  setshape(true);
 
  console.log(e.target.value);
  setv(e.target.value);

    actualsize2(v);
  



}


function updatelinew(e){
setlinew(e.target.value);
console.log(linew);
pen();
}


 ////function to manipulate size
 function actualsize2(v){
  console.log('clicked actualsize2',v,shape,c,'a',a,'b',b);
  if(shape===true){
  if(c==='1'){
    stepres();

    console.log('bye');
  seta(2*v);
  setb(v);
  ctx.beginPath(); // Start a new path
  ctx.strokeStyle  = color;
  ctx.rect(lastX,lastY, a, b); // Add a rectangle to the current path
  ctx.stroke();
 
}
else if(c==='8'){
 
  stepres();
 /* ctx.clearRect(prev[0], prev[1], a, b);*/
 console.log('hi');
  seta(v);

 ctx.beginPath(); // Start a new path
 ctx.strokeStyle  = color;
 ctx.rect(lastX,lastY, a, a); // Add a rectangle to the current path
 ctx.stroke();


}
  else if(c==='2'){   
    stepres();
    setdim(v);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(lastX,lastY, dim, 0, 2 * Math.PI);
    ctx.stroke();
    }
    else if(c==='3'){
      stepres();
      setvary(v/2);
      ctx.lineWidth = 5;
      ctx.beginPath(); // Start a new path
   
   ctx.lineTo(lastX,lastY); // Draw a line to (150, 100)
   
   ctx.lineTo(lastX+vary,lastY); // Draw a line to (150, 100)
   ctx.strokeStyle = color;
   ctx.stroke(); // Render the path
    }
 }}



 /////download entire canvas as an image
 function downloadCanvasImage() {
 
  let z=prompt('filename');
  const canvas = canvasRef.current;
  var dataURL1 = canvas.toDataURL('image/png');
  
  // Create a link element
  var link = document.createElement('a');
  link.href = dataURL1;
  link.download = z+'.png'; // Set the file name
  
  // Trigger the download
  link.click();
}



/////stcolor of second colorpicker and fill the shape
 function newcolor(e){
  setmycolor(e.target.value);
  ctx.fillStyle = e.target.value;

   ctx.fill();

 console.log('filled');
 setshow(false);

 }

 ////complete resizing and coloring
function doneshaping(){
  setshape(false);
}


function myhide(){
  setmshall(!mshall);
}
  return (
 
    <div className='all'>
      <div className='arrangefeatures'>
      <h2 onClick={myhide} >MyBoard</h2>
      <div className={mshall?'all':'notall'}>
      <div className="tooltip" data-tooltip="Select size" id='size'>
      <input type="color" id="colorPicker"  value={color}onChange={tryme} ></input>
      </div>
     
      <button  className='butdownl' class="tooltip" data-tooltip="Download" onClick={ downloadCanvasImage}>   <DownloadIcon fontSize='small' /></button>
      <button  className='butsave' class="tooltip" data-tooltip="Save" onClick={save}><SaveIcon fontSize='small' /></button>

      <button  className='butopen'class="tooltip" data-tooltip="Open" onClick={opend}><FileOpenIcon fontSize='small' /></button>

      

    
    
       <button  className='but2'class="tooltip" data-tooltip="Erase" onClick={erasedone}><DeleteForeverRoundedIcon fontSize='small'/></button>
       <button  className='but3' class="tooltip" data-tooltip="Clear Screen" onClick={clearscreen}>< ClearIcon fontSize='small'/></button>
 

       <button className='butnotes' class="tooltip" data-tooltip="Add notes" onClick={addnotes}><NoteAddIcon fontSize='small'/></button>
      
    
       <button className='buts' class="tooltip" data-tooltip="Add Shapes" onClick={shapes}><ShapeLineIcon fontSize='small'/></button>
     
       
     
       {shoulddisplay && (<div className='colu'>
       <button className='but1' class="tooltip" data-tooltip="Rectangle" onClick={create_rect}><RectangleOutlinedIcon fontSize='small'/></button>
       <button className='but4' class="tooltip" data-tooltip="Circle" onClick={create_circle}><Brightness1OutlinedIcon fontSize='small'/></button>
       <button className='but8' class="tooltip" data-tooltip="Square" onClick={create_square}><SquareOutlinedIcon fontSize='small'/></button>
       <button className='but5'class="tooltip" data-tooltip="Line" onClick={create_Line}><HorizontalRuleOutlinedIcon fontSize='small'/></button>
      
       </div>)}
       <button  className='but0'class="tooltip" data-tooltip="Pen" onClick={pen}><EditIcon fontSize='small'/></button>
      
       
       </div>
     
       {show && <div className='myshow' style={{position: "absolute",top:fulltext.length==='0'?`${lastY}px`:lastY+fulltext.length/5*450+'px',left:`${lastX}px`}}>     
       <div className="tooltip" data-tooltip="Select size">
  <input type="range" min="1" max="3000"  value={v} onChange={update} onClick={update} className="slider" 
        id="myRange"   onMouseOut={doneshaping}></input>
</div>
  {(c==='1' || c==='2'|| c==='8')?   <div className="tooltip" data-tooltip="Fill color"><input type="color" id="colorPicker2"  value={mycolor} onChange={newcolor} ></input></div>:null}

     </div>}
    
{notes && (<div className='a'><input placeholder='start typing' onChange={write}></input><button className='plusb' onClick={writingdone}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
</svg></button></div>)}
<div className='arr'>
{(fulltext).map((item,myindex)=>{function deletee(){return setfull((fulltext)=>{return fulltext.filter((item,id)=>{return id!==myindex})})}return <div  className='notmob'><Note text={item} id={notes} /><div><button className='bc' onClick={deletee}>x</button></div></div>})}
</div>

</div>
<div className="tooltip" data-tooltip="Select pen size"  id={pe?'ape':'disape'}>
       <input type="range" min="1" max="100"  value={linew} id='myRange2mob' onChange={updatelinew} onClick={updatelinew} className="slider" ></input>
       </div>
    <canvas
    
      ref={canvasRef}
     
    
      onTouchStart={startDrawing}
     
      onTouchMove={draw}
     
      onTouchEnd={finishDrawing}
   
    onClick={changepos}
    

    />

    </div>
  );
};

export default Whiteboardmob;
