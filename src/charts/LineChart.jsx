import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart = () => {
    const [orderCounts, setOrderCounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const collectionRef = collection(db, "orders");

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersSnapshot = await getDocs(collectionRef);
            const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const monthlyCounts = Array(12).fill(0);

            ordersData.forEach(order => {
                const orderDate = order.date.toDate(); // Convert Timestamp to JavaScript Date
                if (orderDate.getFullYear() === 2023) { // Adjust the year as needed
                    const monthIndex = orderDate.getMonth();
                    monthlyCounts[monthIndex]++;
                }
            });

            setOrderCounts(monthlyCounts);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                label: '# of Orders',
                data: orderCounts,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div style={{ maxWidth: "1000px", maxHeight: "700px" }}>
            <Line data={chartData} />
        </div>
    );
}

export default LineChart;
