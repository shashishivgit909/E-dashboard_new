import React from 'react';
import { useNavigate } from "react-router-dom"
const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        //this is way to apply form validation for  not  leaving any input field empty 
        if (!name || !price || !company || !category) //!name: means if name is empty . This line check if any of the states are empty then  rest of the code wont execute .
        //so : (return false) , make not to execute code below it of this function (addProduct()) .  
        {
            setError(true);
            return false
        }

        // Note: since here user is alreday log in so we have its data on local storage so we get it here.
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
            // Perform the API request here
            const response = await fetch("https://e-commerce-dashboard-updated3.onrender.com/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                // Handle HTTP error status codes
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data;
            try {
                data = await response.json();
                // Process and use the data
            } catch (parseError) {
                console.error('Error parsing JSON response:', parseError);
            }

            // Process and use the data
            console.log(data);
            if (data) {
                navigate('/')
            }

        } catch (error) {
            // Handle errors here
            console.error('API request error:', error);
        }

        // let result = await fetch("http://localhost:5000/add-product", {
        //     method: "post",
        //     body: JSON.stringify({ name, price, category, company, userId }),
        //     headers: {
        //         "Content-type": "application/json"
        //     }
        // });
        // result = await result.json();
        // console.warn(result);
        // if (result) {
        //     navigate('/')
        // }


    }



    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {/* {error && !name && <span className='invalid-input'>Enter valid name</span>} : this same line is done using ternary opreator */}
            {/* below line run <span></span> if error(i.e any input field is left empty) and if it is name then resuklt will be true so execute <span></span>)  */}
            {(error && !name) ? <span className='invalid-input'>Enter valid name</span> : null}

            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {(error && !price) ? <span className='invalid-input'>Enter valid price</span> : null}

            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {(error && !category) ? <span className='invalid-input'>Enter valid category</span> : null}

            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {(error && !company) ? <span className='invalid-input'>Enter valid company</span> : null}


            <button onClick={addProduct} className='appButton'>Add Product</button>
        </div>
    )
}

export default AddProduct;