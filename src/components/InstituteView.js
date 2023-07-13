import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { useAppContext } from "../components/AppContext";

export default function InstituteView() {
  const { handleClose, close, handleOpen } = useAppContext();
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
    <div className="flex flex-col justify-center bg-white md:p-14 px-10 items-center">
      <div className="navbar flex justify-between w-full">
        <div className="navleftitem ">
          <div className="mt-10 md:mt-0 flex justify-center items-center mb-4">
            <h1 className=" font-bold md:text-2xl ">
              Welcome, <span>Admin</span>
            </h1>
          </div>
        </div>
        <div className="navitemright flex items-center gap-5 invisible md:visible md:flex">
          <div>
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21" cy="21" r="21" fill="#D9D9D9" />
            </svg>
          </div>
          <div onClick={handleOpen}>
            <p>Admin</p>
          </div>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8307 17.7C16.5804 17.4111 16.4552 17.0833 16.4552 16.7167C16.4552 16.35 16.5804 16.0444 16.8307 15.8L19.357 13.3333H9.55903C9.17212 13.3333 8.8478 13.2056 8.58606 12.95C8.32432 12.6944 8.19346 12.3778 8.19346 12C8.19346 11.6222 8.32432 11.3056 8.58606 11.05C8.8478 10.7944 9.17212 10.6667 9.55903 10.6667H19.357L16.8307 8.2C16.5576 7.93333 16.4211 7.61667 16.4211 7.25C16.4211 6.88333 16.5576 6.56667 16.8307 6.3C17.0811 6.03333 17.394 5.9 17.7696 5.9C18.1451 5.9 18.458 6.02222 18.7084 6.26667L23.6245 11.0667C23.761 11.2 23.8578 11.3444 23.9147 11.5C23.9715 11.6556 24 11.8222 24 12C24 12.1778 23.9715 12.3444 23.9147 12.5C23.8578 12.6556 23.761 12.8 23.6245 12.9333L18.7084 17.7333C18.4125 18.0222 18.0882 18.15 17.7354 18.1167C17.3826 18.0833 17.0811 17.9444 16.8307 17.7ZM2.73115 24C1.98009 24 1.33713 23.7389 0.802276 23.2167C0.267425 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.267425 1.30556 0.802276 0.783333C1.33713 0.261111 1.98009 0 2.73115 0H10.9246C11.3115 0 11.6358 0.127778 11.8976 0.383333C12.1593 0.638889 12.2902 0.955556 12.2902 1.33333C12.2902 1.71111 12.1593 2.02778 11.8976 2.28333C11.6358 2.53889 11.3115 2.66667 10.9246 2.66667H2.73115V21.3333H10.9246C11.3115 21.3333 11.6358 21.4611 11.8976 21.7167C12.1593 21.9722 12.2902 22.2889 12.2902 22.6667C12.2902 23.0444 12.1593 23.3611 11.8976 23.6167C11.6358 23.8722 11.3115 24 10.9246 24H2.73115Z"
                fill="#1C1C1C"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="workContainer mb-4 w-full">
        <div>
          <h1 className="text-2xl  font-bold md:text-6xl mb-2">All Institute Details</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>

        <div className="mainbox w-full md:mt-8 flex gap-12 flex-wrap justify-center">
          <div className="flex flex-wrap mt-10 gap-5 justify-center">
            {institutes.map((institute) => (
              <div
                key={institute.institute_id}
                onClick={() => handleClick(institute)}
                className="card instcontent w-80 h-96 flex  flex-col items-center justify-center rounded-md"
              >
                <div className="border-b-2 border-black pb-6">
                  <img
                    src={institute.InstituteLogo}
                    className="w-48 h-48 object-cover"
                  />
                </div>

                <div>
                  <div>
                    <p className="font-bold text-xl  mt-4 ml-4">
                      {institute.InstituteName}
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <p className="  font-light text-black">
                        Created at:{" "}
                        {new Date(institute.createdAt).toLocaleDateString()}
                      </p>
                      <p className="  font-light text-black">
                        Updated at:{" "}
                        {new Date(institute.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        x="50"
                        y="50"
                        width="50"
                        height="50"
                        transform="rotate(-180 50 50)"
                        fill="url(#pattern0)"
                      />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_2_446"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_2_446"
                          width="90"
                          height="90"
                          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/0lEQVR4nO3cO05DQQyF4b8i7IDnfhAFO+FRAhvkUQFLQSCRqYxGugUFryLjsZ1zJEspUmS+OL43iWZAURRFURRFURRFURRF6dkFroBH4B2wovUOPACXwMr7rT8GXgIgmHM9L2t36+RtRLYv2C6dfRVgsTa5LjygHwMs1CbXvQf0W4CF2uTqBsMze5EWpASNoJndhepo5sNpdDAfVTMaQbt11hq4BvaX6o+bOpqNI59+c591I2g2hty79uyHm9k9QTMcuedQ0AwbF19zK2iGI58uzxt9ES77Fbz9MS56ToAPp9dTEroFQy4J3QIil4NuQZFLQbfAyGWgW3DkEtAtAXJ66JYEOTV0S4ScFrolQ04J3RIip4NuSZFTQa8D/UBUGvo6MXIq6P2E40LQCPrHjuh/oP4WjY4Ndc9aF0OfGW26vfODtsTYwzPiRbeE2CmhLSF2WmhLhp0a2hJhp4e2JNgloC0BdhloC45dCtoCY5eDtqDYJaEtIHZZaAv2Q1RpaPsntvaw4DNGtIcFH2ztYcFnjGgPC2Nmdp/JB0v1x9rQSZ0antkLtCAlaATN7C5URzMfTqODLZ3ROo4NXj2gdcAgPgcMXgb42NrkOveAXi0HodqW1hOwg1OOtxT7CTjCOavl1Nn74hfIN+BuGRdunawoiqIoiqIoiqIoikLgfAKNEIswhq0xfAAAAABJRU5ErkJggg=="
                        />
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
