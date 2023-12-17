import Nav from "../components/Navbar";
import BasicCard from "../components/BasicCard";
import Footer from "../components/Footer";
import LineChart from "../charts/LineChart.jsx";

import { db, app } from "../firebase-config.js";
import { collection, getDocs, } from "firebase/firestore";
import React, { useState, useEffect } from 'react';


function Stat() {

    const [userCount, setUserCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [salesCount, setSalesCount] = useState(0);

    const collectionRef = collection(db, "users");
    const collectionRefP = collection(db, "products");
    const collectionRefS = collection(db, "sales");

    useEffect(() => {
        const fetchSalesCount = async () => {
            const data = await getDocs(collectionRefS);
            setSalesCount(data.docs.length);
        };
    
        fetchSalesCount();
    }, []);

    useEffect(() => {
        const fetchUserCount = async () => {
            const data = await getDocs(collectionRef);
            setUserCount(data.docs.length);
        };
    
        fetchUserCount();
    }, []);

    useEffect(() => {
        const fetchProductCount = async () => {
            const data = await getDocs(collectionRefP);
            setProductsCount(data.docs.length);
        };
    
        fetchProductCount();
    }, []);

    return (
        <>
            <div className="row flex flex-wrap justify-center">
                <BasicCard 
                    title={`${userCount} Users`}
                    icon="/Pics/icons/user.png"
                />

                <BasicCard 
                    title={`${productsCount} Products`}
                    icon= '/Pics/icons/med.png'
                />
            </div>

            <div>
                <LineChart />
            </div>
        </>
    );
}

export default Stat;
