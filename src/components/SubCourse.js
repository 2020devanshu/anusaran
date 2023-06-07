import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
                `http://65.2.30.68:8000/getAttendanceSubCourses?subcourses_id=${1}&InstituteId=${2}`
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
          <div >
            <div class="font-bold text-3xl mb-2">Attendance Details</div>
            <table className="min-w-full divide-y divide-black-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Is Present?
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black-200">
                {Attendance &&
                  Attendance.length > 0 &&
                  Attendance.map((x) => {
                    return (
                      <tr>
                        <td className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {x.name}
                        </td>
                        <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                          {x.date}
                        </td>
                        <td className="whitespace-nowrap text-left px-3 py-4 text-sm text-gray-500">
                          {x.isPresent ? "Yes" : "No"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
