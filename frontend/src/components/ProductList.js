// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// export default function ProductList() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         getProducts();
//     }, []);


//     const getProducts = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/products');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const result = await response.json();
//             setProducts(result);
//         } catch (error) {
//             // Handle errors here
//             console.error('API request error:', error);
//         }

//     }


//     const deleteProduct = async (id) => {
//         console.warn(id); //ust print id for which it is called .
//         try {
//             const response = await fetch(`/delete/${id}`, {  //using string template`
//                 method: "Delete"
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const result = await response.json();
//             console.log(result);
//             console.log("hello from frontend")
//             // there is needed to use condition call getProducts becouse if not , then not  needed  to same list by calling API becouse nothing is changed , the same list is alreaddy visible on page.
//             if (result) {
//                 getProducts();// this get reamined data from database and prints 
//             }
//         } catch (error) {
//             console.error('API request error:', error);
//         }

//     }

//     const searchHandle = async (event) => {
//         let key = event.target.value;
//         if (key) { // this handle if there is something in key (i.e  input box isnot empty)
//             try {
//                 const response = await fetch(`http://localhost:5000/search/${key}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const result = await response.json()
//                 if (result) {
//                     setProducts(result) // it set state :product value so rerenders occurs , and list will be printed for this product
//                 }
//                 else { // if input box is empty , then  we will show alll products so we call getProduct Api .
//                     getProducts();
//                 }

//             } catch (error) {

//                 console.error('API request error:', error);
//             }

//         }

//         return (
//             <div className="product-list">
//                 <h3>Product List</h3>
//                 <input type="" className='search-product-box' placeholder='Search Product'
//                     onChange={searchHandle} />

//                 <ul>
//                     <li>S. No.</li>
//                     <li>Name</li>
//                     <li>Price</li>
//                     <li>Category</li>
//                     <li>Operation</li>

//                 </ul>
//                 {


//                     products.length > 0 ?
//                         products.map((item, index) => (
//                             <ul key={item._id}>
//                                 <li>{index + 1}</li>
//                                 <li>{item.name}</li>
//                                 <li>{item.price}</li>
//                                 <li>{item.category}</li>
//                                 <li>
//                                     <button onClick={() => deleteProduct(item._id)}>Delete</button>
//                                     {/* we can use botton for update also , for which element we need to call update , for that we  need to pass dynamic id(i.e when we click upadate for particualr , its Id will be gone to update componenet )  
//                         # to make dynamic Id we  can use: `/update/${item._id} `  as path  */}
//                                     <Link to={"/update/" + item._id} >Update </Link>
//                                 </li>

//                             </ul>

//                         ))
//                         : <h1>no result found</h1>

//                 }
//             </div>
//         )
//     }

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('https://e-commerce-dashboard-updated3.onrender.com/products');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //const result = await response.json();
            let result;
            try {
                result = await response.json();
                // Process and use the result
            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
            }
            setProducts(result);
        } catch (error) {
            // Handle errors here
            console.error('API request error:', error);
        }
    }

    const deleteProduct = async (id) => {
        console.warn(id); // Just print id for which it is called.
        try {
            const response = await fetch(`https://e-commerce-dashboard-updated3.onrender.com/delete/${id}`, {
                method: "Delete"
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //const result = await response.json();
            let result;
            try {
                result = await response.json();
                // Process and use the result

            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
            }
            console.log(result);
            console.log("hello from frontend");
            // There is a need to use condition to call getProducts because if not, then not needed to show the same list by calling API because nothing is changed; the same list is already visible on the page.
            if (result) {
                getProducts(); // This gets the remaining data from the database and prints it.
            }
        } catch (error) {
            console.error('API request error:', error);
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) { // This handles if there is something in the key (i.e., the input box is not empty).
            try {
                const response = await fetch(`https://e-commerce-dashboard-updated3.onrender.com/search/${key}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                //const result = await response.json()
                let result;
                try {
                    result = await response.json();
                    // Process and use the result
                } catch (parseError) {
                    console.error('Error parsing JSON response:', parseError);
                }
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

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className='search-product-box' placeholder='Search Product' onChange={searchHandle} />

            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                ))
            ) : (
                <h1>No results found</h1>
            )}
        </div>
    );
}
