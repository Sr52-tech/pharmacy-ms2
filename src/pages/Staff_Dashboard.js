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
                    description="With a user-friendly interface, you can quickly input essential details and upload images, ensuring an accurate and comprehensive inventory. Simplify product management and keep your offerings up to date with ease."
                    link="/addproducts"
                />

                <Categories
                    imgSrc="/Pics/BlurredMeds.png"
                    title="View Reports"
                    description="With a simple click, you can access detailed reports on sales, inventory, and other key metrics. Our user-friendly interface presents the information in a clear and organized manner, enabling you to make informed decisions and gain valuable insights into your pharmacy's performance. Streamline your analysis and drive business growth with our powerful reporting capabilities."
                    link="/report"
                />

                <Categories

                    imgSrc="/Pics/BlurredMeds.png"
                    title="Statistics"
                    description="Our user-friendly interface presents the statistics in a clear and visually appealing format, allowing you to analyze trends, identify opportunities, and make data-driven decisions. Streamline your reporting and harness the power of statistics to optimize your pharmacy's operations and drive success."
                    link="/stat"
                />
            </div>

            <div style={{ marginTop: '170px' }}>
            </div>

        </>
    );
}

export default Staff_Dashboard;
