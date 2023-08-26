import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }


    const deleteProduct = async (id) => {
        console.warn(id); //ust print id for which it is called .
        let result = await fetch(`http://localhost:5000/delete/${id}`, {  //using string template`
            method: "Delete"
        });
        result = await result.json();
        console.log(result);
        console.log("hello from frontend")
        // there is needed to use condition call getProducts becouse if not , then not  needed  to same list by calling API becouse nothing is changed , the same list is alreaddy visible on page.
        if (result) {
            getProducts();// this get reamined data from database and prints 
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){ // this handle if there is something in key (i.e  input box isnot empty)
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result) // it set state :product value so rerenders occurs , and list will be printed for this product
            }
        }else{ // if input box is empty , then  we will show alll products so we call getProduct Api .
            getProducts(); 
        }

    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle} />
            
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>

            </ul>
            {


                 products.length>0 ?
                  products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                        <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        {/* we can use botton for update also , for which element we need to call update , for that we  need to pass dynamic id(i.e when we click upadate for particualr , its Id will be gone to update componenet )  
                        # to make dynamic Id we  can use: `/update/${item._id} `  as path  */}
                        <Link to={"/update/"+item._id} >Update </Link> 
                        </li>

                    </ul>
                    
                ))
                : <h1>no result found</h1>

            }
        </div>
    )
}

export default ProductList;