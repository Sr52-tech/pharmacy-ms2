import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useDispatch } from 'react-redux';
import { decrementQuantity, deleteItem, incrementQuantity } from '../redux/pharmacySlice';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CartItem = () => {
    const dispatch = useDispatch();
    const productData = useSelector(state => state.pharmacy.productData)
    const [quantity, setQuantity] = useState('');

    return (
        <div className='w-2/3 pr-10'>
            <div className='w-full'>
                <h2 className='font-titleFont text-2xl'>
                    Shopping Cart
                </h2>
            </div>
            <div>
                {
                    productData.map((item) => (
                        <div
                            key={item._id}
                            className='flex items-center justify-between gap-6 mt-6'
                        >
                            <div className='flex items-center gap-2'>
                                <MdOutlineClose onClick={() => dispatch(deleteItem(item._id)) & toast.error(`${item.name} is removed`)} className='text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300' />
                                <img className='w-32 h-32 object-cover'
                                    src={item.image}
                                    alt='Product' />
                            </div>
                            <h2 className='w-52'>{item.name}</h2>
                            <p className='w-10'>${item.price}</p>
                            <div className='flex items-center gap-4 mt-3'>
                                <button className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white curso-pointer duration-300 active:bg-black' onClick={() => {
                                    if (item.quantity > 1) {
                                        dispatch(decrementQuantity({
                                            _id: item._id,
                                            quantity: 1,
                                            price: item.price,
                                            image: item.image,
                                            name: item.name,
                                            description: item.description
                                        }))
                                    }
                                }}>-</button>
                                <span className='text-2xl'>{item.quantity}</span>
                                <button className='border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white curso-pointer duration-300 active:bg-black' onClick={() => {
                                    dispatch(incrementQuantity({
                                        _id: item._id,
                                        quantity: 1,
                                        price: item.price,
                                        image: item.image,
                                        name: item.name,
                                        description: item.description
                                    }))
                                }}>+</button>
                            </div>
                            <p className='w-14'>${item.price * item.quantity}</p>
                        </div>
                    ))
                }
            </div>
            <Link to="/">
                <button className='mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300'>
                    <span>
                        <HiOutlineArrowLeft />
                    </span>
                    Continue Shopping
                </button>
            </Link>
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

export default CartItem