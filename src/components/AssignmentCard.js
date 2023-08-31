import React from 'react';

function AssignmentCard({ name, assignments, handleAssignment, id }) {
    return (
        <div className="flex justify-between items-center px-8 w-1/3 py-4 bg-gray-100 rounded-lg shadow-md relative">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50" className="absolute -mt-12">
                    <path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z"></path>
                </svg>
                <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                </div>
            </div>

            <div>
                <button
                    className="ml-auto px-4 py-2 bg-blue-500 rounded-full text-white"
                    onClick={() => handleAssignment(name,id)}
                >
                    View Details
                </button>
            </div>
        </div>
    );

}

export default AssignmentCard;
