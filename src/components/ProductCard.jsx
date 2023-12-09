import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/pharmacySlice';
import { ToastContainer, toast } from 'react-toastify';

export function ProductCard({ product }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const _id = product.ProductName
    const idString = (_id) => {
        return String(_id).toLowerCase().split(" ").join("");
    }
    const rootId = idString(_id);

    const handleDetailsClick = () => {
        navigate(`/product/${rootId}`, {
            state: { product }
        });
    };

    const handleAddToCartClick = (e) => {
        e.stopPropagation(); // Prevents the click event from reaching the Card and triggering navigation
        dispatch(
            addToCart({
                _id: _id,
                name: product.ProductName,
                image: product.ProductImage,
                price: product.ProductPrice,
                quantity: 1,
                description: product.Description,
            })
        ) && toast.success(`${product.ProductName} Added to cart`)
    };

    return (
        <Card
            className="max-w-sm"
            imgAlt={product.Description}
            imgSrc={product.ProductImage}
            onClick={handleDetailsClick}
        >
            <Link to={`/product/${_id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.Description}
                    &nbsp;
                    ({product.Category})
                </h5>
            </Link>
            <div className="mb-5 mt-2.5 flex items-center">
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.ProductPrice}</span>
                <button
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    onClick={handleAddToCartClick}
                >
                    Add to cart
                </button>
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

        </Card>
    );
}
