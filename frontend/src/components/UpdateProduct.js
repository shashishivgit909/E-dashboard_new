import React, { useEffect } from 'react';
import { useParams,useNavigate } from "react-router-dom"

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const param = useParams();
    const navigate=useNavigate();


    useEffect(() => {
        getProductDetails();
            // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])

    //this integration function and below integration function has same url for fetch BUt this use: get method and  just below one uses "put method so there is no problem , but if both method are also same then we need to use different route for API a  slight change "
    const getProductDetails = async () => {
         console.log(param.id); 
         try {
            let response = await fetch(`https://e-commerce-dashboard-updated3.onrender.com/update/${param.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
           const result = await response.json();
            console.log(result);
            // setting values into state so that value can appear in input box.
            setName(result.result.name);
            setPrice(result.result.price);
            setCategory(result.result.category);
            setCompany(result.result.company);
         } catch (error) {
            console.error('API request error:', error);
         }
       

    }
 //integrating updateProduct API 
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        try {
            const response = await fetch(`https://e-commerce-dashboard-updated3.onrender.com/update/${param.id}`, {
                method: 'Put',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'Application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result) {
                navigate('/')
            }  
        } catch (error) {
            console.error('API request error:', error);  
        }
        

    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {/* {error && !name && <span className='invalid-input'>Enter valid name</span>} : this same line is done using ternary opreator */}
            {/* below line run <span></span> if error(i.e any input field is left empty) and if it is name then resuklt will be true so execute <span></span>)  */}


            <input type="text" placeholder='Enter product price' className='inputBox'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />


            <input type="text" placeholder='Enter product category' className='inputBox'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />


            <input type="text" placeholder='Enter product company' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={updateProduct} className='appButton'>Update product</button>
        </div>
    )
}

export default UpdateProduct;


