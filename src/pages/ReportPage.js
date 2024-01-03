import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, Switch, FormControlLabel } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const ReportPage = () => {
    const [originalOrders, setOriginalOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSortedByPrice, setIsSortedByPrice] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            const ordersData = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const totalPrice = data.products?.reduce((sum, product) => {
                    const price = parseFloat(product.price || 0);
                    const quantity = parseInt(product.quantity || 0, 10);
                    return sum + price * quantity;
                }, 0) || 0;
                return {
                    ...data,
                    id: doc.id,
                    totalPrice: totalPrice
                };
            });

            setOriginalOrders(ordersData);
            setOrders(ordersData);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (isSortedByPrice) {
            const sortedOrders = [...orders].sort((a, b) => a.totalPrice - b.totalPrice);
            setOrders(sortedOrders);
        } else {
            setOrders(originalOrders);
        }
    }, [isSortedByPrice, originalOrders]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    const formatDate = (timestamp) => {
        return timestamp ? new Date(timestamp.seconds * 1000).toLocaleDateString() : 'N/A';
    };

    const formatProducts = (products) => {
        return products?.map(product => `${product.name}`).join(', ') || '';
    };
// (Quantity: ${product.quantity}, Price: ${product.price})
    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>Total Orders Summary</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isSortedByPrice}
                            onChange={() => setIsSortedByPrice(!isSortedByPrice)}
                        />
                    }
                    label={isSortedByPrice ? "Sorted by Total Price" : "Unsorted"}
                />
            </Paper>

            <TableContainer component={Paper} style={{ margin: '20px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Products</TableCell>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Customer Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">{order.id}</TableCell>
                                <TableCell align="right">{formatProducts(order.products)}</TableCell>
                                <TableCell align="right">{order.totalPrice ? `$${order.totalPrice.toFixed(2)}` : 'N/A'}</TableCell>
                                <TableCell align="right">{formatDate(order.date)}</TableCell>
                                <TableCell align="right">{order.user?.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportPage;
