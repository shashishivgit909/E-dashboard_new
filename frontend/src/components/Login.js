import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

//Note: if auth, then if user try to get login page using url also then it navigate to "/" while creating "login" page.
//since , we have handled if auth then donot show "login" field , so user may try to get login page using url. so we handles this here.
//this wont got effected for state/props chnage.
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    });

    //integrating login Api with react.(i.e when email, pass entered in input and when hit login , we call Api and Api does its work.)
    const handleLogin = async () => {
        try {
            
       
        const response = await fetch("https://e-commerce-dashboard-updated3.onrender.com/login", {
            method: 'post',
            body: JSON.stringify({ email, password }), //thisline is sending data{email, password} to API 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            // Handle HTTP error status codes
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
       const result = await response.json(); //result store the result send by API (contains auth:token ,user: {email, pass})
        //NOte: login Api is checking email, password in database if found then give response as {name, email, id } and if not found then response is "user not found"
        console.warn(result)
        if (result.auth) { //checking if token
             localStorage.setItem('user', JSON.stringify(result.user)); // store data in local 
             localStorage.setItem('token', JSON.stringify(result.auth)); //token is key in local storage
            navigate("/")
        } else {
            alert("Please enter connect details")
        }
    } catch (error) {
        
        console.error('API request error:', error);
    }
    
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input type="password" className="inputBox" placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}

export default Login
