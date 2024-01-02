import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';

export const MedicineProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'products'));
                const querySnapshot = await getDocs(q);
                const products = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ProductId: doc.data().ProductId,
                    ProductName: doc.data().ProductName,
                    ProductPrice: doc.data().ProductPrice,
                    ProductImage: doc.data().ProductImage,
                    Product_quantity: doc.data().Product_quantity,
                    Description: doc.data().Description,
                    Category: doc.data().Category,
                }));
                setProducts(products);
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
            await deleteDoc(doc(db, 'products', productId));
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const medicineProducts = products.filter((product) => product.Category === 'Medicine');

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: '1rem',
                    textAlign: 'center',
                    margin: '2rem',
                }}>
                    {medicineProducts.map((product) => (
                        <ProductCard key={product.id} 
                        product={product} 
                        onDelete={() => handleDeleteProduct(product.id)} />
                    ))}
                </div>
            )}
        </>
    );
};
