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
                    description="Find all your healthcare essentials, from over-the-counter remedies to prescription medications and supplements, in our Medicine category."
                    link="/medicine"

                />

                <Categories

                    imgSrc="/Pics/Cards/Cosmetic.png"
                    title="Cosmetic Products"
                    description="Elevate your beauty game with our selection of makeup, skincare, and beauty tools, designed to help you look and feel your best.."
                    link="/cosmetic"
                />

                <Categories

                    imgSrc="/Pics/Cards/hygene.png"
                    title="Hygiene Products"
                    description="Prioritize personal well-being with our hygiene products, including sanitizers, soaps, dental care, and more, to maintain cleanliness and health.."
                    link="/hygiene"
                />
            </div>
            <hr style={{ width: '70%', height: '1px', backgroundColor: 'black', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 style={{ marginLeft: '110px', marginTop: '60px' }} class="text-5xl font-extrabold dark:text-white m-4">Who<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">Are We</small></h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', height: '70%', width: '70%', marginLeft: '110px'}}>
                <Info 
                    imgSrc={"/Pics/info.png"}
                />
                <h3 style={{ marginLeft: '100px' }}>
                In our system, we are committed to revolutionizing pharmacy operations. Our user-friendly software solution optimizes inventory management, enhances workflow efficiency, and improves patient care.
                <br></br> With advanced technologies and industry best practices, we empower pharmacies to streamline operations and provide exceptional service. Trust in our dedication to excellence and supporting your success in the dynamic healthcare landscape.                <br></br>a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. </h3>
            </div>

            <hr style={{ width: '70%', height: '1px', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 style={{ marginLeft: '115px', marginBottom: '50px', marginTop: '60px' }} class="text-5xl font-extrabold dark:text-white m-4">What<small class="ms-2 font-semibold text-gray-500 dark:text-gray-400">People Say</small></h1>

            <div className="row flex flex-wrap justify-center" style={{ marginBottom: '100px' }}>
                <Testimonial
                    name="Sana"
                    queote="I can't imagine managing my prescriptions without this pharmacy management system. It has made my life so much easier and convenient." 
                />

                <Testimonial
                    name="Shahd"
                    queote="I appreciate how this system keeps track of my medication history and alerts me when it's time for a refill. It gives me peace of mind knowing that I won't miss any doses."
                />

                <Testimonial
                    name="Moaz"
                    queote="As a busy individual, having access to an online platform where I can manage my prescriptions and schedule pick-ups is incredibly convenient. This system has exceeded my expectations." 
                />
            </div>
        </>
    );
}

export default Main;