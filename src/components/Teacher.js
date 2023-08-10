import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../components/AppContext";
import Select from "react-select";
import { Chart } from "react-google-charts";
import FloatingButton from "./FloatingButton";
import { useNavigate } from "react-router-dom";

export default function Teacher() {
  const navigate = useNavigate()
  const { handleClose, close, handleOpen } = useAppContext();
  const [currentActive, setcurrentActive] = useState("");
  const [myData, setData] = useState([]);
  const [institutes, setinstitutes] = useState([]);
  const [daysOrWeek, setdaysOrWeek] = useState([
    {
      value: 7,
      label: "Weekly",
    },
    {
      value: 1,
      label: "Daily",
    },
    {
      value: 31,
      label: "Monthly",
    },
  ]);
  const [InstituteId, setInstituteId] = useState(null);
  const [CourseId, setCourseId] = useState(null);
  const [daysOrWeekId, setdaysOrWeekId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [studentAttendanceData, setstudentAttendanceData] = useState({});
  const [numberOfNo, setnumberOfNo] = useState(0);
  const [numberOfYes, setnumberOfYes] = useState(0);

  const fetchAttendance = async () => {
    const resp = await axios
      .get(
        `http://151.106.39.4:8080/getAttendanceByInstituteCourseTe?institutionId=${InstituteId}&course_id=${CourseId}`
      )
      .then((res) => {
        console.log("res here", res);
        return res.data.userData;
      });

    let attendanceTemp = { ...studentAttendanceData };
    let currNo = numberOfNo;
    let currYess = numberOfYes;
    // For each user in your data
    for (let user of resp) {
      // If the user is present
      // If the user's id already exists in the local object
      // console.log('user.isPresent', user.isPresent)
      if (user.isPersent === "0") currNo++;
      else currYess++;
      if (user.name !== "") {
        if (attendanceTemp[user.user_id]) {
          // Increase the count
          attendanceTemp[user.user_id].count++;
        } else {
          // If not, initialize it with 1
          attendanceTemp[user.user_id] = { name: user.name, count: 1 };
        }
      }
    }
    setstudentAttendanceData(attendanceTemp);
    setnumberOfNo(currNo);
    setnumberOfYes(currYess);

    console.log("studentAttendanceData", attendanceTemp);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const resp = await axios
        .get("http://151.106.39.4:8080/getAllTeacher")
        .then((res) => res.data.data);

      if (localStorage.getItem("role") === "principal") {
        let newArr = resp.filter((x) => x.Institute === localStorage.getItem("institutionId"))
        setData(newArr);
      }
      else
        setData(resp);

    };
    const fetchInstitutes = async () => {
      await axios
        .get("http://151.106.39.4:8080/getAllInstitute")
        .then((res) => {
          setinstitutes(
            res.data.data.map((inst) => ({
              value: inst.institute_id,
              label: inst.InstituteName,
            }))
          );
        });
    };

    const func = async () => {

      if (localStorage.getItem("role") === "principal") {
        console.log("hre2222", InstituteId)

        setInstituteId(localStorage.getItem("institutionId"));
      }
    }
    func()

    fetchStudents();
    fetchInstitutes();
    fetchAttendance();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios
        .get(`http://151.106.39.4:8080/getCourses?Institute=${InstituteId}`)
        .then((res) => {
          return res.data.data;
        });
      const newArr = response.map((x) => {
        return {
          label: x.course,
          value: x.course_id,
        };
      });
      setCourses(newArr);
    };
    fetchCourses();
    fetchAttendance();
  }, [InstituteId, CourseId]);
  const attendanceData = [
    ["Boolean", "Value"],
    ["No", numberOfNo],
    ["Yes", numberOfYes],
  ];

  const attendanceOptions = {
    colors: ["#EE5D50", "#05CD99"],
    // legend: "none",
  };

  const ratingData = [
    ["Rating", "Frequency"],
    ["1 star", 1000],
    ["2 star", 1170],
    ["3 star", 660],
    ["5 star", 1030],
  ];

  const ratingOptions = {
    chart: {},
    colors: ["green", "blue"],
  };

  return (
    <div className="flex min-h-full flex-1 flex-col  bg-white px-6 lg:px-8 ">
      <div className="navbar flex justify-between w-full">
        <div className="navleftitemflex flex flex-row items-center gap-5 w-1/2 p-10 z-50 ml-4">
          <div>
            <h1
              className="text-4xl cursor-pointer"
              onClick={() => setcurrentActive("")}
            >
              Teachers
            </h1>
          </div>
          <div>
            <h1
              className={`text-xl cursor-pointer ${currentActive === "" ? "text-purple-500" : ""
                }`}
              onClick={() => setcurrentActive("Modules")}
            >
              Modules
            </h1>
          </div>
          <div>
            <h1
              className={`text-xl cursor-pointer ${currentActive === "Attendance" ? "text-purple-500" : ""
                }`}
              onClick={() => setcurrentActive("Attendance")}
            >
              Attendance
            </h1>
          </div>
        </div>
        <div className="navitemright flex flex-col items-center gap-5 w-1/2 p-10">
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

      <div class="border-b-2 border-black mb-2"></div>
      {currentActive === "Attendance" ? (
        <div>
          <div className="flex justify-center">
            {
              localStorage.getItem("role") === "admin" && <Select
                options={institutes}
                onChange={(option) => {
                  setInstituteId(option.value);
                }}
              />
            }

          </div>
          {InstituteId && (
            <div>
              <div className="topbar flex justify-around">
                <div>
                  <h1>Attendance Pie Chart</h1>
                </div>
                <div className="flex gap-5">
                  <Select
                    options={courses}
                    onChange={(option) => {
                      setCourseId(option.value);
                    }}
                  />
                  <Select
                    options={daysOrWeek}
                    onChange={(option) => {
                      setdaysOrWeekId(option.value);
                    }}
                  />
                </div>
              </div>
              {CourseId && (
                <>
                  <div className="midbar  flex justify-center items-center">
                    <Chart
                      chartType="PieChart"
                      data={attendanceData}
                      options={attendanceOptions}
                      width={"100%"}
                      height={"400px"}
                      legendToggle={false}
                    />
                  </div>
                  {Object.entries(studentAttendanceData).length > 0 && (
                    <div className="endbar flex justify-center">
                      <div className="w-3/4">
                        <table className="w-full">
                          <thead>
                            <th className="w-1/5 text-left">Teacher Name</th>
                            <th className="w-3/5 text-left">Attendance</th>
                          </thead>
                          <tbody>
                            {Object.entries(studentAttendanceData).map(
                              ([userId, x]) => {
                                return (
                                  <tr>
                                    <td>{x.name}</td>
                                    <td className="flex items-center gap-5">
                                      <svg
                                        width="22"
                                        height="13"
                                        viewBox="0 0 22 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M21.4989 9.1212L16.453 4.07528L13.372 0.978531C12.0673 -0.326177 9.94517 -0.326177 8.64046 0.978531L0.497759 9.1212C-0.571158 10.1901 0.199092 12.0136 1.69243 12.0136H10.5111H20.3042C21.8133 12.0136 22.5678 10.1901 21.4989 9.1212Z"
                                          fill="#05CD99"
                                        />
                                      </svg>
                                      {x.count}
                                      <div
                                        style={{
                                          width: "100%",
                                          height: "20px",
                                          backgroundColor: "#ddd",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: `${(x.count / 2060) * 100}%`,
                                            height: "100%",
                                            backgroundColor:
                                              x.count > 5 ? "#05CD99" : "red",
                                            borderRadius: "10px",
                                          }}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-5 flex-wrap justify-center">
          {myData.map((studentData) => {
            return (
              <div className="card rounded-xl bg-gray-100 w-1/4 flex flex-col items-center h-56 justify-center">
                <div className="profile">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="21" cy="21" r="21" fill="#D9D9D9" />
                  </svg>
                </div>
                <div className="details mt-4">
                  <div className="flex flex-col justify-center items-center">
                    <div>{studentData.name}</div>
                    <div className="text-gray-500">btech, cse</div>
                  </div>
                  <div>
                    <button class="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm border-blue btn-primary bg-gray-400 hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Primary</button>
                    <button class="py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm border-blue btn-primary bg-gray-400 hover:bg-blue-light focus:outline-none active:shadow-none mr-2">Primary</button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <FloatingButton onClick={() => navigate("/teacher-creation")}>Add Teachers</FloatingButton>
    </div>
  );
}
