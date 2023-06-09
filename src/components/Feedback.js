import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackCard from "./FeedbackData";

export default function Feedback() {
  const [myData, setData] = useState(null);
  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await axios
        .get("http://65.2.30.68:8000/principalAllData")
        .then(async (res) => {
          const newArr = res.data.data.filter((x) => {
            return x.email === localStorage.getItem("email");
          });
          console.log("newArr[0]", newArr[0]);
          const resp = await axios
            .get(
              `http://65.2.30.68:8000/getFeedback?instituteId=${newArr[0].institutionId}`
            )
            .then((res2) => {
              return res2.data.data;
            });

          console.log("feed", resp);
          setData(resp);
          return res.data.data;
        });
    };
    fetchFeedback();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
      <div class="p-5 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
        <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
          <div class="font-bold text-3xl mb-2">Feedbacks Details</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem pra esentium nihil.
          </p>
          {myData &&
            myData.length > 0 &&
            myData.map((x) => {
              return <FeedbackCard feedbackData={x} />;
            })}
        </div>
      </div>
    </div>
  );
}
