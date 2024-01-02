// todo: design pictures

import React from "react";
import Nav from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { MedicineProducts } from "./MedicineProducts.jsx";
import Carousel from "../components/Carousel.jsx";
import Categories from "../components/Categories.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Info from "../components/Info.jsx";

function Main() {
    return (
        <>
            <Carousel />

            <h1 style={{ marginLeft: '110px', marginBottom: '50px' }} class="text-5xl font-extrabold dark:text-white m-4">All Types<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Of Medicines</small></h1>

            <div className="row flex flex-wrap justify-center">
                <Categories

                    imgSrc="/Pics/Cards/vitamine.png"
                    title="Medicine Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/medicine"

                />

                <Categories

                    imgSrc="/Pics/Cards/Cosmetic.png"
                    title="Cosmetic Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/cosmetic"
                />

                <Categories

                    imgSrc="/Pics/Cards/hygene.png"
                    title="Hygiene Products"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    link="/hygiene"
                />
            </div>
            <hr style={{ width: '70%', height: '1px', backgroundColor: 'black', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 style={{ marginLeft: '110px', marginTop: '60px' }} class="text-5xl font-extrabold dark:text-white m-4">Who<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">We Are</small></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', height: '70%', width: '70%', marginLeft: '110px'}}>
                <Info 
                    imgSrc={"/Pics/info.png"}
                />
                <h3 style={{ marginLeft: '100px' }}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                <br></br>a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 
                <br></br>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" The Extremes of Good and Evil by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</h3>
            </div>

            <hr style={{ width: '70%', height: '1px', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto' }} />
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
        </>
    );
}

export default Main;