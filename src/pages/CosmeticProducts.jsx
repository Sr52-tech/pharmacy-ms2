import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export const CosmeticProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, 'products'));
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => ({
                ProductId: doc.data().ProductId,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImage: doc.data().ProductImage,
                Product_quantity: doc.data().Product_quantity,
                Description: doc.data().Description,
                Category: doc.data().Category,
            }));
            setProducts(products);
        };

        fetchProducts();
    }, []);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const medicineProducts = products.filter(product => product.Category === 'Cosmetic');

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '1rem',
                textAlign: 'center',
                margin: '2rem',
            }}>
                {medicineProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    );
};