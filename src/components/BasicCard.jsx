import React from 'react';

function BasicCard({title, icon}) {
    return (
            <div style={{ marginTop: '50px', margin: '10px', maxWidth: '350px', minWidth: '270px', padding: '30px', maxHeight: '90px'}} href="#" class="flex items-center block bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img src={icon} class="mr-4" />
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </div>
        );
    }

export default BasicCard;