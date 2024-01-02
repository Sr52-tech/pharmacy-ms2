// ShoppingCartIcon.js
import React from 'react';
import { IoMdCart } from "react-icons/io";

const ShoppingCartIcon = ({ count }) => {
    return (
        <div className="relative inline-block">
            <IoMdCart className="text-4xl" /> {/* Increased icon size */}
            {count > 0 && (
                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs"> {/* Reduced padding and text size */}
                    {count}
                </div>
            )}
        </div>
    );
};

export default ShoppingCartIcon;
