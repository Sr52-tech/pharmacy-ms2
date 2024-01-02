import React from "react";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";


function PayForm() {

    const [cardNumError, setCardNumError] = useState("");
    const [monthError, setMonthError] = useState("");
    const [yearError, setYearError] = useState("");
    const [nameError, setNameError] = useState("");
    const [cvcError, setCVCError] = useState("");

    const validateCardNum = (value) => {
        // Add your validation logic here
        if (value.length !== 16) {
            setCardNumError("Invalid card number");
        } 
        else if (/[A-Za-z]/.test(value)) {
            setCardNumError("No letters allowed");
        }
        else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setCardNumError("No special characters allowed");
        }
        else {
            setCardNumError("");
        }
    };

    const validateDateMonth = (value) => {
        const month = parseInt(value, 10);
        // Add your validation logic here

        if (value === "") {
            setMonthError("Date is required");
        } 
        else if (/[A-Za-z]/.test(value)) {
            setMonthError("No letters allowed");
        }
        else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setNameError("No special characters allowed");
        }
        else if (value.length !== 2) {
            setMonthError("Invalid date");
        }
        else if (isNaN(month) || month < 1 || month > 12) {
            setMonthError("the date is incorrect");
        }
        else {
            setMonthError("");
        }
    };

    const validateDateYear = (value) => {
        // Add your validation logic here
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear() % 100; // get last two digits of current year
        const maxYear = (currentYear + 7) % 100; // get last two digits of year 7 years from now

        if (value === "") {
            setYearError("Date is required");
        }
        else if (/[A-Za-z]/.test(value)) {
            setYearError("No letters allowed");
        }
        else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setYearError("No special characters allowed");
        }
        else if (value.length !== 2) {
            setYearError("Invalid date");
        }
        else if (isNaN(year) || year < currentYear || year > maxYear) {
            setYearError("the date is incorrect");
        }
        else {
            setYearError("");
        }
    };

    const validateName = (value) => {
        // Add your validation logic here
        if (value === "") {
            setNameError("Name is required");
        } 
        else if (/[0-9]/.test(value)) {
            setNameError("No numbers allowed");
        }
        else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setNameError("No special characters allowed");
        }
        else {
            setNameError("");
        }
    };

    const validateCVC = (value) => {
        // Add your validation logic here
        if (value === "") {
            setCVCError("CVC is required");
        } 
        else if (value.length !== 3) {
            setCVCError("Invalid CVC");
        }
        else if (/[A-Za-z]/.test(value)) {
            setCVCError("No letters allowed");
        }
        else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setCVCError("No special characters allowed");
        }
        else {
            setCVCError("");
        }
    
    };

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
    });


    return (
    
    <div style={{marginTop: '50px'}}>

            <Cards
                number={state.number}
                name={state.name}
                expiry={state.expiry}
                cvc={state.cvc}
                focused={state.focus}
            />


    <form style={{marginTop: '30px'}} class="max-w-md mx-auto">
        <div class="relative z-0 w-full mb-5 group">
            <input 
                onChange={(e) => {
                    const newNumber = e.target.value;
                    setState(prev => ({ ...prev, number: newNumber }));
                    validateCardNum(newNumber);
                }}
                onFocus={(e) => setState(prev => ({ ...prev, focus: 'number' }))}
                type="text" 
                name="floating_cardnum" 
                id="floating_cardnum" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required 
            />
            <label for="floating_cardnum" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card Number</label>
            {cardNumError && <p className="text-red-500 text-xs italic">{cardNumError}</p>}
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">

            <div class="relative z-0 w-full mb-5 group">
                <input 
                    onChange={(e) => {
                        const newDateMonth = e.target.value;
                        setState(prev => ({ ...prev, expiry: newDateMonth + '/' + prev.expiry.split('/')[1] }));
                        validateDateMonth(newDateMonth);
                    }}
                    onFocus={(e) => setState(prev => ({ ...prev, focus: 'expiry' }))}
                    type="text" 
                    name="floating_date" 
                    id="floating_date" 
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    pattern="\d{2}" 
                />
                <label for="floating_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exp Month</label>
                {monthError && <p className="text-red-500 text-xs italic">{monthError}</p>}
            </div>

            <div class="relative z-0 w-full mb-5 group">
                <input 
                    onChange={(e) => {
                        const newDateYear = e.target.value;
                        setState(prev => ({ ...prev, expiry: prev.expiry.split('/')[0] + '/' + newDateYear }));
                        validateDateYear(newDateYear);
                    }}
                    onFocus={(e) => setState(prev => ({ ...prev, focus: 'expiry' }))}
                    type="text" 
                    name="floating_date" 
                    id="floating_date" 
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                    pattern="\d{2}" 
                />
                <label for="floating_date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exp Year</label>
                {yearError && <p className="text-red-500 text-xs italic">{yearError}</p>}
            </div>

        </div>
        <div class="relative z-0 w-full mb-5 group">
            <input onChange={(e) => {
                const newName = e.target.value;
                setState(prev => ({ ...prev, name: newName }));
                validateName(newName);
                }}
                onFocus={(e) => setState(prev => ({ ...prev, focus: 'name' }))}
                type="text" 
                name="name" 
                id="floating_name" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required 
            />
            <label for="floating_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Holder Name</label>
            {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input 
                    onChange={(e) => {
                        const newCVC = e.target.value;
                        setState(prev => ({ ...prev, cvc: newCVC }));
                        validateCVC(newCVC);
                    }}
                    onFocus={(e) => setState(prev => ({ ...prev, focus: 'cvc' }))}
                    type="text" 
                    name="floating_CVC" 
                    id="floating_CVC" 
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                    placeholder=" " 
                    required 
                />
                <label for="floating_CVC" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CVC</label>
                {cvcError && <p className="text-red-500 text-xs italic">{cvcError}</p>}
            </div>
        </div>

        <button 
            type="submit" 
            class="text-white bg-[#0C7494] hover:bg-[#0c5994] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-2 text-center mx-auto block dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{marginTop: '20px', width: '50%', height: '50px'}}
            disabled={cardNumError || monthError || yearError || nameError || cvcError}
        > Submit
        </button>
    </form>

    </div>

    );
}

export default PayForm;