
import { Card } from 'flowbite-react';

export function ProductCard({ description, imageSrc, price }) {
    return (
        <Card
            className="max-w-sm"
            imgAlt={description}
            imgSrc={imageSrc}
        >
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {description}
                </h5>
            </a>
            <div className="mb-5 mt-2.5 flex items-center">
            </div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
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
