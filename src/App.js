import React from 'react';
import Whiteboard from './components/Whiteboard2';
import Whiteboardmob from './Whiteboard';



const App = () => {

  if ('ontouchstart' in document.documentElement ) {
    console.log('platform not supported');
    return (
      <Whiteboardmob  />
  )}
  else{
  return (
      <Whiteboard  />
  )}

};

export default App;
