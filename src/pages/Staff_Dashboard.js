//todo: design pictures

import React from "react";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

function Staff_Dashboard() {
    return (
        <>

            <div style={{ marginLeft: '4px', marginTop: '50px' }} className="row flex flex-wrap justify-center">
                <Categories

                    imgSrc='/Pics/BlurredMeds.png'
                    title="Add New Product"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/addproducts"
                />

                <Categories
                    imgSrc="/Pics/BlurredMeds.png"
                    title="View Reports"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/products"
                />

                <Categories

                    imgSrc="/Pics/BlurredMeds.png"
                    title="Statistics"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/stat"
                />
            </div>

            <div style={{ marginTop: '170px' }}>
            </div>

        </>
    );
}

export default Staff_Dashboard;
