import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

export default function TeacherCreation({ currId }) {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '0',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.375rem', // rounded-md
      paddingLeft: '0.75rem', // px-3
      paddingRight: '0.75rem', // px-3
      paddingTop: '0.375rem', // py-1.5
      paddingBottom: '0.375rem', // py-1.5
      fontSize: '0.875rem', // sm:text-sm
      lineHeight: '1.5rem', // sm:leading-6
      backgroundColor: "#f8f6ff",
      '&:hover': {
        borderColor: '#cbd5e0', // ring-gray-300
      },
      '&:focus': {
        borderColor: '#4c51bf', // focus:ring-indigo-600
        boxShadow: '0 0 0 2px rgba(76, 81, 191, 0.5)', // Approximation of focus:ring-2 focus:ring-indigo-600
      },
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#2d3748', // text-gray-900
      '::placeholder': {
        color: '#a0aec0', // placeholder:text-gray-400
      },
    }),
  };
  const [options, setOptions] = useState([]);
  const [teacher, setteacher] = useState([]);
  const [princ, setprinc] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [disable, setdisable] = useState(false);
  const [InstituteId, setInstituteId] = useState(null);
  const [institutes, setinstitutes] = useState([]);


  const notify = () => toast("Try again!");
  useEffect(() => {
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
    const fetchPrinc = async () => {
      const response = await axios
        .get("http://151.106.39.4:8080/principalAllData")
        .then(async (res) => {
          const newArrPrinc = res.data.data.filter((x) => {
            return x.email === localStorage.getItem("email");
          });
          setprinc(newArrPrinc);
          const resp = await axios
            .get(`http://151.106.39.4:8080/getAllTeacher`)
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
        .get("http://151.106.39.4:8080/getDepartment")
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
    fetchInstitutes()
    // fetchPrinc();
    // fetchRes();
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

    const res = await axios.post("http://151.106.39.4:8080/registerUser", {
      email: data.email,
      password: data.password,
      fname: data.fname,
      lname: data.lname,
      phone: parseInt(data.phone),
      username: data.userName,
    });
    const response = await axios.post(
      "http://151.106.39.4:8080/uploads",
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
      .post("http://151.106.39.4:8080/createTeacher", {
        email: data.email,
        profilePhoto: response.data.url[0],
        address: data.address,
        city: data.city,
        Additional: data.Additional,
        zipCode: parseInt(data.zipCode),
        state: data.state,
        country: data.country,
        phone: parseInt(data.phone),
        institutionId: InstituteId,
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
    <div className="flex min-h-full flex-1 flex-col justify-center bg-white px-6 lg:px-8 ">
      <div className="navbar flex justify-between w-full">
        <div className="navleftitem flex justify-center flex-col "></div>
        <div className="navitemright flex flex-col items-center gap-5 w-1/2 px-10 pt-10">
          <div className=" flex items-center justify-end w-full gap-5">
            <div>
              <img src={localStorage.getItem("profilePic")} className="w-8 h-8" />

            </div>
            <div >
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
          <h1 className="text-6xl mb-2">Add Teacher</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div className="flex p-4">
          <form className="space-y-6 w-full" action="#" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="flex justify-between">
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-1/2 mr-4">
                <div className="flex flex-col mt-2">
                  <div>
                    <label
                      htmlFor="lname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profile Pic
                    </label>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-4/6 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* Gender */}
              <div className="w-1/2">
                <div className="flex flex">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Gender
                  </label>
                </div>
                <div className=" flex flex-row  space-x-20 mt-2">
                  <input
                    onChange={handleInput}
                    type="radio"
                    name="gender"
                    value="Male"
                    className="block rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                  Male
                  <input
                    type="radio"
                    name="gender"
                    onChange={handleInput}
                    value="Female"
                    className="block  rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                  Female
                  <input
                    type="radio"
                    onChange={handleInput}
                    name="gender"
                    value="etc"
                    className="block  rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />{" "}
                  Others
                </div>
              </div>
            </div>
            {/* Dob */}
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex justify-between">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date Of Birth
                  </label>
                </div>
                <div className="flex  mt-2">
                  <input
                    type="date"
                    onChange={handleInput}
                    name="dob"
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Email */}
              
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    onChange={handleInput}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* Phone Number */}
            <div className="flex justify-between">
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Address */}
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>
            </div>
            {/* ID */}

            {/* Year */}


            {/* Username */}
            <div className="flex justify-between">
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="w-full">
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
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    InstituteId
                  </label>
                </div>
                <div className="mt-2">
                  <Select
                    options={institutes}
                    onChange={(option) => {
                      setInstituteId(option.value);
                    }}
                    styles={customStyles}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                disabled={disable}
                type="submit"
                className="flex w-1/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>

        </div>
      </div>

      <ToastContainer />
    </div>
  )

  // return (
  //   <div className="flex flex-col justify-center p-10 bg-slate-300 items-center">
  //     <h2 className="my-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
  //       Teacher Creation
  //     </h2>

  //     <div className="my-10">
  //       {teacher && teacher.length > 0 && <h1 className="text-4xl">Teacher</h1>}
  //     </div>

  //     <div className="mt-4 flex justify-center">
  //       {teacher &&
  //         teacher.length > 0 &&
  //         teacher.map((x) => {
  //           return (
  //             <div className="bg-blue-100 border-2 border-blue-300 m-2 p-4 rounded-md shadow-md w-64 max-w-md  hover:bg-blue-200">
  //               <div className="flex items-center justify-center h-48 bg-gray-100">
  //                 <img
  //                   className="h-32 w-32 rounded-full object-cover"
  //                   src={x.profilePhoto}
  //                   alt={`Profile of ${x.name}`}
  //                 />
  //               </div>
  //               <div className="px-4 py-2 mt-2">
  //                 <h1 className="text-xl font-medium text-gray-800">
  //                   {x.name}
  //                 </h1>
  //                 <p className="text-gray-600">Teacher</p>
  //                 <p className="mt-2 text-gray-600">{x.Additional}</p>
  //               </div>
  //             </div>
  //           );
  //         })}
  //     </div>
  //     <ToastContainer />
  //   </div>
  // );
}
