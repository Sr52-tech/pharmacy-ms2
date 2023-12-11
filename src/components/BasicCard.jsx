import React from 'react';

function BasicCard({title, icon}) {
    return (
        
        <a href="#" class="flex items-center block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <img src={icon} class="mr-4" />
            <div>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </div>
        </a>
    );
}

export default BasicCard;