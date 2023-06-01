import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Principal() {
  const [data, setData] = useState({
    depName: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://65.2.30.68:8000/insertDepartment", {
        departmentName: data.depName,
      })
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col justify-center bg-slate-300 p-10 md:pl-36 items-center">
      <div class="p-5 md:ml-44 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
        <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
          <div class="font-bold text-3xl mb-2">Principal Details</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
          <div class="flex flex-col items-center justify-center m-10 space-y-10 md:space-y-0 md:flex-row md:space-x-20"></div>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <label
            htmlFor="depName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Department Name
          </label>
        </div>
        <div className="mt-2">
          <input
            id="depName"
            name="depName"
            type="text"
            required
            onChange={handleInput}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button>
          Create Department
        </button>
      </form>
    </div>
  );
}
