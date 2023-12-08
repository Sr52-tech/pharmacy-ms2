// todo: design pictures

import React from "react";
import Nav from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { MedicineProducts } from "./MedicineProducts.jsx";
import Carousel from "../components/Carousel.jsx";
import Categories from "../components/Categories.jsx";
import Testimonial from "../components/Testimonial.jsx";

function Main() {
    return (
        <>
            <Nav />
            <Carousel />

            <h1 style={{ marginLeft: '110px', marginBottom: '50px' }} class="text-5xl font-extrabold dark:text-white m-4">All Types<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Of Medicines</small></h1>

            <div className="row flex flex-wrap justify-center">
                <Categories

                    imgSrc="/Pics/Cards/Designer.png"
                    title="Medicine Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/medicine"

                />

                <Categories

                    imgSrc="/Pics/Cards/Allergy.png"
                    title="Cosmetic Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/cosmetic"
                />

                <Categories

                    imgSrc="/Pics/SkinCare.png"
                    title="Hygiene Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/hygiene"
                />
            </div>

            <hr style={{ width: '70%', height: '1px', backgroundColor: 'black', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 style={{ marginLeft: '115px', marginBottom: '50px', marginTop: '60px' }} class="text-5xl font-extrabold dark:text-white m-4">What<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">People Say</small></h1>

            <div className="row flex flex-wrap justify-center" style={{ marginBottom: '100px' }}>
                <Testimonial
                    name="John Doe"
                    queote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />

                <Testimonial
                    name="John Doe"
                    queote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />

                <Testimonial
                    name="John Doe"
                    queote="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </div>

            <Footer />
        </>
    );
}

export default Main;