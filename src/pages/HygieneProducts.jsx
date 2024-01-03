import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from "../firebase-config";
import TextField from '@mui/material/TextField';

export const HygieneProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const q = query(collection(db, 'products'));
            const querySnapshot = await getDocs(q);
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ProductId: doc.data().ProductId,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImage: doc.data().ProductImage,
                Product_quantity: doc.data().Product_quantity,
                Description: doc.data().Description,
                Category: doc.data().Category,
                Prescription: doc.data().Prescription,
            }));
            setProducts(products);
            setLoading(false);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredProducts = products.filter(product => 
        product.Category === 'Hygiene' && 
        product.ProductName.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <TextField 
                        fullWidth 
                        label="Search Products" 
                        variant="outlined" 
                        onChange={handleSearchChange} 
                        style={{ margin: '1rem' }}
                    />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '1rem',
                        textAlign: 'center',
                        margin: '2rem',
                    }}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} 
                            product={product} 
                            onDelete={() => handleDeleteProduct(product.id)} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default HygieneProducts;
