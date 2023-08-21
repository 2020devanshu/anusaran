import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { useAppContext } from "./AppContext";

export default function CourseDesc() {
  const { handleClose, close, handleOpen } = useAppContext();

  const [courseData, setcourseData] = useState(null)
  const [myData, setData] = useState([]);
  const [name, setname] = useState("");
  const [qr, setqr] = useState("");
  const [subCourse, setsubCourse] = useState([]);
  const [video, setvideo] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const handleClickAdd = () => {
    navigate("/create-subcourse/" + params.id);
  };
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
      .get(`http://151.106.39.4:8080/getCoursesById?course_id=${params.id}`)
      .then(async (res) => {
        axios
          .post("http://151.106.39.4:8080/insertVideo", {
            videoName: name,
            instituteId: res.data.data.Institute,
            courseId: params.id,
            videosPaths: response.data.data[0],
          })
          .then((res) => {
            console.log("succ", res);
            // localStorage.setItem("token", res.data.token);
            // navigate("/institute-list");
          })
          .catch((err) => {
            console.log("error is here");
            // notify();
          });
      });
  };

  useEffect(() => {
    const qrGen = async () => {
      const resp = await axios.get(
        `http://151.106.39.4:8080/generateQR?user_id=1`
      );
      setqr(resp.data.data);
      const newS = qr.replace(/\n/g, "").replace(/ /g, "").trim();
      setqr(newS);

      console.log("resp new", resp.data.data);
    };
    const fge = async () => {
      const resp = await axios
        .get(`http://151.106.39.4:8080/getCoursesById?course_id=${params.id}`)
        .then(async (res) => {
          setcourseData(res.data.data[0])
          console.log("ress", res.data.data);
          if (res.data.data[0].Institute) {
            const resp2 = await axios
              .get(
                `http://151.106.39.4:8080/getsubCourses?InstituteId=${res.data.data[0].Institute}`
              )
              .then((res2) => {
                return res2.data.data;
              });
            const newArr = resp2.filter(
              (x) => x.courseId === res.data.data[0].course_id
            );
            setsubCourse(newArr);
            console.log("subcourses", resp2);
          }
          return res.data.data;
        });

      console.log("courses", resp);
      setData(resp);
    };
    qrGen();
    fge();
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col bg-white px-6 lg:px-8 ">
        <div className="navbar flex justify-between w-full">
          <div className="navleftitem flex justify-center flex-col "></div>
          <div className="navitemright flex flex-col items-center gap-5 w-1/2 px-10 pt-10">
            <div className=" flex items-center justify-end w-full gap-5">
              <div>
                <img src={localStorage.getItem("profilePic")} className="w-8 h-8" />

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
            <h1 className="text-6xl mb-2">{myData && myData.course}</h1>
          </div>
          <div className="intro flex items-center">
            <div className="leftSide">
              <div className="font-bold">
                <h1>
                  Launch your career as a front-end developer. Build job-ready
                  skills for an in-demand career and earn a credential from
                  Meta. No degree or prior experience required to get started.
                </h1>
              </div>
              <div>
                <p className="flex items-center">
                  <span className="mr-4 font-semibold">Instructor:</span>
                  <img
                    className="h-10 w-10 rounded-full border-2 border-white mr-4"
                    src={courseData ? courseData.coursesImageUrl : "https://via.placeholder.com/150"}
                    alt="Avatar"
                  />
                  Esthera Jackson
                </p>
                <p>
                  <span className="font-bold mr-4">Start Date:</span> 21 July,
                  2023
                </p>
                <p>
                  {" "}
                  <span className="font-bold mr-4">End Date:</span> 21 July,
                  2024
                </p>
              </div>
            </div>
            <div className="rightSide">
              <div>
                <img src={courseData ? courseData.coursesImageUrl : "https://via.placeholder.com/150"} />
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="font-bold text-2xl">Description</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Pharetra pharetra massa massa ultricies. Tempor commodo
              ullamcorper a lacus vestibulum sed arcu non. Cras pulvinar mattis
              nunc sed blandit libero volutpat sed. Pharetra sit amet aliquam id
              diam maecenas ultricies mi eget. Porttitor lacus luctus accumsan
              tortor. Massa ultricies mi quis hendrerit dolor magna. Scelerisque
              eu ultrices vitae auctor eu. Auctor neque vitae tempus quam
              pellentesque. Pretium fusce id velit ut tortor pretium.
            </div>
            <button
              onClick={handleClickAdd}
              className="mt-28 bg-purple-500 text-white px-4 py-2 rounded-full"
            >
              Create Sub-Module
            </button>
          </div>
          <div className="end">
            <div className="font-bold text-2xl">Sub-Modules</div>
            <div className="flex justify-around space-x-4 flex-wrap">
              {subCourse &&
                subCourse.length > 0 &&
                subCourse.map((x) => {
                  return (
                    <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden horizontalCard" onClick={() => navigate("/subcourse/" + x.subcourses_id)}>
                      <div className="w-1/3">
                        <img
                          src={x.subCoursesImageUrl}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="px-4 py-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {x.subcourses}
                        </h2>
                        <p className="text-gray-600">{x.course}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
