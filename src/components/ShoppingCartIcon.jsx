import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const ShoppingCartIcon = ({ count }) => {
    return (
        <div className="relative inline-block">
            <FaShoppingCart className="text-2xl text-white" />
            {count > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1">
                    {count}
                </div>
            )}
        </div>
    );
};

export default ShoppingCartIcon;
