import React from "react";

const FeedbackCard = ({ image, name, salaryInfo, feedback }) => {
  return (
    <div className="cardcontent xsm:w-full  md:w-1/3 h-96 m-10 rounded-md flex flex-col items-center p-4">
      <img
        className="w-24 h-24 rounded-full mt-4"
        src={image}
        alt="Profile Pic"
      />
      <h2 className="text-white mt-4">{name}</h2>
      <p className="text-white mt-2">{salaryInfo}</p>
      <p className="text-white mt-2 text-center">{feedback}</p>
    </div>
  );
};

export default FeedbackCard;
