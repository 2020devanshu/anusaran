import React, { useState } from "react";
import { IoMdPlay } from "react-icons/io";

const VideoCard = ({ title, videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden w-1/2 videoCard shadow-xl">
      <div
        className="flex items-center justify-start cursor-pointer p-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IoMdPlay size={24} className="mr-2 text-purple-500" />
        <h2 className="font-medium text-gray-700">{title}</h2>
      </div>
      {isOpen && (
        <div className="aspect-w-16 aspect-h-9  p-10">
          <iframe
            src={videoUrl}
            title={title}
            allowFullScreen

            className="aspect-video w-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
