import React  from 'react';
export default function Rect(props){
    console.log('A',props.a,props.b,props.lastX,props.lastY);

    props.ctx.lineWidth = 5;
    props.ctx.strokeStyle  = props.color;
    props.ctx.beginPath(); // Start a new path
    props.ctx.strokeStyle='red';
    props.ctx.rect(lastX,lastY, a, b); // Add a rectangle to the current path
    props.ctx.stroke();

}