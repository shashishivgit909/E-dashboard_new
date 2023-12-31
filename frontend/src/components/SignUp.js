import React, { useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let result;
   
    //below useeffct ,handles when signup page is created(this happens when user hits signUp files in navbar) , and if user is laredy login then , navigate to "/" .
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })
   

    const collectData = async () => {
        console.warn(name, email, password);
        try {
            const response = await fetch("https://e-commerce-dashboard-updated3.onrender.com/register", {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            try {
                const result = await response.json();
                // Check if the result contains the expected data
                console.log(result);
                if (result.result && result.result._id) {
                    // Store the user data in local storage
                    localStorage.setItem("user", JSON.stringify(result.result));
                    // Redirect to the home page
                    navigate('/');
                } else {
                    console.error('Invalid response data:', result);
                }
            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
            }
        } catch (error) {
            console.error('Error occurred during sign-up:', error);
        }
    }
    
    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                value={name} onChange={(e) => setName(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)}

            />
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>

        </div>
    )
}
export default SignUp;


 // const collectData = async () => {
    //     console.warn(name, email, password);
    //     try {
    //         //here intergrating Signup Api(postApi using fetch function()) : intergrating means , data collected by signup are sending to database using Post api .
    //         // "http://localhost:5000/register" , url of post API  given by backend developer .
    //            const response = await fetch("https://e-commerce-dashboard-updated3.onrender.com/register", {
    //             method: 'post',
    //             body: JSON.stringify({ name, email, password }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         let result;
    //         try {
    //             result = await response.json();
    //             // Process and use the result
    //         } catch (parseError) {
    //             console.error('Error parsing JSON response:', parseError);
    //         }
    //         // const result = await response.json();
    //         // result = await JSON.parse(result);
    //         console.warn(result);
    //     }
    //     catch (error) {
    //         console.log("erro occured");
    //     }

    //     localStorage.setItem("user", JSON.stringify(result)) // storing "result" as value and "user" as key in local storage. since we  cannot store json data diretly in local so we convert it into string then store it .
    //     // localStorage.setItem("token", JSON.stringify(result.auth))

    //     navigate('/')
    // }