import React from "react";
import { useState, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import Principal from "../components/Principal";
import Institute from "../components/Institute";
import { Link, useNavigate } from "react-router-dom/dist";
import { Navigate } from "react-router-dom/dist";
import HamburgerMenu from "./HambergerMenu";
import mainLogo from "../mainLogo.jpg";
import { useAppContext } from "./AppContext";
export default function NavBar({}) {
  const { handleClose, close, handleOpen } = useAppContext();
  const [role, setrole] = useState(localStorage.getItem("role"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/");
    window.location.reload(true);
  };
  const navbarRef = useRef(null);
  // useEffect(() => {
  //   // Close Navbar when clicking outside the navbar element
  //   if (!close) {
  //     function handleClickOutside(event) {
  //       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
  //         handleClose();
  //       }
  //     }

  //     document.addEventListener("click", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }
  // }, []);

  const navigate = useNavigate();
  return (
    <div>
      {localStorage.getItem("role") === "admin" ? (
        <div
          className={`${
            close ? "hidden " : "block "
          } h-screen sticky top-0 bottom-0 lg:left-0 p-2 w-[350px] md:w-[300px] text-center `}
          style={{ backgroundColor: "#F8F6FF" }}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <div className="rounded-md">
                <img src={mainLogo} alt="Logo" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <div className="flex justify-center ">
              <Link
                onClick={handleClose}
                to={"/"}
                className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer text-center navItem w-3/5"
              >
                <i className=" text-sm"></i>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8V4C13 3.71667 13.0958 3.47917 13.2875 3.2875C13.4792 3.09583 13.7167 3 14 3H20C20.2833 3 20.5208 3.09583 20.7125 3.2875C20.9042 3.47917 21 3.71667 21 4V8C21 8.28333 20.9042 8.52083 20.7125 8.7125C20.5208 8.90417 20.2833 9 20 9H14C13.7167 9 13.4792 8.90417 13.2875 8.7125C13.0958 8.52083 13 8.28333 13 8ZM3 12V4C3 3.71667 3.09583 3.47917 3.2875 3.2875C3.47917 3.09583 3.71667 3 4 3H10C10.2833 3 10.5208 3.09583 10.7125 3.2875C10.9042 3.47917 11 3.71667 11 4V12C11 12.2833 10.9042 12.5208 10.7125 12.7125C10.5208 12.9042 10.2833 13 10 13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12ZM13 20V12C13 11.7167 13.0958 11.4792 13.2875 11.2875C13.4792 11.0958 13.7167 11 14 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12V20C21 20.2833 20.9042 20.5208 20.7125 20.7125C20.5208 20.9042 20.2833 21 20 21H14C13.7167 21 13.4792 20.9042 13.2875 20.7125C13.0958 20.5208 13 20.2833 13 20ZM3 20V16C3 15.7167 3.09583 15.4792 3.2875 15.2875C3.47917 15.0958 3.71667 15 4 15H10C10.2833 15 10.5208 15.0958 10.7125 15.2875C10.9042 15.4792 11 15.7167 11 16V20C11 20.2833 10.9042 20.5208 10.7125 20.7125C10.5208 20.9042 10.2833 21 10 21H4C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z"
                    fill="#7455F6"
                  />
                </svg>
                <span className=" ml-4 text-black-100 font-bold text-sm">
                  Home
                </span>
              </Link>
            </div>
            <div className="flex justify-center ">
              <Link
                onClick={handleClose}
                to={"/institute-list"}
                className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer  text-center navItem w-3/5"
              >
                <i className=" text-sm"></i>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 21C3.45 21 2.97917 20.8042 2.5875 20.4125C2.19583 20.0208 2 19.55 2 19V8C2 7.45 2.19583 6.97917 2.5875 6.5875C2.97917 6.19583 3.45 6 4 6H8V4C8 3.45 8.19583 2.97917 8.5875 2.5875C8.97917 2.19583 9.45 2 10 2H14C14.55 2 15.0208 2.19583 15.4125 2.5875C15.8042 2.97917 16 3.45 16 4V6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V19C22 19.55 21.8042 20.0208 21.4125 20.4125C21.0208 20.8042 20.55 21 20 21H4ZM4 19H20V8H4V19ZM10 6H14V4H10V6Z"
                    fill="#1C1C1C"
                  />
                </svg>

                <span className=" ml-4 text-black-100 font-bold text-sm">
                  Institute
                </span>
              </Link>
            </div>
            <div className="flex justify-center ">
              <Link
                onClick={handleClose}
                to={"institute-creation"}
                className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer navItem w-3/5 text-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.625 16.025C14.8083 16.2083 15.0333 16.3 15.3 16.3C15.5667 16.3 15.8 16.2 16 16C16.1833 15.8167 16.275 15.5833 16.275 15.3C16.275 15.0167 16.1833 14.7833 16 14.6L13 11.6V7.975C13 7.69167 12.9042 7.45833 12.7125 7.275C12.5208 7.09167 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8V11.975C11 12.1083 11.025 12.2375 11.075 12.3625C11.125 12.4875 11.2 12.6 11.3 12.7L14.625 16.025ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z"
                    fill="#1C1C1C"
                  />
                </svg>

                <i className=" text-sm"></i>
                <span className="ml-4 text-black-100 font-bold whitespace-nowrap text-sm">
                  Create Institute
                </span>
              </Link>
            </div>
            <div className="flex justify-center ">
              <div
                onClick={handleLogout}
                className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer navItem w-3/5 text-center"
              >
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

                <i className=" text-sm"></i>
                <span className="text-sm ml-4 text-black-100 font-bold">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: "#F8F6FF" }}>
          <span
            className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
            onClick={handleClose}
          >
            <i className="rounded-md text-black">
              <GiHamburgerMenu className="px-2 border rounded-md" size={"50"} />
            </i>
          </span>
          <div
            className={`${
              close ? "hidden " : "block "
            } fixed top-0 bottom-0 lg:left-0 p-2 w-[400px] md:w-[300px] text-center bg-gray-900`}
          >
            <div className="text-gray-100 text-xl">
              <div className="p-2.5 mt-1 flex items-center">
                <i className="px-2 py-1 rounded-md bg-blue-600">
                  <img
                    src={mainLogo}
                    alt="Logo"
                    className="mx-auto h-10 w-auto border-4"
                  />
                </i>
                <h1 className="font-bold text-gray-200 text-xl pl-5">
                  {role === "admin" ? "Admin" : "Principal"} Dashboard
                </h1>
                <i className="cursor-pointer ml-24 " onClick={handleClose}>
                  <GrClose className="bg-white" size={"25"} />
                </i>
              </div>
              <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            <Link
              onClick={handleClose}
              to={"/"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">Home</span>
            </Link>

            <Link
              onClick={handleClose}
              to={"/course-creation"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Create Course
              </span>
            </Link>
            <Link
              onClick={handleClose}
              to={"student-creation"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Create Students
              </span>
            </Link>
            <Link
              onClick={handleClose}
              to={"teacher-creation"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Create Teacher
              </span>
            </Link>
            <Link
              onClick={handleClose}
              to={"dept-creation"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Create Department
              </span>
            </Link>
            <Link
              onClick={handleClose}
              to={"feedback"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Feedback
              </span>
            </Link>
            <div
              onClick={handleLogout}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
