import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/pharmacySlice';
import { ToastContainer, toast } from 'react-toastify';

const Product = () => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    const [quantity, setQuantity] = useState(1);
    const Location = useLocation();

    useEffect(() => {
        setDetails(Location.state.product)
    }, [])

    const increaseQuantity = () => {
        if (quantity < details.Product_quantity) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const addToCartEvent = () => {
        dispatch(
            addToCart({
                _id: details._id,
                name: details.ProductName,
                image: details.ProductImage,
                price: details.ProductPrice,
                quantity: quantity,
                description: details.Description,
            })
        ) && toast.success(`${details.ProductName} Added to cart`)
    }

    return (
        <div>
            <div className='max-w-screen-xl mx-auto my-10 flex gap-10'>
                <div className='w-2/5 relative'>
                    <img className='w-full h-[550px] object-cover'
                        src={details.ProductImage}
                        alt='cool' />
                </div>
                <div className='w-3/5 flex flex-col justify-center gap-12'>
                    <div>
                        <h2 className='text-4xl font-semibold'>
                            {details.ProductName}
                        </h2>
                        <p className='text-2xl font-medium mt-3'>
                            ${details.ProductPrice}
                        </p>
                        <br />
                        <div className='flex items-center gap-4 mt-3'>
                            <button className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white curso-pointer duration-300 active:bg-black' onClick={decreaseQuantity}>-</button>
                            <span className='text-2xl'>{quantity}</span>
                            <button className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white curso-pointer duration-300 active:bg-black' onClick={increaseQuantity}>+</button>
                        </div>
                        <br />
                        <button className='bg-black text-white py-3 px-6 active:bg-gray-800' onClick={addToCartEvent}>Add to Cart</button>
                    </div>
                    <p>Category: {details.Category}</p>
                    <p>Description: {details.Description}</p>
                </div>
            </div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Product