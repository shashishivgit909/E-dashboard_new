import React from 'react';
import { Navigate, Outlet} from 'react-router-dom'

const PrivateComponent= ()=>{
    //checking if there is value coresponding to key useer in local storage(i.e user is login so call <Outlet/> else navigate to signUp page)
    // outlet componet :
    const auth = localStorage.getItem('user'); 
    return auth ?<Outlet />:<Navigate to="signup" /> //
}

export default PrivateComponent;