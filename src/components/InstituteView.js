import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
export default function InstituteView() {
  const [imgUrl, setimgUrl] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://65.2.30.68:8000/getAllInstitute"
        );
        setInstitutes(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (institute) => {
    navigate("institute/" + institute.institute_id);
    console.log("Clicked institute:", institute);
  };

  return (
    <div className="flex flex-col justify-center bg-slate-300 items-center">
      <div className="p-5 mt-10 shadow-xl w-60 shadow-blue-300 border-4 rounded-lg">
          <h1 className="text-center font-bold text-2xl">Institute Details</h1>
        </div>
      <div className="flex flex-wrap mt-10 gap-5 justify-center">
        {institutes.map((institute) => (
          <div
            key={institute.institute_id}
            className="bg-blue-100 border-2 border-blue-300 m-2 p-4 rounded-md space-y-5 text-center shadow-md max-w-md cursor-pointer hover:bg-blue-200"
            onClick={() => handleClick(institute)}
          >
            <h2 className="font-bold text-xl mb-2">{institute.InstituteName}</h2>
            <img
              src={institute.InstituteLogo}
              alt={`Logo of ${institute.InstituteLogo}`}
              className="w-3/4 m-auto"
            />
            <p>
              Created at: {new Date(institute.createdAt).toLocaleDateString()}
            </p>
            <p>
              Updated at: {new Date(institute.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
