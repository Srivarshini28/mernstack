import './App.css';
import Home from './Home';
import { useState } from 'react';

function App() {
  let firstname = 'Srivarshini R';
  let email = "rameshsrivarshini@gmail.com";
  let address = "Chennai";

  // State variable
  const [email2, setEmail] = useState('');      // if we give values inside the ('') then the if and else if
  const [mobile, setMobile] = useState('');     // will be skipped since it has default values
  const validate = () =>{
    if (email2 == ""){npm 
      alert("Email is empty")
    }else if (mobile == ""){
      alert("Mobile is empty")
    }else{
      alert("Everything is fine")
    }
  }

  return (
    <div className='container'>
      <h1>This is a React app</h1>
      Name: {firstname}<br />
      Email: {email}<br />
      Email2: {email2}<br />
      Mobile: {mobile}<br/>
      Address: {address}<br />
      <Home />
      Email: <input type='text' id='tb' onChange={(e) => setEmail(e.target.value)}/><br/>
      Mobile: <input type='text' id='tb' onChange={(e) => setMobile(e.target.value)}/><br/>
      <button onClick={() => validate()}>CLICK</button>
    </div>
  );
}

export default App;
