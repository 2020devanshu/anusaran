import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import Principal from "../components/Principal";
import Institute from "../components/Institute";
import { Link, useNavigate } from "react-router-dom/dist";
import { Navigate } from "react-router-dom/dist";
import Courses from "../components/Courses";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
        <div className="p-5 mt-10 md:mt-0 shadow-xl w-60 shadow-blue-300 border-4 rounded-lg">
          <h1 className="text-center font-bold text-2xl">👋 Admin</h1>
        </div>
        <div className="p-2 bg-slate-300">
          <div class="p-5 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2">👩‍🏫 Teachers</div>
              <p class="text-gray-700 text-base">
              Our institutional panel goes beyond administrative functions and also enables you to effortlessly create and manage teacher profiles. With a few simple steps, you can onboard teachers into the system, allowing them access to relevant features and resources. Provide necessary details such as name, contact information, qualifications, and areas of expertise, ensuring a comprehensive database of your teaching staff..
             </p>
            </div>
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2">👩 Students</div>
              <p class="text-gray-700 text-base">
              In addition to managing teachers, our institutional panel facilitates the seamless creation of student profiles. You can easily add students to the system, capturing essential information such as name, contact details, enrollment status, and program of study. By maintaining a comprehensive student database, you can efficiently monitor student progress, track academic performance, and provide timely support when needed.
              </p>
            </div>
            <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
              <div class="font-bold text-xl mb-2">📚 Courses</div>
              <p class="text-gray-700 text-base">
              Our panel simplifies the process of adding and managing courses within your institution. You can effortlessly input course details, including course name, code, description, and prerequisites. The system also allows you to assign instructors, set course schedules, and track enrollment statistics, giving you complete control over your institute's course offerings.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-600 h-[1px]"></div>
      <div className="flex flex-col justify-center bg-slate-300 p-10 items-center">
        <div class="p-5 md:space-x-16 space-y-10 items-center md:space-y-0 flex flex-col md:flex-row overflow-hidden">
          <div class="px-6 py-4 text-center shadow-blue-300 border-4 rounded-lg">
            <div class="font-bold text-3xl mb-2">Basic Rules</div>
            <p class="text-gray-700 text-base">
            <ul>
<li>Attendance and Punctuality: Students are expected to attend all classes regularly and arrive on time. Excessive absenteeism or tardiness may affect their academic progress and eligibility for certain privileges.</li>
<li></li>
<li>Code of Conduct: Students should adhere to a code of conduct that promotes respect, integrity, and ethical behavior. They should treat fellow students, teachers, and staff with respect, refrain from disruptive or disrespectful behavior, and maintain a positive learning environment.</li>
<li></li>
<li>Academic Integrity: Students should maintain high standards of academic integrity. They should avoid plagiarism, cheating, or any form of dishonesty in their academic work. All submitted assignments, projects, and examinations should reflect their original ideas and efforts.</li>
<li></li>
<li>Use of Technology: Students should use technology resources responsibly, adhering to any guidelines provided by the institution. They should respect the privacy and intellectual property rights of others and refrain from engaging in any illegal or inappropriate online activities.</li>
<li></li>
<li>Respect for Diversity: Students should embrace and respect diversity in all its forms, including cultural, religious, and individual differences. Discrimination, harassment, or any form of bullying will not be tolerated and may result in disciplinary actions.</li>
<li></li>
<li>Safety and Security: Students should prioritize their own safety as well as the safety of others. They should follow the institution's safety guidelines, report any potential hazards or concerns, and contribute to maintaining a secure and inclusive campus environment</li>
</ul>
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
