import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
export default function CourseDesc() {
  const [myData, setData] = useState([]);
  const [qr, setqr] = useState("");
  const [subCourse, setsubCourse] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("create-subcourse/" + params.id);
  };
  useEffect(() => {
    const qrGen = async () => {
      const resp = await axios.get(
        `http://65.2.30.68:8000/generateQR?user_id=1`
      );
      setqr(resp.data.data);
      const newS = qr.replace(/\n/g, "").replace(/ /g, "").trim();
      setqr(newS);

      console.log("resp new", resp.data.data);
    };
    const fge = async () => {
      const resp = await axios
        .get(`http://65.2.30.68:8000/getCoursesById?course_id=${params.id}`)
        .then(async (res) => {
          console.log("res", res.data.data);
          if (res.data.data.Institute) {
            const resp2 = await axios
              .get(
                `http://65.2.30.68:8000/getsubCourses?InstituteId=${res.data.data.Institute}`
              )
              .then((res2) => {
                return res2.data.data;
              });
            const newArr = resp2.filter((x) => x.courseId === res.data.data.course_id)
            setsubCourse(newArr);
            console.log("subcourses", newArr);
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
      <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
        <div class="p-10 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
          <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
            <div class="font-bold text-3xl mb-2">{"course"}</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
        </div>
        {localStorage.getItem("role") === "principal" && (
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <div onClick={() => handleClick()}>Create SubCourse</div>
          </button>
        )}

        <div class="p-5 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
          <h1 className="text-2xl font-bold">Existing Subcourses</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center w-full gap-5">
          {subCourse &&
            subCourse.length > 0 &&
            subCourse.map((x) => {
              return (
                <div
                  className="bg-white shadow-lg rounded-lg p-6 mt-4"
                  onClick={() => navigate("subcourse/" + x.subcourses_id)}
                >
                  <h2 className="text-lg font-bold text-gray-900 ">
                    {x.subcourses}
                  </h2>
                  <p className="font-medium">
                    {x.startTime} - {x.endTime}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
