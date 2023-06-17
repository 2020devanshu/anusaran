import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
export default function TeacherCreation({ currId }) {
  const [options, setOptions] = useState([]);
  const [stud, setstud] = useState([]);
  const [princ, setprinc] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [disable, setdisable] = useState(false);
  const notify = () => toast("Try again!");
  const fetchPrinc = async () => {
    const response = await axios
      .get("http://65.2.30.68:8000/principalAllData")
      .then(async (res) => {
        const princData = res.data.data.filter((x) => {
          return x.email === localStorage.getItem("email");
        });
        const resp = await axios
          .get("http://65.2.30.68:8000/getDataAllSt")
          .then((res2) => {
            return res2.data.data;
          });
        const responseCourse = await axios
          .get(
            `http://65.2.30.68:8000/getCourses?Institute=${princData[0].institutionId}`
          )
          .then((res) => {
            return res.data.data;
          });
        const newArrCourse = responseCourse.map((x) => {
          return {
            label: x.course,
            value: x.course_id,
          };
        });
        setOptions(newArrCourse);
        setprinc(princData[0]);

        console.log("getCoursesUser", responseCourse, princ);
        console.log("princData", princData[0]);
        const newArr = resp.filter(
          (x) => x.institutionId === princData[0].institutionId
        );
        setstud(newArr);

        return res.data.data;
      });
  };
  useEffect(() => {
    const fetchRes = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/getDepartment")
        .then((res) => {
          return res.data.data;
        });
      console.log("response", response);
    };
    const fetchCourses = async () => {};
    fetchPrinc();
    fetchRes();
  }, []);
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log("e.target.files", e.target.files);
      const imgFile = e.target.files[0];

      // // Converting to a base64 string
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setImageSrc(e.target.result);
      // };
      // // reader.readAsDataURL(imgFile);
      console.log("imageSrc", URL.createObjectURL(e.target.files[0]));

      // Alternatively, you can use the file object directly
      setImageSrc(e.target.files[0]);
    }
  };
  const [dataCourse, setDataCourse] = useState({
    course_id: "",
    Institute_id: "",
    user_id: "",
  });
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    name: "",
    profilePhoto: "",
    address: "",
    city: "",
    Additional: "",
    zipCode: "",
    state: "",
    country: "",
    phone: "",
    institutionId: params.id,
    gender: "",
    dob: "",
    eContactName: "",
    eContactNum: "",
    eContactRela: "",
    password: "",
    userName: "",
    class: "",
    section: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setdisable(true);
    e.preventDefault();
    console.log("data.logo", data.logo);
    const formData = new FormData();
    formData.append("file", imageSrc);

    const res = await axios.post("http://65.2.30.68:8000/registerUser", {
      email: data.email,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
      phone: parseInt(data.phone),
      username: data.userName,
    });
    const response = await axios.post(
      "http://65.2.30.68:8000/uploads",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const fileUrl = response.data.url;
    console.log("fileUrl", fileUrl);
    axios
      .post("http://65.2.30.68:8000/createStudentsDetails", {
        email: data.email,
        profilePhoto: response.data.url[0],
        address: data.address,
        city: data.city,
        Additional: data.Additional,
        zipCode: parseInt(data.zipCode),
        state: data.state,
        country: data.country,
        institutionId: parseInt(princ.institutionId),
        gender: data.gender,
      })
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        fetchPrinc();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        notify();
        // window.location.reload();
      });
  };

  return (
    <div className="flex flex-col justify-center p-10 bg-slate-300 items-center">
      <h1 class="font-bold text-3xl mt-2">Create Student </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="fname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
          </div>

          <div className="mt-2">
            <input
              id="firstName"
              name="fname"
              type="text"
              required
              onChange={handleInput}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-2">
          Course
          <Select
            options={options}
            onChange={(option) => {
              setData({ ...data, institute_id: option.value });
            }}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="lname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
          </div>

          <div className="mt-2">
            <input
              id="firstName"
              name="lname"
              type="text"
              required
              onChange={handleInput}
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <label
            htmlFor="lname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Profile Pic
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        {/* Gender */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Gender
            </label>
          </div>
          <div className=" flex flex-row justify-center space-x-20 mt-2">
            <input
              onChange={handleInput}
              type="radio"
              name="gender"
              value="male"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              onChange={handleInput}
              value="female"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Female
            <input
              type="radio"
              onChange={handleInput}
              name="gender"
              value="others"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Others
          </div>
        </div>
        {/* Dob */}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              onChange={handleInput}
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* Phone Number */}

        {/* Address */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              city
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="additional"
              name="city"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="additional"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              additional
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="additional"
              name="additional"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="address"
              name="address"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              zipcode
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="zipcode"
              name="zipcode"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="state"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              state
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="state"
              name="state"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              country
            </label>
          </div>
          <div className="mt-2">
            <input
              onChange={handleInput}
              id="country"
              name="country"
              type="text"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="class"
              onChange={handleInput}
              name="password"
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* ID */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="class"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Class
            </label>
          </div>
          <div className="mt-2">
            <input
              id="class"
              onChange={handleInput}
              name="class"
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="section"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              section
            </label>
          </div>
          <div className="mt-2">
            <input
              id="section"
              onChange={handleInput}
              name="section"
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Year */}

        <button
          disabled={disable}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </form>
      <div className="my-10">
        {stud && stud.length > 0 && (
          <h1 className="text-4xl">Students Enrolled</h1>
        )}
      </div>
      <div className="flex flex-wrap justify-center">
        {stud &&
          stud.length > 0 &&
          stud.map((x) => {
            return (
              <>
                {" "}
                <div className="bg-blue-100 border-2 border-blue-300 m-2 p-4 rounded-md shadow-md w-64 max-w-md  hover:bg-blue-200">
                  <div className="flex items-center justify-center h-48 bg-gray-100">
                    <img
                      className="h-32 w-32 rounded-full object-cover"
                      src={x.profilePhoto}
                      alt={`Profile of ${x.name}`}
                    />
                  </div>
                  <div className="px-4 py-2 mt-2">
                    <h1 className="text-xl font-medium text-gray-800">
                      {x.name}
                    </h1>
                    <p className="text-gray-600">Student</p>
                    <p className="mt-2 text-gray-600">{x.Additional}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
}
