import React from "react";

const ProfileCard = ({ imgSrc, name, designation }) => {
  return (
    <div className="bg-transparent w-full md:w-1/3 mx-auto flex flex-col justify-center items-center space-x-4 rounded-lg overflow-hidden">
      <div className="flex justify-center items-center h-52 w-52"> {/* This is optional, just to center the image in its container */}
        <img
          src={imgSrc}
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover"
        />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base mb-2">{name}</p>
        <div className="font-bold text-xl ">{designation}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
