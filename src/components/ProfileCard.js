import React from "react";

const ProfileCard = ({ imgSrc, name, designation }) => {
  return (
    <div className="bg-transparent w-full md:w-1/3 mx-auto flex flex-col justify-center items-center space-x-4 rounded-lg overflow-hidden">
      <div className="flex-shrink-0">
        {/* <img className="h-48 w-full object-cover" src={imgSrc} alt={name} />
         */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="#7455F6" />
          <mask
            id="mask0_2_471"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="200"
            height="200"
          >
            <circle cx="100" cy="100" r="100" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_2_471)">
            <circle cx="99.9997" cy="93.2206" r="25.4237" fill="#FEFEFE" />
            <circle cx="99.9999" cy="191.525" r="66.1017" fill="#FEFEFE" />
          </g>
        </svg>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base mb-2">{name}</p>
        <div className="font-bold text-xl ">{designation}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
