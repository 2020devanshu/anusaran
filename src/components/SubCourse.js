import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentAttendance from "./StudentAttendance";

export default function SubCourse() {
  const [video, setvideo] = useState(null);
  const [name, setname] = useState("");
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
    console.log("params", params);
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

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("e.target.files", e.target.files);

      // // Converting to a base64 string
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setImageSrc(e.target.result);
      // };
      // // reader.readAsDataURL(imgFile);
      console.log("setvideo", URL.createObjectURL(e.target.files[0]));

      // Alternatively, you can use the file object directly
      setvideo(e.target.files[0]);
    }
  };
  const uploadVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    const response = await axios.post(
      "http://3.110.216.199:8000/uploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response of video", response.data.data[0]);

    // const fileUrl = response.data.url[0];
    const resp = await axios
      .get(
        "http://65.2.30.68:8000/getsubCoursesById?subcourses_id=" + params.id
      )
      .then(async (res) => {
        const res2 = await axios
          .post("http://3.110.216.199:8000/insertVideo", {
            videoName: name,
            instituteId: res.data.data[0].InstituteId,
            courseId: parseInt(res.data.data[0].courseId),
            subCourseId: parseInt(res.data.data[0].subCourseId),
            videosPaths: response.data.data[0],
          })
          .then((res) => {
            console.log("succ", res);
            // localStorage.setItem("token", res.data.token);
            // navigate("/institute-list");
          })
          .catch((err) => {
            console.log("error is here", err);
            // notify();
          });
        console.log("res2", res2);
      })
      .catch((err) => console.log("err in here", err));
  };

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
      <div class="p-5 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
        <h1 className="text-2xl font-bold">Upload course related videos</h1>
        {video && (
          <>
            <input
              type="text"
              onChange={(e) => setname(e.target.value)}
            ></input>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <div onClick={uploadVideo}>Upload Video</div>
            </button>
          </>
        )}
      </div>
      <div className="mt-2">
        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={handleVideoUpload}
          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {/* <input
                  id="logo"
                  name="logo"
                  type="image"
                  alt="#"
                  required
                  onChange={handleInput}
                /> */}
      </div>
      {Attendance && Attendance.length > 0 && (
        <StudentAttendance data={Attendance} />
      )}
    </div>
  );
}
