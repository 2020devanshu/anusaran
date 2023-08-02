import React from 'react';

const SubAssignmentCard = ({ assignmentName, score, submissionDate }) => {
    return (
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-sm my-2 w-1/3">
            <div className='w-full'>
                <div className='flex justify-between w-full'>

                    <div className="text-lg font-semibold">{assignmentName}</div>

                    <span className='font-bold text-2xl mr-4'>{score}</span>
                </div>
                <div>
                    <div className='flex font-bold items-center'>
                        <svg className='mr-1' width="15" height="15" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.3837 34.75H12.6163C3.77674 34.75 0 31.0002 0 22.2238V12.5262C0 3.74977 3.77674 0 12.6163 0H22.3837C31.2233 0 35 3.74977 35 12.5262V22.2238C35 31.0002 31.2233 34.75 22.3837 34.75ZM12.6163 2.42442C5.11163 2.42442 2.44186 5.07512 2.44186 12.5262V22.2238C2.44186 29.6749 5.11163 32.3256 12.6163 32.3256H22.3837C29.8884 32.3256 32.5581 29.6749 32.5581 22.2238V12.5262C32.5581 5.07512 29.8884 2.42442 22.3837 2.42442H12.6163Z" fill="#1C1C1C" />
                            <path d="M12.0963 22.7562C11.4126 22.7562 10.7777 22.5946 10.2242 22.2875C8.87302 21.5278 8.14046 20.0247 8.14046 18.0528V1.92241C8.14046 1.25974 8.69395 0.710205 9.36139 0.710205C10.0288 0.710205 10.5823 1.25974 10.5823 1.92241V18.0528C10.5823 19.1034 10.8916 19.8792 11.4288 20.1701C11.9986 20.4934 12.8777 20.3318 13.8381 19.7661L15.987 18.4892C16.866 17.972 18.1195 17.972 18.9986 18.4892L21.1474 19.7661C22.1242 20.3479 23.0033 20.4934 23.5567 20.1701C24.094 19.863 24.4033 19.0872 24.4033 18.0528V1.92241C24.4033 1.25974 24.9567 0.710205 25.6242 0.710205C26.2916 0.710205 26.8451 1.25974 26.8451 1.92241V18.0528C26.8451 20.0247 26.1126 21.5278 24.7614 22.2875C23.4102 23.0471 21.6358 22.8855 19.894 21.8511L17.7451 20.5742C17.6474 20.5096 17.3381 20.5096 17.2405 20.5742L15.0916 21.8511C14.0823 22.4491 13.0405 22.7562 12.0963 22.7562Z" fill="#1C1C1C" />
                            <path d="M22.3837 34.75H12.6163C3.77674 34.75 0 31.0002 0 22.2238V12.5262C0 3.74977 3.77674 0 12.6163 0H22.3837C31.2233 0 35 3.74977 35 12.5262V22.2238C35 31.0002 31.2233 34.75 22.3837 34.75ZM12.6163 2.42442C5.11163 2.42442 2.44186 5.07512 2.44186 12.5262V22.2238C2.44186 29.6749 5.11163 32.3256 12.6163 32.3256H22.3837C29.8884 32.3256 32.5581 29.6749 32.5581 22.2238V12.5262C32.5581 5.07512 29.8884 2.42442 22.3837 2.42442H12.6163Z" fill="#1C1C1C" />
                            <path d="M12.0963 22.7562C11.4126 22.7562 10.7777 22.5946 10.2242 22.2875C8.87302 21.5278 8.14046 20.0247 8.14046 18.0528V1.92241C8.14046 1.25974 8.69395 0.710205 9.36139 0.710205C10.0288 0.710205 10.5823 1.25974 10.5823 1.92241V18.0528C10.5823 19.1034 10.8916 19.8792 11.4288 20.1701C11.9986 20.4934 12.8777 20.3318 13.8381 19.7661L15.987 18.4892C16.866 17.972 18.1195 17.972 18.9986 18.4892L21.1474 19.7661C22.1242 20.3479 23.0033 20.4934 23.5567 20.1701C24.094 19.863 24.4033 19.0872 24.4033 18.0528V1.92241C24.4033 1.25974 24.9567 0.710205 25.6242 0.710205C26.2916 0.710205 26.8451 1.25974 26.8451 1.92241V18.0528C26.8451 20.0247 26.1126 21.5278 24.7614 22.2875C23.4102 23.0471 21.6358 22.8855 19.894 21.8511L17.7451 20.5742C17.6474 20.5096 17.3381 20.5096 17.2405 20.5742L15.0916 21.8511C14.0823 22.4491 13.0405 22.7562 12.0963 22.7562Z" fill="#1C1C1C" />
                        </svg>

                        Algorithms
                    </div>
                </div>
                <p className="text-gray-600 mt-4 ">Submission Date: <span className='text-red-500'>{submissionDate}</span></p>
            </div>
            <div className="flex items-center w-1/3 h-full">
                <div className="flex items-center justify-center h-full w-full  bg-blue-500 text-white rounded-xl">
                    {/* Placeholder for your assignment icon */}
                    <span>I</span>
                </div>
            </div>
        </div>
    );
};

export default SubAssignmentCard;
