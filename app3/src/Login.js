import { useState } from 'react';

function Login() {

    // State variables
    const [email, setEmail] = useState('');  // Initialize with an empty string
    const [pass, setPassword] = useState(''); // Initialize with an empty string

    const validate = async() => {
        if (email === "") {
            alert("Email is empty");
        } else if (pass === "") {
            alert("Password is empty");
        } else {
            let data = {
                "email": email,
                "password": pass
            };
            let res = await fetch("https://reqres.in/api/login", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            // Parse and log the response
            let json = await res.json();
            if (res.ok && json.token){
                console.log("Logged in successfully!")
            }else{
                console.log("Login failed!")
            }
            console.log(json);
        }
    };


    return (
        <div className='container'>
            <h1>LOGIN</h1>
            Email: <input type='email' onChange={(e) => setEmail(e.target.value)} /><br />
            Password: <input type='password' onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={validate}>CLICK</button>
        </div>
    );
}

export default Login;
