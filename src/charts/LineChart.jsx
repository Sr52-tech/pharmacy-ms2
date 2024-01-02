import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase-config.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function LineChart() {
    const [orderCounts, setOrderCounts] = useState([]);
    const [months, setMonths] = useState([]);
    const [loading, setLoading] = useState(true);

    const collectionRef = collection(db, "orders");

    useEffect(() => {
        const fetchOrderCount = async () => {
            const counts = [];
            const monthLabels = [];

            for (let i = 0; i < 12; i++) {
                const startTimestamp = new Date(2023, i, 1);
                const endTimestamp = new Date(2023, i + 1, 0);

                const q = query(collectionRef, where("date", ">=", startTimestamp), where("date", "<=", endTimestamp));
                const querySnapshot = await getDocs(q);
                counts.push(querySnapshot.docs.length);
                monthLabels.push(startTimestamp.toLocaleString('default', { month: 'long' }));
            }

            setOrderCounts(counts);
            setMonths(monthLabels);
            setLoading(false);
        };

        fetchOrderCount();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    const chartData = {
        labels: months,
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
