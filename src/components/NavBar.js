import React from "react";
import { useState, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import Principal from "../components/Principal";
import Institute from "../components/Institute";
import { Link, useNavigate } from "react-router-dom/dist";
import { Navigate } from "react-router-dom/dist";
import mainLogo from "../mainLogo.jpg";
export default function NavBar({}) {
  const [close, setClose] = useState(false);
  function handleClose() {
    console.log("close", close);
    setClose(!close);
  }
  const [role, setrole] = useState(localStorage.getItem("role"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/");
    window.location.reload(true);
  };
  const navbarRef = useRef(null);
  useEffect(() => {
    // Close Navbar when clicking outside the navbar element
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div ref={navbarRef}>
      {localStorage.getItem("role") === "admin" ? (
        <>
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
            } fixed top-0 bottom-0 lg:left-0 p-2 w-[350px] md:w-[300px] text-center bg-gray-900`}
          >
            <div className="text-gray-100 text-xl">
              <div className="p-2.5 mt-1 flex items-center">
                <div className="rounded-md">
                  <img src={mainLogo} alt="Logo" className="w-4/5" />
                </div>
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
              to={"/institute-list"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Institute
              </span>
            </Link>
            <Link
              onClick={handleClose}
              to={"institute-creation"}
              className="p-2.5 flex mt-3 items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-center"
            >
              <i className=" text-sm"></i>
              <span className="text-xl ml-4 text-gray-200 font-bold">
                Create Institute
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
