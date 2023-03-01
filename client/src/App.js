import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { UserAuth } from './Components/userAuthentication/UserAuth';

function App() {

  return (
    <div className="App">
      {/* <button onClick={() => signin()}>Signin</button>
      <h1>@{user}</h1> */}
      <UserAuth />
    </div>
  );
}

export default App;
