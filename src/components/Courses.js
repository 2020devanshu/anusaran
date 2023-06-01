import React, { useState } from "react"
import axios from "axios"

export default function Courses() {
    const [myData, setData] = useState([])

    const fetchCourseData = () => {
        axios.get("")
        .then((response) => setData(response.data.data))
    }

return (
  <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
    <div class="p-5 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
      <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
        <div class="font-bold text-3xl mb-2">Course Details</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  </div>
);
}