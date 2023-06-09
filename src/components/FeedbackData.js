import React from "react";

function FeedbackCard({ feedbackData }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg mx-auto w-64 p-4 m-8">
      <img
        className="w-24 h-24 object-cover rounded-full mb-4 shadow"
        src={feedbackData.image}
        alt={feedbackData.name}
      />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-xl">
        {feedbackData.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-200 mt-2">
        {feedbackData.feedback}
      </p>
    </div>
  );
}

export default FeedbackCard;
