import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CourseCreation(params) {
  const [options, setOptions] = useState([]);
  const [princ, setprinc] = useState([]);
  const [courses, setcourses] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast.error("Try Again");
  const notifySucc = () => toast.success("Success");

  const [data, setData] = useState({
    course: "",
    startTime: "",
    endTime: "",
    institute_id: "",
  });
  useEffect(() => {
    const fetchPrinc = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/principalAllData")
        .then(async (res) => {
          const newArr = res.data.data.filter((x) => {
            return x.email === localStorage.getItem("email");
          });
          console.log("newArr[0]", newArr[0]);
          const resp = await axios
            .get(
              `http://65.2.30.68:8000/getCourses?Institute=${newArr[0].institutionId}`
            )
            .then((res2) => {
              return res2.data.data;
            });

          console.log("courses", resp);
          setcourses(resp);
          return res.data.data;
        });
    };
    const fetchCourse = async () => {};
    const fetchRes = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/getAllInstitute")
        .then((res) => {
          return res.data.data;
        });
      const newArr = response.map((x) => {
        return {
          label: x.InstituteName,
          value: x.institute_id,
        };
      });
      console.log("response", newArr);
      setOptions(newArr);
    };
    if (localStorage.getItem("role") === "principal") {
      fetchPrinc();
      fetchCourse();
    }
    fetchRes();
  }, []);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("data", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://65.2.30.68:8000/insertCourses", {
        course: data.course,
        Institute: data.institute_id,
        startTime: data.startTime,
        endTime: data.endTime,
      })
      .then((res) => {
        console.log(res);
        setData({ ...data, course: "" });

        console.log("data", data);
        notifySucc();
        window.location.reload();
        // navigate("./");
      })
      .catch((err) => {
        console.log(err);
        setData({ ...data, course: "" });

        console.log("data", data);

        notify();
      });
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Course Creation
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            {/* Course Name */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="course"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Course
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="course"
                  name="course"
                  type="text"
                  value={data.course}
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="institute"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Institute
                </label>
              </div>
              <div className="mt-2">
                <Select
                  options={options}
                  onChange={(option) => {
                    setData({ ...data, institute_id: option.value });
                  }}
                />
              </div>
            </div>
            {/* Start Time */}
            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="startTime"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Start Time
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInput}
                />
              </div>
            </div> */}
            {/* End Time */}
            {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="endTime"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  End Time
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInput}
                />
              </div>
            </div> */}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </form>
        </div>
        <div className="mt-4">
          {courses && courses.length > 0 && (
            <h1 className="text-4xl">Courses</h1>
          )}
          {courses &&
            courses.length > 0 &&
            courses.map((x) => {
              return (
                <div
                  className="bg-white shadow-lg rounded-lg p-6 mt-4"
                  onClick={() => navigate(`/course/${x.course_id}`)}
                >
                  <h2 className="text-lg font-bold text-gray-900 ">
                    {x.course}
                  </h2>
                  <p className="font-medium">
                    {x.startTime} - {x.endTime}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
