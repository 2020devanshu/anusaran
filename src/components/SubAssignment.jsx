import React, { useEffect, useState } from "react";
import FloatingButton from "./FloatingButton";
import { useAppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SubAssignmentCard from "./SubAssignmentCard";
import axios from "axios";
export default function SubAssignment() {
  const navigate = useNavigate();
  const params = useParams();
  const { handleClose, close, handleOpen, handleLogout } = useAppContext();
  const [subassignment, setsubassignment] = useState(null);
  const [assignment, setassignment] = useState(null);

  const addAssignment = () => {
    navigate("/assignment-creation");
  };
  useEffect(() => {
    const fetchAssignment = async () => {
      const resp = await axios
        .get("http://151.106.39.4:8080/courseAssignment")
        .then((res) => {
          return res.data.data;
        });
      console.log("resp", resp);
      if (localStorage.getItem("role") === "principal") {
        let newArr = resp.filter((x) => x.id === parseInt(params.id));
        setassignment(newArr);
      } else {
        let newArr = resp.filter((x) => x.id === parseInt(params.id));
        console.log("newArr", newArr);
        setassignment(newArr);
      }
    };
    const fetchSubAssignment = async () => {};
    fetchAssignment();
    fetchSubAssignment();
  }, []);
  const handleSubName = (e, id) => {
    navigate("/subassignmentdetails/" + id);
    console.log("e", e, id);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col  bg-white px-6 lg:px-8 ">
      {localStorage.getItem("role") === "principal" && (
        <FloatingButton onClick={() => addAssignment()}>
          Add Assignments
        </FloatingButton>
      )}

      <div className="navbar flex justify-between w-full">
        <div className="navleftitemflex flex flex-row items-center gap-5 w-1/2 p-10">
          <div>
            <h1 className="text-4xl cursor-pointer">Assignment</h1>
          </div>
        </div>
        <div className="navitemright flex flex-col items-center gap-5 w-1/2 p-10">
          <div className=" flex items-center justify-end w-full gap-5">
            <div>
              <img
                src={localStorage.getItem("profilePic")}
                className="w-8 h-8"
              />
            </div>
            <div onClick={handleOpen}>
              <p>
                {localStorage.getItem("role") === "principal"
                  ? "Principal"
                  : "Admin"}
              </p>
            </div>
            <div onClick={handleLogout} className="cursor-pointer">
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
      </div>

      <div class="border-b-2 border-black mb-2"></div>
      <div className="flex text-2xl ml-4 font-bold">
        <svg
          className="mr-4"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.3837 34.75H12.6163C3.77674 34.75 0 31.0002 0 22.2238V12.5262C0 3.74977 3.77674 0 12.6163 0H22.3837C31.2233 0 35 3.74977 35 12.5262V22.2238C35 31.0002 31.2233 34.75 22.3837 34.75ZM12.6163 2.42442C5.11163 2.42442 2.44186 5.07512 2.44186 12.5262V22.2238C2.44186 29.6749 5.11163 32.3256 12.6163 32.3256H22.3837C29.8884 32.3256 32.5581 29.6749 32.5581 22.2238V12.5262C32.5581 5.07512 29.8884 2.42442 22.3837 2.42442H12.6163Z"
            fill="#1C1C1C"
          />
          <path
            d="M12.0963 22.7562C11.4126 22.7562 10.7777 22.5946 10.2242 22.2875C8.87302 21.5278 8.14046 20.0247 8.14046 18.0528V1.92241C8.14046 1.25974 8.69395 0.710205 9.36139 0.710205C10.0288 0.710205 10.5823 1.25974 10.5823 1.92241V18.0528C10.5823 19.1034 10.8916 19.8792 11.4288 20.1701C11.9986 20.4934 12.8777 20.3318 13.8381 19.7661L15.987 18.4892C16.866 17.972 18.1195 17.972 18.9986 18.4892L21.1474 19.7661C22.1242 20.3479 23.0033 20.4934 23.5567 20.1701C24.094 19.863 24.4033 19.0872 24.4033 18.0528V1.92241C24.4033 1.25974 24.9567 0.710205 25.6242 0.710205C26.2916 0.710205 26.8451 1.25974 26.8451 1.92241V18.0528C26.8451 20.0247 26.1126 21.5278 24.7614 22.2875C23.4102 23.0471 21.6358 22.8855 19.894 21.8511L17.7451 20.5742C17.6474 20.5096 17.3381 20.5096 17.2405 20.5742L15.0916 21.8511C14.0823 22.4491 13.0405 22.7562 12.0963 22.7562Z"
            fill="#1C1C1C"
          />
          <path
            d="M22.3837 34.75H12.6163C3.77674 34.75 0 31.0002 0 22.2238V12.5262C0 3.74977 3.77674 0 12.6163 0H22.3837C31.2233 0 35 3.74977 35 12.5262V22.2238C35 31.0002 31.2233 34.75 22.3837 34.75ZM12.6163 2.42442C5.11163 2.42442 2.44186 5.07512 2.44186 12.5262V22.2238C2.44186 29.6749 5.11163 32.3256 12.6163 32.3256H22.3837C29.8884 32.3256 32.5581 29.6749 32.5581 22.2238V12.5262C32.5581 5.07512 29.8884 2.42442 22.3837 2.42442H12.6163Z"
            fill="#1C1C1C"
          />
          <path
            d="M12.0963 22.7562C11.4126 22.7562 10.7777 22.5946 10.2242 22.2875C8.87302 21.5278 8.14046 20.0247 8.14046 18.0528V1.92241C8.14046 1.25974 8.69395 0.710205 9.36139 0.710205C10.0288 0.710205 10.5823 1.25974 10.5823 1.92241V18.0528C10.5823 19.1034 10.8916 19.8792 11.4288 20.1701C11.9986 20.4934 12.8777 20.3318 13.8381 19.7661L15.987 18.4892C16.866 17.972 18.1195 17.972 18.9986 18.4892L21.1474 19.7661C22.1242 20.3479 23.0033 20.4934 23.5567 20.1701C24.094 19.863 24.4033 19.0872 24.4033 18.0528V1.92241C24.4033 1.25974 24.9567 0.710205 25.6242 0.710205C26.2916 0.710205 26.8451 1.25974 26.8451 1.92241V18.0528C26.8451 20.0247 26.1126 21.5278 24.7614 22.2875C23.4102 23.0471 21.6358 22.8855 19.894 21.8511L17.7451 20.5742C17.6474 20.5096 17.3381 20.5096 17.2405 20.5742L15.0916 21.8511C14.0823 22.4491 13.0405 22.7562 12.0963 22.7562Z"
            fill="#1C1C1C"
          />
        </svg>

        {assignment && assignment.length > 0 && assignment[0].assignmentsName}
      </div>
      <div className="flex mt-8  text-xl justify-around w-1/2">
        <p>
          Total Assignments:{" "}
          <span className="font-bold text-2xl">
            {subassignment && subassignment.length}
          </span>
        </p>
        <p>
          Average Marks:
          <span className="font-bold text-2xl">
            {" "}
            {subassignment && subassignment.length}
          </span>
        </p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {subassignment &&
          subassignment.length > 0 &&
          subassignment.map((x) => {
            return (
              <SubAssignmentCard
                key={x.id}
                assignmentName={x.assignmentsName}
                score={"29/30"}
                submissionDate={x.lastDate}
                id={x.id}
                handleSubNameClick={handleSubName}
              />
            );
          })}
      </div>
    </div>
  );
}
