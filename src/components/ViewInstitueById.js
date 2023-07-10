import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import FeedbackCard from "./FeedbackData";
import FeedbackCard from "./FeedbackCard";
import ProfileCard from "./ProfileCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useMediaQuery } from "react-responsive";
export default function InstituteById() {
  const params = useParams();
  const [Name, setName] = useState("");
  const [logo, setlogo] = useState("");
  const [currId, setcurrId] = useState(null);
  const [first, setfirst] = useState(null);
  const [stud, setstud] = useState(null);
  const [princi, setprinci] = useState(null);
  const [limit, setlimit] = useState(true);
  const [courses, setcourses] = useState(null);
  const [teacher, setteacher] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const navigate = useNavigate();
  const [pairedFeedbacks, setpairedFeedbacks] = useState([]);

  console.log("params", params.id);
  const handleClick = () => {
    navigate("create-principal/" + params.id);
  };
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Set the screen width threshold here
  useEffect(() => {
    setcurrId(params.id);
    const fetchFeedback = async () => {
      const resp = await axios
        .get(`http://65.2.30.68:8000/getFeedback?instituteId=${params.id}`)
        .then((res2) => {
          if (res2.data.data && res2.data.data.length > 0) {
            const pairs = [];
            console.log('isMobile', isMobile)
            if (isMobile) {
              for (let feedback of res2.data.data) {
                pairs.push([feedback]);
              }
            } else {
              for (let i = 0; i < res2.data.data.length; i += 2) {
                pairs.push(res2.data.data.slice(i, i + 2));
              }
            }
            setpairedFeedbacks(pairs);
            console.log("pairedFeedbacks", pairedFeedbacks);
          }
          return res2.data.data;
        });
      setfeedback(resp);
    };
    const fetchInstitute = async () => {
      const response = await axios
        .get(
          `http://65.2.30.68:8000/getInstituteById?institute_id=${params.id}`
        )
        .then((res) => {
          console.log("res", res);
          setName(res.data.data.InstituteName);
          setlogo(res.data.data.InstituteLogo);
          console.log("Name", Name);
        });
    };
    const fetchPrincipal = async () => {
      const resp = await axios
        .get("http://65.2.30.68:8000/principalAllData")
        .then((res) => {
          return res.data.data;
        });
      console.log("currId", currId);
      const newArr = resp.filter(
        (x) => x.institutionId === parseInt(params.id)
      );
      console.log("princ", newArr, resp);
      setprinci(newArr);
    };
    const fetchStudent = async () => {
      const resp = await axios
        .get("http://65.2.30.68:8000/getDataAllSt")
        .then((res) => {
          return res.data.data;
        });
      console.log("currId", currId);
      const newArr = resp.filter(
        (x) => x.institutionId === parseInt(params.id)
      );
      console.log("stud", newArr, resp);
      setstud(newArr);
    };
    const fetchCourses = async () => {
      const resp = await axios
        .get(`http://65.2.30.68:8000/getCourses?Institute=${params.id}`)
        .then((res) => {
          return res.data.data;
        });
      console.log("currId", currId);

      console.log("courses", resp);
      setcourses(resp);
    };
    const fetchTeachers = async () => {
      const resp = await axios
        .get(`http://65.2.30.68:8000/getAllTeacher`)
        .then((res) => {
          return res.data.data;
        });
      const newArr = resp.filter(
        (x) => x.institutionId === parseInt(params.id)
      );
      console.log("teacher", newArr, resp);

      console.log("teacher", resp);
      // setcourses(resp);
      setteacher(newArr);
    };
    fetchFeedback();
    fetchTeachers();
    fetchStudent();
    fetchCourses();
    fetchPrincipal();
    fetchInstitute();
  }, []);

  const handleTeacherClick = () => {
    navigate("create-teacher/" + params.id);
  };
  const handleStudentClick = () => {
    navigate("create-student/" + params.id);
  };
  const handleShowClick = () => {
    setlimit(!limit);
  };

  return (
    <div className="flex flex-col justify-center p-10 items-center bg-white">
      <div className="navbar md:flex justify-between w-full">
        <div className="navleftitem flex justify-center flex-col ">
          <h1 className="text-6xl font-bold xsm:mb-4 m-0">{Name}</h1>
          <p>
            The institutes dashboard serves as a comprehensive and centralized
            platform for administrators to effectively manage all aspects of
            their institution. From user management to course administration,
            this powerful tool provides administrators with...
          </p>
          <div className=" w-full md:mr-2 md:pl-10 block md:hidden xsm:my-4 m-0">
            <img src={logo} className="h-56 w-full" />
          </div>
        </div>

        <div className="navitemright  flex-col items-center gap-5 w-1/2 p-10 xsm:hidden md:flex">
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
            <div>
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
          <div className=" w-full border-l-2  border-black mr-2 pl-10">
            <img src={logo} className="h-56 w-full" />
          </div>
        </div>
      </div>

      {/* princ details */}
      <div className="workContainer mb-4 w-full">
        <div>
          <h1 className="text-3xl md:text-6xl mb-2">Representatives</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div className="xsm:flex xsm:flex-col md:flex-row">
          {princi &&
            princi.length > 0 &&
            princi.map((x) => {
              return (
                <ProfileCard
                  imgSrc={x.profilePhoto}
                  name={x.name}
                  designation="Principal"
                />
              );
            })}
        </div>
      </div>
      {localStorage.getItem("role") === "admin" && (
        <button
          onClick={() => handleClick()}
          className="flex w-full justify-center   mb-5 rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Principal
        </button>
      )}
      {localStorage.getItem("role") === "principal" ? (
        <>
          <button
            onClick={() => handleTeacherClick()}
            className="flex w-full justify-center mb-5 rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div>Create Teacher</div>
          </button>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <div onClick={() => handleStudentClick()}>Create Student</div>
          </button>
        </>
      ) : (
        <></>
      )}

      <div className="workContainer mb-4 mt-4 w-full flex flex-col">
        <div>
          <h1 className="text-3xl md:text-6xl mb-2">Student Details</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div className="xsm:flex xsm:flex-col md:flex-row flex-wrap">
          {limit
            ? stud &&
              stud.length > 0 &&
              stud.slice(0, 3).map((x, ind) => {
                return (
                  <ProfileCard
                    imgSrc={x.profilePhoto}
                    name={x.name}
                    designation="Student"
                  />
                );
              })
            : stud &&
              stud.length > 0 &&
              stud.map((x, ind) => {
                return (
                  <ProfileCard
                    imgSrc={x.profilePhoto}
                    name={x.name}
                    designation="Student"
                  />
                );
              })}
        </div>
        <div className="flex justify-center">
          <div
            className="teachercontent text-center h-10 w-64 items-center flex justify-center font-bold rounded-xl"
            onClick={handleShowClick}
          >
            {limit ? "More Students" : "Less Students"}
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="50"
                y="50"
                width="50"
                height="50"
                transform="rotate(-180 50 50)"
                fill="url(#pattern0)"
              />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_18_331"
                    transform="scale(0.0111111)"
                  />
                </pattern>
                <image
                  id="image0_18_331"
                  width="90"
                  height="90"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/0lEQVR4nO3cO05DQQyF4b8i7IDnfhAFO+FRAhvkUQFLQSCRqYxGugUFryLjsZ1zJEspUmS+OL43iWZAURRFURRFURRFURRF6dkFroBH4B2wovUOPACXwMr7rT8GXgIgmHM9L2t36+RtRLYv2C6dfRVgsTa5LjygHwMs1CbXvQf0W4CF2uTqBsMze5EWpASNoJndhepo5sNpdDAfVTMaQbt11hq4BvaX6o+bOpqNI59+c591I2g2hty79uyHm9k9QTMcuedQ0AwbF19zK2iGI58uzxt9ES77Fbz9MS56ToAPp9dTEroFQy4J3QIil4NuQZFLQbfAyGWgW3DkEtAtAXJ66JYEOTV0S4ScFrolQ04J3RIip4NuSZFTQa8D/UBUGvo6MXIq6P2E40LQCPrHjuh/oP4WjY4Ndc9aF0OfGW26vfODtsTYwzPiRbeE2CmhLSF2WmhLhp0a2hJhp4e2JNgloC0BdhloC45dCtoCY5eDtqDYJaEtIHZZaAv2Q1RpaPsntvaw4DNGtIcFH2ztYcFnjGgPC2Nmdp/JB0v1x9rQSZ0antkLtCAlaATN7C5URzMfTqODLZ3ROo4NXj2gdcAgPgcMXgb42NrkOveAXi0HodqW1hOwg1OOtxT7CTjCOavl1Nn74hfIN+BuGRdunawoiqIoiqIoiqIoikLgfAKNEIswhq0xfAAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* {courses && courses.length > 0 && <h1 className="text-4xl">Courses</h1>}

      <div className="mt-4 flex justify-around w-full">
        {courses &&
          courses.length > 0 &&
          courses.map((x) => {
            return (
              <div
                className="bg-white shadow-lg rounded-lg p-6 mt-4"
                onClick={() => {
                  navigate(`/course/${x.course_id}`);
                }}
              >
                <h2 className="text-lg font-bold text-gray-900 ">{x.course}</h2>
                <p className="font-medium">
                  {x.startTime} - {x.endTime}
                </p>
              </div>
            );
          })}
      </div> */}
      {/* {teacher && teacher.length > 0 && <h1 className="text-4xl">Teacher</h1>} */}
      <div className="workContainer mb-4 mt-4 w-full flex flex-col">
        <div>
          <h1 className="text-3xl md:text-6xl mb-2">Teachers</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div className="xsm:flex xsm:flex-col md:flex-row flex-wrap">
          {teacher &&
            teacher.length > 0 &&
            teacher.map((x, ind) => {
              return (
                <ProfileCard
                  imgSrc={x.profilePhoto}
                  name={x.name}
                  designation="Teacher"
                />
              );
            })}
        </div>
        <div className="flex justify-center"></div>
      </div>

      <div className="workContainer mb-4 mt-4 w-full flex flex-col">
        <div>
          <h1 className="text-6xl mb-2">Feedbacks</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>

        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          useKeyboardArrows={true}
        >
          {pairedFeedbacks.map((feedbackPair, index) => (
            <div key={index} className="flex justify-around">
              {feedbackPair.map((feedback, idx) => (
                <FeedbackCard key={idx} {...feedback} />
              ))}
            </div>
          ))}
        </Carousel>
        <div className="flex justify-center"></div>
      </div>
      {/* {feedback && feedback.length > 0 && (
        <h1 className="text-4xl">feedback</h1>
      )}
      <div className="mt-4 flex justify-around w-full">
        {feedback &&
          feedback.length > 0 &&
          feedback.map((x) => {
            return <FeedbackCard feedbackData={x} />;
          })}
      </div> */}
    </div>
  );
}
