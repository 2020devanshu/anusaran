import React, { useState } from 'react';

const ProfileCard = ({ name,
  role,
  instituteLogo,
  instituteName,
  address,
  city,
  state,
  country,
  zipCode,
  email,
  phone,
  gender,
  profilePhoto, designation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-transparent w-full md:w-1/3 mx-auto flex flex-col justify-center items-center space-x-4 rounded-lg overflow-hidden">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        <div className="flex justify-center items-center h-52 w-52">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base mb-2">{name}</p>
          <div className="font-bold text-xl ">{designation}</div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto rounded-full bg-blue-100 sm:mx-0 sm:h-20 sm:w-20">
                    <img src={profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <strong>Role: </strong>{designation}<br />
                        <strong>Address: </strong>{address}, {city}, {state}, {country}, {zipCode}<br />
                        <strong>Email: </strong>{email}<br />
                        <strong>Phone: </strong>{phone}<br />
                        <strong>Gender: </strong>{gender}<br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => setIsOpen(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileCard