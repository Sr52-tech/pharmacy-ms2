import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

export const CosmeticProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map((doc) => ({
                    ProductId: doc.data().ProductId,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImage: doc.data().ProductImage,
                    Product_quantity: doc.data().Product_quantity,
                    Description: doc.data().Description,
                    Category: doc.data().Category,
                    id: doc.id,
                }));
                setProducts(products);
                console.log('Fetched Products:', products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            console.log('Deleting product with ID:', productId);
            await deleteDoc(doc(db, 'products', productId));
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            console.log('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cosmeticProducts = products.filter((product) => product.Category === 'Cosmetic');

    return (
        <>
            {loading ? (
                // Show CircularProgress while products are being fetched
                <CircularProgress style={{ margin: '2rem' }} />
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '1rem',
                        textAlign: 'center',
                        margin: '2rem',
                    }}
                >
                    {cosmeticProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={() => handleDeleteProduct(product.id)} />
                    ))}
                </div>
            )}
        </>
    );
};
