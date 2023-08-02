import React from "react";

const AvatarGroup = ({ images }) => {
  return (
    <div className="flex -space-x-4">
      {images.map((image, index) => (
        <div className="inline-block" key={index}>
          <img
            className="h-10 w-10 rounded-full border-2 border-white"
            src={image}
            alt="Avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
