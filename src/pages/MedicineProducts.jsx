import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';

export const MedicineProducts = () => {
    const { products } = useContext(ProductsContext);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const medicineProducts = products.filter(product => product.Category === 'Medicine');

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