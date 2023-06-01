import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

export default function TeacherCreation({ currId }) {
  const [options, setOptions] = useState([]);
  const [teacher, setteacher] = useState([]);
  const [princ, setprinc] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [disable, setdisable] = useState(false);
  const notify = () => toast("Try again!");
  useEffect(() => {
    const fetchPrinc = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/principalAllData")
        .then(async (res) => {
          const newArrPrinc = res.data.data.filter((x) => {
            return x.email === localStorage.getItem("email");
          });
          setprinc(newArrPrinc);
          const resp = await axios
            .get(`http://65.2.30.68:8000/getAllTeacher`)
            .then((res2) => {
              return res2.data.data;
            });
          const newArr = resp.filter(
            (x) => x.institutionId === newArrPrinc[0].institutionId
          );
          // setcourses(resp);
          setteacher(newArr);

          return res.data.data;
        });
    };
    const fetchRes = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/getDepartment")
        .then((res) => {
          return res.data.data;
        });
      console.log("response", response);
      const newArr = response.map((x) => {
        return {
          label: x.departmentName,
          value: x.id,
        };
      });
      setOptions(newArr);
    };
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
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
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
      .post("http://65.2.30.68:8000/createTeacher", {
        email: data.email,
        profilePhoto: response.data.url[0],
        address: data.address,
        city: data.city,
        Additional: data.Additional,
        zipCode: parseInt(data.zipCode),
        state: data.state,
        country: data.country,
        phone: parseInt(data.phone),
        institutionId: parseInt(princ[0].institutionId),
        gender: data.gender,
        dob: data.dob,
        eContactName: data.name,
        eContactNum: parseInt(data.phone),
        eContactRela: data.Additional,
        Department_Id: data.dept_id,
      })
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.token);
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
      <h2 className="my-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
        Teacher Creation
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="fname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="lname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
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
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="institute"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Department
            </label>
          </div>
          <div className="mt-2">
            <Select
              options={options}
              onChange={(option) => {
                setData({ ...data, dept_id: option.value });
              }}
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
              value="Male"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              onChange={handleInput}
              value="Female"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Female
            <input
              type="radio"
              onChange={handleInput}
              name="gender"
              value="etc"
              className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{" "}
            Others
          </div>
        </div>
        {/* Dob */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date Of Birth
            </label>
          </div>
          <div className="flex justify-center mt-2">
            <input
              type="date"
              onChange={handleInput}
              name="dob"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
          </div>
          <div className="mt-2">
            <input
              id="phone"
              onChange={handleInput}
              name="phone"
              type="tel"
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
              name="zipCode"
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
        {/* ID */}

        {/* Year */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="year"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Year
            </label>
          </div>
          <div className="mt-2">
            <input
              id="year"
              onChange={handleInput}
              name="year"
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="userName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
          </div>
          <div className="mt-2">
            <input
              id="userName"
              onChange={handleInput}
              name="userName"
              type="text"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              onChange={handleInput}
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            disabled={disable}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
      <div className="my-10">
        {teacher && teacher.length > 0 && <h1 className="text-4xl">Teacher</h1>}
      </div>

      <div className="mt-4 flex justify-center">
        {teacher &&
          teacher.length > 0 &&
          teacher.map((x) => {
            return (
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
                  <p className="text-gray-600">Teacher</p>
                  <p className="mt-2 text-gray-600">{x.Additional}</p>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
}
