import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../firebase-config';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/pharmacySlice';

const Cart = () => {
    const productData = useSelector((state) => state.pharmacy.productData);
    const userInfo = useSelector((state) => state.pharmacy.userInfo);
    const [totalAmt, setTotalAmt] = useState(0);
    const [isCheckoutInitiated, setIsCheckoutInitiated] = useState(false);
    const [hasMedicine, setHasMedicine] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        let total = 0;
        productData.forEach((item) => {
            total += item.quantity * item.price;
        });
        setTotalAmt(total);
    }, [productData]);

    useEffect(() => {
        if (isCheckoutInitiated && userInfo) {
            console.log('hasMedicine', hasMedicine)
            if (hasMedicine) {
                navigate('/prescription');
            } else {
                navigate('/payment');
            }
        }
    }, [hasMedicine, isCheckoutInitiated, userInfo, navigate]);

    const handleMedicineFound = (isFound) => {
        setHasMedicine(isFound);
    };
    // todaysdate
    const today = new Date();

    const handleCheckout = async () => {
        const orderDetails = {
            products: productData,
            user: userInfo,
            total: totalAmt,
            date: today,
        };
        console.log('orderDetails', orderDetails);
    
        try {
            const docRef = await addDoc(collection(db, "orders"), orderDetails);
            console.log("Order has been saved with ID: ", docRef.id);
            // toast.success("Order has been placed successfully!");
        } catch (error) {
            console.error("Error adding order: ", error);
            // toast.error("Error placing order. Please try again.");
        }

        if (userInfo) {
            setIsCheckoutInitiated(true); 
        } else {
            toast.error('Please login to continue');
        }
    };

    return (
        <div>
            <img
                className='w-full h-60 object-cover'
                src='https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=800'
                alt='cart'
            />
            <div className='max-w-screen-xl mx-auto py-20 flex'>
                <CartItem onMedicineFound={handleMedicineFound}/>
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
                    <button onClick={ handleCheckout} className='bg-black text-base text-white w-full py-3 mt-6 hover:bg-gray-800'>
                        Proceed to Checkout
                    </button>
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

export default Cart