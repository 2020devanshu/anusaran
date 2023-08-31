import React from 'react';

const FeedbackCard = ({ data }) => {
  const feedback = JSON.parse(data.feedback);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Feedback from {data.name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">{data.course}</p>
          <p className="mt-2 text-gray-500">{data.email}</p>
          <div className="mt-4">
            <div className="flex mb-4">
              <div className="w-1/2">
                <div className="font-bold">Overall Experience</div>
                <div>{feedback["Rate your overall Experience"]}</div>
              </div>
              <div className="w-1/2">
                <div className="font-bold">Pace, Too Fast</div>
                <div>{feedback["Pace, Too Fast"]}</div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <div className="font-bold">Too Tough</div>
                <div>{feedback["Too Tough"]}</div>
              </div>
              <div className="w-1/2">
                <div className="font-bold">Language</div>
                <div>{feedback["Language"]}</div>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2">
                <div className="font-bold">Too Easy</div>
                <div>{feedback["Too Easy"]}</div>
              </div>
              <div className="w-1/2">
                <div className="font-bold">Clarity of Instructions</div>
                <div>{feedback["Clarity of Instructions"]}</div>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <div className="font-bold">Pace, Too Slow</div>
                <div>{feedback["Pace, Too Slow"]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
