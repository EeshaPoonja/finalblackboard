import React from 'react'

export function Note(props){
    console.log(props.id);
   
return <div key={props.id} contentEditable={true} spellCheck={false}>{props.text}</div>
}