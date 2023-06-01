import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from "../mainLogo.jpg";

export default function PrincipalLogin() {
  const navigate = useNavigate();
  const [error, seterror] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("data", data);
    e.preventDefault();
    axios
      .post("http://65.2.30.68:8000/LoginUser", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log("p details", res.data.data);

        // Call the verify endpoint after successful login
        if (res.data.msg === "Principal has login") {
          axios
            .post("http://65.2.30.68:8000/verify", {
              token: res.data.data,
            })
            .then((verificationResponse) => {
              console.log(
                "Verification successful:",
                verificationResponse.data
              );
              localStorage.setItem("token", res.data.data);
              localStorage.setItem("role", "principal");
              localStorage.setItem("email", data.email);

              navigate("/principal-dashboard");
              window.location.reload(true);
            })
            .catch((verificationError) => {
              console.log("Verification failed:", verificationError);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        seterror(true);
      });
  };
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={mainLogo}
            alt="Logo"
            className="mx-auto h-24 w-auto border-4"
          />
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            👋  Institutional Admin 
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  onChange={handleInput}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleInput}
                  className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && (
              <h3 className="text-red-500">Incorrect email/password</h3>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
