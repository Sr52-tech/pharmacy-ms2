import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import Nav from "../components/Navbar";
import Footer from "../components/Footer";

export const Products = () => {
    const { products } = useContext(ProductsContext);

    return (
        <>  
        <Nav />        
    
        <div className="row flex flex-wrap justify-center" style={{marginTop: '30px', marginBottom: '30px'}}>
            {products.map((product) => (
                <div key={product.id} className="w-full max-w-sm m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/#">
            <img className="h-4/6 w-full object-cover rounded-t-lg" src={product.ProductImage} alt="product image"  />
        </a>
        <div className="px-5 pb-5" style={{marginTop: '30px'}}>
            <a href="/#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.ProductName}</h5>
            </a>
            <div className="flex items-center justify-between" >
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.ProductPrice}</span>
                <a href="/#" style={{backgroundColor: '#0C7494'}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
            </div>
        </div>
    </div>
    ))}
</div>

<Footer />
</>
    );
}
