import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from '../firebase-config.js';
import { collection, getDocs, } from "firebase/firestore";
import { query, where } from 'firebase/firestore';
import 'firebase/firestore';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function LineChart() {
    
    const [orderCount, setOrderCount] = useState(0);

    const collectionRef = collection(db, "orders");

    // useEffect(() => {
    //     const fetchOrderCount = async () => {
    //         const data = await getDocs(collectionRefO);
    //         setOrderCount(data.docs.length);
    //     };
    //     fetchOrderCount();
    // }, []);

    useEffect(() => {
        const fetchOrderCount = async () => {
            const janOrders = await getDocs(query(collectionRef, where("month", "==", "January")));
            const FebOrders = await getDocs(query(collectionRef, where("month", "==", "February")));
            const MarOrders = await getDocs(query(collectionRef, where("month", "==", "March")));


            const orderCounts = [
                { month: 'January', orderCount: janOrders.docs.length },
                { month: 'February', orderCount: FebOrders.docs.length},
                { month: 'March', orderCount: MarOrders.docs.length},
            ];

            setOrderCount(orderCounts);
        };
        fetchOrderCount();
    }, []);

    let data = [];
    for (let i = 0; i < orderCount.length; i++) {
        data.push(orderCount[i].orderCount);
    }

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'My First Dataset',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }


    return (
        <div style={{maxWidth: "1000px", maxHeight: "700px"}}>
            <Line data={chartData} />
        </div>
    );
}

export default LineChart;
