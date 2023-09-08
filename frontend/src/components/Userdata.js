import React from 'react'

export default function Userdata() {

  getData(async () => {
    try {
      let response = await fetch("https://e-commerce-dashboard-updated3.onrender.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // let result = await result.json();
      let result;
      try {
        result = await response.json();
        // Process and use the result
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
      }
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
/*
const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) { // This handles if there is something in the key (i.e., the input box is not empty).
            try {
                const response = await fetch(`http://localhost:5000/search/${key}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json()
                if (result) {
                    setProducts(result); // It sets state: product value so rerenders occur, and the list will be printed for this product
                }
                else { // If the input box is empty, then we will show all products, so we call getProduct Api.
                    getProducts();
                }

            } catch (error) {
                console.error('API request error:', error);
            }
        }
    }

*/



// console.log(result.name);
// console.log(result.email);
// console.log(result.username);
