import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

export function ProductCard({ product }) {
    const navigate = useNavigate();
    const _id = product.ProductName
        .toLowerCase()
        .split(' ')
        .join('');

    const handleDetailsClick = (e) => {
        e.preventDefault();
        navigate(`/product/${_id}`, {
            state: { product }
        });
    };

    return (
        <Card
            className="max-w-sm"
            imgAlt={product.Description}
            imgSrc={product.ProductImage}
            onClick={handleDetailsClick}
        >
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.Description}
                    &nbsp;
                    ({product.Category})
                </h5>
            </a>
            <div className="mb-5 mt-2.5 flex items-center">
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.ProductPrice}</span>
                <a
                    href="#"
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to cart
                </a>
            </div>
        </Card>
    );
}
