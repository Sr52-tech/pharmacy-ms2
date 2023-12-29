import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase-config.js';
import { collection, getDocs, } from "firebase/firestore";
import { query, where } from 'firebase/firestore';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function LineChart() {
    
    const [orderCount, setOrderCount] = useState(0);
    const [months, setMonths] = useState(0);
    const [loading, setLoading] = useState(true);

    const collectionRef = collection(db, "orders");


    // useEffect(() => {
    //     const fetchOrderCount = async () => {
    //         const data = await getDocs(collectionRefO);
    //         setOrderCount(data.docs.length);
    //     };
    //     fetchOrderCount();
    // }, []);

    // useEffect(() => {
    //     const fetchOrderCount = async () => {
    //         const janOrders = await getDocs(query(collectionRef, where("month", "==", "January")));
    //         const FebOrders = await getDocs(query(collectionRef, where("month", "==", "February")));
    //         const MarOrders = await getDocs(query(collectionRef, where("month", "==", "March")));

    //         const orderCounts = [
    //             { month: 'January', orderCount: janOrders.docs.length },
    //             { month: 'February', orderCount: FebOrders.docs.length},
    //             { month: 'March', orderCount: MarOrders.docs.length},
    //         ];

    //         setOrderCount(orderCounts);
    //     };
    //     fetchOrderCount();
    // }, []);

    useEffect(() => {
        const fetchOrderCount = async () => {
            const orderCounts = [];
            const months = [];
    
            for (let i = 0; i < 12; i++) {
                const start = new Date(2023, i, 1); // adjust the year as needed
                const end = new Date(2023, i + 1, 0); // adjust the year as needed
                
                const startTimestamp = Timestamp.fromMillis(start.getTime());
                const endTimestamp = Timestamp.fromMillis(end.getTime());
    
                const q = query(collectionRef, where("createdAt", ">=", startTimestamp), where("createdAt", "<=", endTimestamp));
                const querySnapshot = await getDocs(q);
                orderCounts.push(querySnapshot.docs.length);
                months.push(start.toLocaleString('default', { month: 'long' }));
            }
    
            setOrderCount(orderCounts);
            setMonths(months);
            setLoading(false); // set loading to false after data is fetched
        };
        fetchOrderCount();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // render loading text while data is being fetched
    }


    let Data = [];
    for (let i = 0; i < orderCount.length; i++) {
        Data.push(orderCount[i]); // directly push orderCount[i] into Data
    }

const chartData = {
    labels: months,
    datasets: [
        {
            label: '# of Orders',
            data: Data,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
        },
    ],
};


    return (
        <div style={{maxWidth: "1000px", maxHeight: "700px"}}>
            <Line data={chartData} />
        </div>
    );
}

export default LineChart;
