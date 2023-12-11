import React from "react";
import Nav from "../components/Navbar";
import BasicCard from "../components/BasicCard";
import Footer from "../components/Footer";

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

function Stat() {

    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        firebase.firestore().collection('Users').get().then((querySnapshot) => {
            const TotalUsers = querySnapshot.size;
            setTotalUsers(TotalUsers);
        });
    }, []);


    return (
        <>
            <Nav />

            <div className="row flex flex-wrap justify-center">
                <BasicCard 
                    title={`Number of Users ${totalUsers}`}
                    icon="/Pics/icons/user.png"
                />
            </div>

            <Footer />
        </>
    );
}

export default Stat;
