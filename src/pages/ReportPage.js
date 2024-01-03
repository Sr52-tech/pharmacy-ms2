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
            const ordersData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setOrders(ordersData);
            setOriginalOrders(ordersData); // Store original data
            setLoading(false);
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (isSortedByPrice) {
            const sortedOrders = [...orders].sort((a, b) => a.price - b.price);
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

    const formatDate = (date) => {
        return date ? date.toDate().toLocaleDateString() : 'N/A';
    };

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
                    label={isSortedByPrice ? "Sorted by Price" : "Unsorted"}
                />
            </Paper>

            <TableContainer component={Paper} style={{ margin: '20px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Product</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Customer Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">{order.id}</TableCell>
                                {(order.Product || order.product) &&<TableCell align="right">{order.Product} {order.product}</TableCell>}
                                <TableCell align="right">{order.Quantity}</TableCell>
                                <TableCell align="right">{order.price}</TableCell>
                                <TableCell align="right">{formatDate(order.date)}</TableCell>
                                <TableCell align="right">{order.name}</TableCell>
                                <TableCell align="right">{order.email}</TableCell>
                                <TableCell align="right">{order.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ReportPage;
