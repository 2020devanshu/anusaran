import { useState, useEffect } from "react";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import Teacher from "../components/Teacher";
import Student from "../components/Student";
import Courses from "../components/Courses";
import SubCourse from "../components/SubCourse";
import { useNavigate } from "react-router-dom/dist";

export default function PrincipalDashboard() {
  const [close, setClose] = useState(false);
  function closeSideBar() {
    setClose(!close);
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
    window.location.reload(true);
  };
  return (
    <div>
      <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
        <div className="p-5 mt-10 md:mt-0 shadow-xl w-60 shadow-blue-300 border-4 rounded-lg">
          <h1 className="text-center font-bold text-2xl">👋 Institutional Admin </h1>
        </div>
        <div className="p-2 bg-slate-300">
          <div class="p-5 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2">👩‍🏫 Teachers</div>
              <p class="text-gray-700 text-base">
              Our institutional panel goes beyond administrative functions and also enables you to effortlessly create and manage teacher profiles. With a few simple steps, you can onboard teachers into the system, allowing them access to relevant features and resources. Provide necessary details such as name, contact information, qualifications, and areas of expertise, ensuring a comprehensive database of your teaching staff..
              </p>
            </div>
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2"> 👩 Students</div>
              <p class="text-gray-700 text-base">
              In addition to managing teachers, our institutional panel facilitates the seamless creation of student profiles. You can easily add students to the system, capturing essential information such as name, contact details, enrollment status, and program of study. By maintaining a comprehensive student database, you can efficiently monitor student progress, track academic performance, and provide timely support when needed.
              </p>
            </div>
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2">📚 Courses</div>
              <p class="text-gray-700 text-base">
              Our panel simplifies the process of adding and managing courses within your institution. You can effortlessly input course details, including course name, code, description, and prerequisites. The system also allows you to assign instructors, set course schedules, and track enrollment statistics, giving you complete control over your institute's course offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className=" bg-gray-600 h-[1px]"></div>
      <Teacher />
      <div className=" bg-gray-600 h-[1px]"></div>
      <Student />
      <div className=" bg-gray-600 h-[1px]"></div>
      <Courses />
      <div className=" bg-gray-600 h-[1px]"></div>
      <div className=" bg-gray-600 h-[1px]"></div>
      <div className="p-5 bg-slate-500"></div> */}
    </div>
  );
}
