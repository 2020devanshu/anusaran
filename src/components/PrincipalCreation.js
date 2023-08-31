import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import { ToastContainer, toast } from "react-toastify";

export default function PrincipalCreation({ currId }) {
  const { handleClose, close, handleOpen } = useAppContext();
  const params = useParams();
  const notify = () => toast("Try again");
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [disable, setdisable] = useState(false);
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
      .post("http://151.106.39.4:8080/insertPrincipal", {
        email: data.email,
        profilePhoto: response.data.url[0],
        address: data.address,
        city: data.city,
        Additional: data.Additional,
        zipCode: parseInt(data.zipCode),
        state: data.state,
        country: data.country,
        phone: parseInt(data.phone),
        institutionId: parseInt(params.id),
        gender: data.gender,
        dob: data.dob,
        eContactName: data.name,
        eContactNum: parseInt(data.phone),
        eContactRela: data.Additional,
      })
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        navigate("/institute-list/institute/" + params.id);
      })
      .catch((err) => {
        console.log(err);
        notify();
      });
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center bg-white px-6 lg:px-8 ">
        <div className="navbar flex justify-between w-full">
          <div className="navleftitem flex justify-center flex-col"></div>
          <div className="navitemright flex flex-col items-center gap-5 w-1/2 p-10">
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
            <h1 class="text-6xl mb-2">Create Principal </h1>
          </div>
          <div class="border-b-2 border-black mb-2"></div>
        </div>
        <div>
          <div lassName="flex p-8">
            <form className="space-y-6 w-full" action="#" onSubmit={handleSubmit}>

              {/* First Name */}
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
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
                      className="block w-5/6 inputbox  rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* {last name} */}
                <div className="flex flex-col w-1/2">
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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* Profile */}
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="lname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profile Pic
                    </label>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                </div>

                {/* Gender */}
                <div className="flex flex-col w-1/2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="flex flex-row mt-2 w-1/3 ">
                    <input
                      onChange={handleInput}
                      type="radio"
                      name="gender"
                      value="Male"
                      className="block w-5/6 mx-4 rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    Male
                    <input
                      type="radio"
                      name="gender"
                      onChange={handleInput}
                      value="Female"
                      className="block w-5/6   mx-4 rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    Female
                    <input
                      type="radio"
                      onChange={handleInput}
                      name="gender"
                      value="etc"
                      className="block w-5/6  mx-4  rounded-md px-3 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />{" "}
                    Others
                  </div>
                </div>
              </div>
              {/* Dob */}
              <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col mt-2 w-full">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date Of Birth
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="date"
                        onChange={handleInput}
                        name="dob"
                        className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    {/* Email */}

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
                        required
                        autoComplete="email"
                        className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                </div>
                {/* Phone Number */}
                <div className="flex flex-col w-1/2">
                  <div className="flex flex-col">
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
                        className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    {/* city */}

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
                        className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* address  */}
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">

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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="userName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      additional
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="userName"
                      onChange={handleInput}
                      name="userName"
                      type="text"
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* zipcode */}
                <div className="flex flex-col w-1/2">
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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {/* state */}

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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              {/* country */}
              <div className="flex flex-row w-full">

                <div className="flex flex-col w-1/2">
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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {/* ID */}

                  {/* Year */}

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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="flex flex-col w-1/2">
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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {/* Password */}

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
                      className="block w-5/6 inputbox  rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={disable}
                className="flex w-1/12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}