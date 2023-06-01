import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

export default function SubCourseCreation() {
  const params = useParams();
  const notify = () => toast("Try again");
  const [options, setOptions] = useState([]);
  const [Course, setCourse] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    subcourses: "",
    startTime: "",
    endTime: "",
    institute_id: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("data", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://65.2.30.68:8000/insertsubCourses", {
        courseId: parseInt(params.id),
        subcourses: data.subcourses,
        InstituteId: Course.Institute,
        startTime: data.startTime,
        endTime: data.endTime,
      })
      .then((res) => {
        console.log(res);
        navigate("course/" + params.id);
      })
      .catch((err) => {
        console.log(err);
        notify();
      });
  };
  useEffect(() => {
    const fge = async () => {
      const resp = await axios
        .get(`http://65.2.30.68:8000/getCoursesById?course_id=${params.id}`)
        .then((res) => {
          return res.data.data;
        });

      console.log("courses", resp);
      setCourse(resp);
    };
    fge();
  }, []);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            SubCourse Creation
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            {/* Course Name */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="subcourses"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  subcourses
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="subcourses"
                  name="subcourses"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* Start Time */}
            <div>
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
            </div>
            {/* End Time */}
            <div>
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
