import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentAttendance from "./StudentAttendance";
import DateTimePicker from "react-datetime-picker";
import VideoCard from "./VideoCard";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useAppContext } from "./AppContext";
import FloatingButton from "./FloatingButton";
import { useNavigate } from "react-router-dom";

export default function SubCourse() {
  const { handleClose, close, handleOpen } = useAppContext();
  const navigate = useNavigate();

  const [numnderAttemdamce, setnumnderAttemdamce] = useState(null);
  const [video, setvideo] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [name, setname] = useState("");
  const [assName, setassName] = useState("");
  const [qr, setqr] = useState("");
  const [Attendance, setAttendance] = useState(null);
  const params = useParams();
  const [assignmentDueDate, setAssignmentDueDate] = useState(new Date());

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
            "http://151.106.39.4:8080/getsubCoursesById?subcourses_id=" +
            params.id
          )
          .then(async (res) => {
            const respQr = await axios
              .get(
                `http://151.106.39.4:8080/instituteQr?institute_id=${res.data.data[0].InstituteId}&subcourses_id=${params.id}`
              )
              .then((res) => res.data.data);
            const respAttendance = await axios
              .get(
                `http://151.106.39.4:8080/getAttendanceSubCourses?subcourses_id=${params.id}&InstituteId=${res.data.data[0].InstituteId}`
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
  const handlePDFUpload = (e) => {
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
      setAssignment(e.target.files[0]);
    }
  };
  const uploadVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", video);
    const response = await axios.post(
      "http://151.106.39.4:8080/uploadFile",
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
        "http://151.106.39.4:8080/getsubCoursesById?subcourses_id=" + params.id
      )
      .then(async (res) => {
        const res2 = await axios
          .post("http://151.106.39.4:8080/insertVideo", {
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
  const uploadMinAttendance = async (e) => {
    e.preventDefault();
    const resp = await axios
      .get(
        "http://151.106.39.4:8080/getsubCoursesById?subcourses_id=" + params.id
      )
      .then(async (res) => {
        const response = await axios
          .post("http://151.106.39.4:8080/insertSetAttendance  ", {
            minAttendance: parseInt(numnderAttemdamce),
            institutionId: res.data.data[0].InstituteId,
            courseId: parseInt(res.data.data[0].courseId),
            subCourseId: parseInt(params.id),
          })
          .then((result) => console.log("result", result));
      })
      .catch((err) => console.log("err in here", err));
  };
  const uploadAssignment = async (e) => {
    e.preventDefault();
    let date = new Date(assignmentDueDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Ensure hours and minutes are two digits
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    let time24hrStart = `${hours}:${minutes}`;
    const formData = new FormData();
    formData.append("file", assignment);
    const response = await axios.post(
      "http://151.106.39.4:8080/uploadFile",
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
        "http://151.106.39.4:8080/getsubCoursesById?subcourses_id=" + params.id
      )
      .then(async (res) => {
        const res2 = await axios
          .post("http://151.106.39.4:8080/inserAssignment", {
            assignmentsName: assName,
            instituteId: res.data.data[0].InstituteId,
            courseId: parseInt(res.data.data[0].courseId),
            subCourseId: parseInt(res.data.data[0].subCourseId),
            lastDate: date,
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
    <>
      <div className="flex min-h-full flex-1 flex-col bg-white px-6 lg:px-8 ">
        <div className="navbar flex justify-between w-full">
          <div className="navleftitem flex justify-center flex-col "></div>
          <div className="navitemright flex flex-col items-center gap-5 w-1/2 px-10 pt-10">
            <div className=" flex items-center justify-end w-full gap-5">
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
        </div>
        <div className="workContainer mb-4 w-full">
          <div>
            <h1 className="text-6xl mb-2">AiMl</h1>
          </div>
        </div>
        <div>
          <VideoCard
            videoUrl="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
            title="Big Buck Bunny"
          />
        </div>
      </div>
      <FloatingButton onClick={() => navigate("/addvideo")}>Add Videos</FloatingButton>
    </>
  );

  // return (
  //   <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
  //     {" "}
  //     {localStorage.getItem("role") === "admin" && (
  //       <>
  //         <input
  //           type="number"
  //           onChange={(e) => setnumnderAttemdamce(e.target.value)}
  //         />
  //         <button onClick={uploadMinAttendance}>Submit</button>
  //       </>
  //     )}
  //     <div class="p-10 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
  //       <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg ">
  //         <div class="font-bold text-3xl mb-2">Module Details</div>
  //         <p class="text-gray-700 text-base">
  //           Within our courses, we have implemented a modular approach to
  //           learning. Each course is divided into distinct modules, designed to
  //           offer a systematic and organized progression of knowledge and
  //           skills. These modules serve as building blocks, covering specific
  //           topics and learning objectives, allowing students to navigate
  //           through the course content in a structured manner.
  //         </p>
  //         <div class="flex flex-col items-center justify-center m-10 space-y-10 md:space-y-0 md:flex-row md:space-x-20">
  //           <img src={qr} alt="QR Code" />
  //           {localStorage.getItem("role") === "principal" && (
  //             <button onClick={() => downloadQR(qr)}>Download QR Code</button>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //     {localStorage.getItem("role") === "admin" && (
  //       <>
  //         <div class="p-5 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
  //           <h1 className="text-2xl font-bold">Upload course related videos</h1>
  //           {video && (
  //             <>
  //               <input
  //                 type="text"
  //                 onChange={(e) => setname(e.target.value)}
  //               ></input>
  //               <button className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
  //                 <div onClick={uploadVideo}>Upload Video</div>
  //               </button>
  //             </>
  //           )}
  //         </div>
  //         <div className="mt-2">
  //           <input
  //             type="file"
  //             accept="video/mp4,video/x-m4v,video/*"
  //             onChange={handleVideoUpload}
  //             className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  //           />
  //           {/* <input
  //                 id="logo"
  //                 name="logo"
  //                 type="image"
  //                 alt="#"
  //                 required
  //                 onChange={handleInput}
  //               /> */}
  //         </div>
  //       </>
  //     )}
  //     {localStorage.getItem("role") === "principal" && (
  //       <>
  //         <div class="p-5 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
  //           <h1 className="text-2xl font-bold">
  //             Upload course related Assignment
  //           </h1>
  //           {assignment && (
  //             <>
  //               <input
  //                 type="text"
  //                 onChange={(e) => setassName(e.target.value)}
  //               ></input>
  //               <input
  //                 type="date"
  //                 value={assignmentDueDate}
  //                 onChange={(x) => setAssignmentDueDate(x.target.value)}
  //               />
  //               <button
  //                 onClick={uploadAssignment}
  //                 className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  //               >
  //                 <div>Uploads Assignment</div>
  //               </button>
  //             </>
  //           )}
  //         </div>
  //         <div className="mt-2">
  //           <input
  //             type="file"
  //             accept="pdf"
  //             onChange={handlePDFUpload}
  //             className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  //           />
  //           {/* <input
  //                 id="logo"
  //                 name="logo"
  //                 type="image"
  //                 alt="#"
  //                 required
  //                 onChange={handleInput}
  //               /> */}
  //         </div>
  //       </>
  //     )}
  //     {Attendance && Attendance.length > 0 && (
  //       <StudentAttendance data={Attendance} />
  //     )}
  //   </div>
  // );
}
