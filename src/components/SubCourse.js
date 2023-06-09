import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentAttendance from "./StudentAttendance";

export default function SubCourse() {
  const [qr, setqr] = useState("");
  const [Attendance, setAttendance] = useState(null);
  const params = useParams();
  function downloadQR(qrCodeUrl) {
    // Create a new anchor element to download the image
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr-code.png";
    link.click();
  }
  useEffect(() => {
    const fetchDetails = async () => {
      if (params.id) {
        const resp = await axios
          .get(
            "http://65.2.30.68:8000/getsubCoursesById?subcourses_id=" +
              params.id
          )
          .then(async (res) => {
            const respQr = await axios
              .get(
                `http://65.2.30.68:8000/instituteQr?institute_id=${res.data.data[0].InstituteId}&subcourses_id=${params.id}`
              )
              .then((res) => res.data.data);
            const respAttendance = await axios
              .get(
                `http://65.2.30.68:8000/getAttendanceSubCourses?subcourses_id=${params.id}&InstituteId=${res.data.data[0].InstituteId}`
              )
              .then((res) => res.data.data);
            setAttendance(respAttendance);
            console.log("resQr", respAttendance);
            setqr(respQr);
            return res.data.data;
          });
        console.log("resp", resp);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
      <div class="p-10 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
        <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg ">
          <div class="font-bold text-3xl mb-2">Module Details</div>
          <p class="text-gray-700 text-base">
            Within our courses, we have implemented a modular approach to
            learning. Each course is divided into distinct modules, designed to
            offer a systematic and organized progression of knowledge and
            skills. These modules serve as building blocks, covering specific
            topics and learning objectives, allowing students to navigate
            through the course content in a structured manner.
          </p>
          <div class="flex flex-col items-center justify-center m-10 space-y-10 md:space-y-0 md:flex-row md:space-x-20">
            <img src={qr} alt="QR Code" />
            {localStorage.getItem("role") === "principal" && (
              <button onClick={() => downloadQR(qr)}>Download QR Code</button>
            )}
          </div>
        </div>
      </div>
      {Attendance && Attendance.length > 0 && (
        <StudentAttendance data={Attendance} />
      )}
    </div>
  );
}
