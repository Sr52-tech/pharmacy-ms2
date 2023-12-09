import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem';
import { useSelector } from 'react-redux';

const Cart = () => {
    const productData = useSelector((state) => state.pharmacy.productData);
    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let total = 0;
        productData.forEach((item) => {
            total += item.quantity * item.price;
        });
        setTotalAmt(total);
    }, [productData])
    return (
        <div>
            <img
                className='w-full h-60 object-cover'
                src='https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='cart'
            />
            <div className='max-w-screen-xl mx-auto py-20 flex'>
                <CartItem />
                <div className='w-1/3 bg-[#fafafa] py-6 px-4'>
                    <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
                        <h2 className='text-2xl font-medium'>Cart Totals</h2>
                        <p className='flex items-center gap-4 text-base'>
                            Subtotal{' '}
                            <span className='font-titleFont font-bold text-lg'>${totalAmt}</span>
                        </p>
                        <p className='flex items-start gap-4 text-base'>
                            Shipping{' '}
                            <span>Free</span>
                        </p>
                    </div>
                    <p className='font-titleFont font-semibold flex justify-between mt-6'>
                        Total<span className='text-xl font-bold'>${totalAmt}</span>
                    </p>
                    <button className='bg-black text-base text-white w-full py-3 mt-6 hover:bg-gray-800'>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart