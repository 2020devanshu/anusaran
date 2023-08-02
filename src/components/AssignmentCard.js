import React from 'react';

const AssignmentCard = ({ name, assignments }) => {
    return (
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm w-1/3">
            <div className="flex items-start">

                <div className="ml-4">
                    <div className='flex flex-row'>
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                            {/* Placeholder for your text icon */}
                            <span>T</span>
                        </div>
                        <div className='text-lg font-semibold ml-4'>

                            {name}
                        </div>

                    </div>
                    <p className="text-gray-600">{assignments} assignments</p>
                </div>
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded bg-green-500 text-white">
                {/* Placeholder for your right-side icon */}
                <span>I</span>
            </div>
        </div>
    );
};

export default AssignmentCard;
