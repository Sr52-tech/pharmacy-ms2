import React from "react";

function Testimonial({ name, queote }) {
    return (
        <div style={{ margin: '10px' }} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <blockquote class="mb-3 font-normal text-gray-700 dark:text-gray-400 pl-4 border-l-4 border-gray-500">{queote}</blockquote>
            </div>
        </div>
    );
}

export default Testimonial;