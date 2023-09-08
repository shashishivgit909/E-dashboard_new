// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// const Nav = () => {

//     const navigate = useNavigate();
//     const auth = localStorage.getItem('user');
//     // console.log(typeof(auth)); // to  know type of auth : op: string (i.e JSON object in string format  )
//     const Logout = () => {
//         localStorage.clear();
//         navigate('/signup');
//     }
//     return (
//         <div>
            
//             <img src="https://logos-world.net/wp-content/uploads/2022/02/Swastik-Logo.jpg" className="logo" alt="logo" />
//             {
            
//             auth ?
//                 <ul className="nav-ul">
//                     <li><Link to="/">Products</Link></li>
//                     <li><Link to="/add">Add Products</Link></li>
//                     {/* <li><Link to="/update/:id"> Update Products</Link></li> */}
//                     {/* <li><Link to="/profile">Profile</Link></li> */}

//                     {/* this implement if auth then show logout field else show signUp filed */}
//                     {/* <li> {auth ? <Link onClick={Logout}to="/signup">logout</Link> :
//                         <Link to="/signup">SignUp</Link>}</li>
//                        <li><Link to="/login">Login</Link></li> */}

//                     {/* now  we have to implement that if "auth" then show logout, else show "signin" and "login" */}

//                     <li><Link onClick={Logout} to="/signup">Logout({JSON.parse(auth).name})</Link> </li>

//                     {/* <li> <Link onClick={logout} to="/signup">Logout ({ JSON.parse(auth).name})</Link></li> */}
//                 </ul>
//                 :
//                 <ul className="nav-ul nav-right">
//                     <li><Link to="/login">Login</Link></li>
//                     <li><Link to="/signup">SignUp</Link></li>

//                 </ul>

//             }



//         </div>
//     )
// }

// export default Nav;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    
    // Function to safely parse JSON data
    const safeParseJSON = (data) => {
        try {
            return JSON.parse(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null; // Return null in case of parsing error
        }
    };
    
    const Logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    // Safely parse auth data
    const authData = safeParseJSON(auth);
    const userName = authData ? authData.name : null;

    return (
        <div>
            <img src="https://logos-world.net/wp-content/uploads/2022/02/Swastik-Logo.jpg" className="logo" alt="logo" />
            {authData ? (
                <ul className="nav-ul">
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link onClick={Logout} to="/signup">Logout({userName})</Link></li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link onClick={Logout} to="/signup">Logout({userName})</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;
