import React from 'react';
import startingpage_pic from '../startingpage_pic.jpg';


function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to personal trainer page!</h1>
          <img src={startingpage_pic} alt= "aloituskuva" width={800} height={1000} mode='fit'></img>
          
        
        
      </header>
    </div>
  );
}

export default Start;