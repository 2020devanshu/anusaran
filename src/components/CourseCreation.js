import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./AppContext";
import { CircleLoader } from "react-spinners";

export default function CourseCreation(params) {
  const { handleClose, close, handleOpen } = useAppContext();
  const [options, setOptions] = useState([]);
  const [princ, setprinc] = useState([]);
  const [courses, setcourses] = useState([]);
  const navigate = useNavigate();
  const notify = () => toast.error("Try Again");
  const notifySucc = () => toast.success("Success");
  const [imageSrc, setImageSrc] = useState(null)
  const [InstituteId, setInstituteId] = useState(null);
  const [institutes, setinstitutes] = useState([]);
  const [uploadedImageId, setuploadedImageId] = useState(null);
  const [loading, setloading] = useState(false)


  const [data, setData] = useState({
    course: "",
    startTime: "",
    endTime: "",
    institute_id: "",
    hours: ""
  });
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
          const newArr = res.data.data.filter((x) => {
            return x.email === localStorage.getItem("email");
          });
          console.log("newArr[0]", newArr[0]);
          const resp = await axios
            .get(
              `http://151.106.39.4:8080/getCourses?Institute=${newArr[0].institutionId}`
            )
            .then((res2) => {
              return res2.data.data;
            });

          console.log("courses", resp);
          setcourses(resp);
          return res.data.data;
        });
    };
    const fetchCourse = async () => { };
    const fetchRes = async () => {
      const response = await axios
        .get("http://151.106.39.4:8080/getAllInstitute")
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
    fetchInstitutes()
  }, []);

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log("data", data);
  };


  const handleImageUpload = async (e) => {
    setloading(true)
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
      console.log("data.logo", data.logo);
      const formData = new FormData();

      // Send the file to the server
      formData.append("file", imageSrc);

      // Send the file to the server
      await axios.post(
        "http://151.106.39.4:8080/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((res) => {
        const fileUrl = res.data.url;
        console.log("fileUrl", fileUrl);
        setloading(false)
      })

      // Get the URL of the uploaded file


      // Get the URL of the uploaded file
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data.logo", data.logo);


    // axios
    //   .post("http://151.106.39.4:8080/insertCourses", {
    //     course: data.name,
    //     Institute: InstituteId,
    //     coursesImageUrl
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setData({ ...data, course: "" });

    //     console.log("data", data);
    //     notifySucc();
    //     window.location.reload();
    //     // navigate("./");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setData({ ...data, course: "" });

    //     console.log("data", data);

    //     notify();
    //   });
  };
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center bg-white px-6 lg:px-8 ">
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
          <h1 className="text-6xl mb-2">Add Course</h1>
        </div>
        <div class="border-b-2 border-black mb-2"></div>
        <div className="flex p-4">
          <form className="space-y-6 w-full" action="#" onSubmit={handleSubmit}>
            {/* Institute Name */}
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Course Name*
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div>
              {/* <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Grading System*
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="grade"
                    type="text"
                    required
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div> */}
            </div>
            {/* Logo */}

            <div>
              {
                loading ?
                  <CircleLoader /> :
                  <>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-lg font-medium leading-6 text-gray-900"
                      >
                        Upload Course Image
                      </label>
                    </div>
                    <div className="mt-2">
                      {
                        imageSrc ? <> Image Uploaded</> : <div className="custom-file-upload">

                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden "
                          />
                          <label for="file-upload">
                            <div className="input-inner  inputbox">
                              <svg
                                width="50"
                                height="50"
                                viewBox="0 0 50 50"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <rect width="50" height="50" fill="url(#pattern0)" />
                                <defs>
                                  <pattern
                                    id="pattern0"
                                    patternContentUnits="objectBoundingBox"
                                    width="1"
                                    height="1"
                                  >
                                    <use
                                      xlinkHref="#image0_5_276"
                                      transform="scale(0.0111111)"
                                    />
                                  </pattern>
                                  <image
                                    id="image0_5_276"
                                    width="90"
                                    height="90"
                                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACe0lEQVR4nO2cP24TQRSHvyrQIxFBUnEFrgI0dIgqEOcANEBlJM7BLSgJCQgcTkCLgAbZFSAeWmkiWVa8/2b2eWfn90lPsmTPeufz29nx250FIYQQQgghhBBCCFFxDZgBZ8AKsBaxjTG3XYU+PgX2cOYAuGi5ozYCWTFt12MR+u6WyX0kW2SHd9V2Mz57Zfas5w5aZId31faqeIID5xLNew/RS4mmcjA4XQ/P3NlZfyUaiR4CZbQTEu2ERDsh0U5ItBMS7URp09neXAdOQulgtVb2nIUCmUjAIfClJisvwmdEZCbXSV6XrcyO4KRD2fM45otK53xsZc+pshxb2XOq051lB9G/arbzT2VSn6FDohNe26xuJdiGRCe6Wr9ouKot0S04bJDd5j4Nie6Q2cdhHF6GOO1w55FEOyHRTkj01EX3ZR94CXwEvoeoXr8I74kEPGq4tXcVPiMieN7hj0OV3aIn1jG6yL4JPAPeAT+BH8CHsI1bpf1iNpDs/SC2riL3mIKwAWU/AP5MdTjqWia1iJi32J97wO+G7bwqYR5tkVGdTJu4D/wdKLOLEW0tZc8TDUdFi7YWw8idhMNR0aKtIbNvJD5CihZtNZIeDjAcFS3agNcbteS7wLfER8glRYs24CvwBnjbYi4dI7t40ZbwR5tPoUxqmUT2WCaRPZZJZI9lEtljmUT2WCYxOrLZ0URkM4/OHYl2QqKdkGgnJNoJiXZCop2Q6KmL1uPYqF0ul4yzAf7m2ojbXhXV0ozBqdaDlC76CKfFN4uCRX/yfLzxQU/Z2xhz203Jt3FmLywhO+1wgtzGmNteLpc72sWDuoUQQgghhBBCCCEYIf8B/kaoZm018W4AAAAASUVORK5CYII="
                                  />
                                </defs>
                              </svg>

                              <p>Drag or drop file to upload</p>
                            </div>
                          </label>
                        </div>
                      }


                      {/* <input
                  id="logo"
                  name="logo"
                  type="image"
                  alt="#"
                  required
                  onChange={handleInput}
                /> */}
                    </div>
                  </>
              }

            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Course Description
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="name"
                  name="course_desc"
                  rows="4"
                  cols="50"
                  className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Course Start Date
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="startDate"
                    type="datetime-local"
                    required
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Course End Date
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="endDate"
                    type="datetime-local"
                    required
                    className="block w-4/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
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
                    Hours to Complete
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="name"
                    name="hours"
                    type="text"
                    required
                    className="block w-1/3 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
              </div>
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
            <div className="flex gap-5">
              <button
                type="submit"
                className="flex w-1/12 justify-center rounded-md bg-purple-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Create
              </button>
              <button

                className="flex w-1/12 justify-center rounded-md px-5 py-3 text-lg font-semibold leading-6 text-purple-500 border-purple-500 border-2 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </form>
      </div> */}

      <ToastContainer />
    </div>
  );
}
