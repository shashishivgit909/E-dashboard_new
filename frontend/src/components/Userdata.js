import React from 'react'

export default function Userdata() {

    getData(async()=>{
        try {
            let res=await fetch("https://jsonplaceholder.typicode.com/users");
            let res2=await res.json();

        } catch (error) {
           console.log("cannot fetch data"); 
        }
      
        console.log(res2);
    })
  
   
  return (
    <div>
    
    </div>
  )
}




// console.log(result.name);
// console.log(result.email);
// console.log(result.username);
