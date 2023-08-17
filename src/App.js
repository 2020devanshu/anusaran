import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import DeptCreation from "./components/DepartmentCreation";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherCreation from "./components/TeacherCreation";
import StudentCreation from "./components/StudentCreation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import PrincipalLogin from "./pages/PrincipalLogin";
import InstituteCreation from "./components/InstituteCreation";
import InstituteView from "./components/InstituteView";
import CourseCreation from "./components/CourseCreation";
import { redirect } from "react-router-dom";
import InstituteById from "./components/ViewInstitueById";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PrincipalCreation from "./components/PrincipalCreation";
import Courses from "./components/Courses";
import CourseDesc from "./components/CourseDesc";
import SubCourseCreation from "./components/SubCourseCreation";
import SubCourse from "./components/SubCourse";
import Feedback from "./components/Feedback";
import "./App.css";
import { AppProvider } from "./components/AppContext";
import ViewAssignment from "./components/MoveUtility";
import UploadVideos from "./components/MoveUtility";
import MovePage from "./components/MoveUtility";
import Calendar from "./components/Calendar";
import MyCalendar from "./components/Calendar";
import Student from "./components/Student";
import AddVideo from "./components/AddVideo";
import Assignments from "./components/Assignments";
import Teacher from "./components/Teacher";
import AssignmentCreation from "./components/AssignmentCreation";

const App = () => {
  const [token, setToken] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const getToken = async () => {
      setToken(localStorage.getItem("token"));
      setrole(localStorage.getItem("role"));
    };

    getToken();
  }, [token, role, []]);

  return (
    <AppProvider>
      {token ? (
        <div className="flex">
          <NavBar />
          <div className="w-full ">
            <Routes>
              {role === "admin" ? (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="institute-list" element={<InstituteView />} />
                
                </>
              ) : (
                <>
                  <Route path="/" element={<PrincipalDashboard />} />
                  <Route
                    path="principal-dashboard"
                    element={<PrincipalDashboard />}
                  />
                </>
              )}

              <Route path="teacher-creation" element={<TeacherCreation />} />
              <Route path="student-creation" element={<StudentCreation />} />
              <Route path="students" element={<Student />} />

              <Route
                path="principal-creation"
                element={<PrincipalCreation />}
              />
              <Route
                path="assignment-creation"
                element={<AssignmentCreation />}
              />
              <Route path="course-creation" element={<CourseCreation />} />
              <Route path="dept-creation" element={<DeptCreation />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="calendar" element={<MyCalendar />} />

              <Route
                path="institute-creation"
                element={<InstituteCreation />}
              />
              <Route path="move" element={<MovePage />} />
              <Route
                path="/institute-list/institute/:id"
                element={<InstituteById />}
              />
              <Route path="course/:id" element={<CourseDesc />} />
              <Route path="courses/course/:id" element={<CourseDesc />} />
              <Route path="assignments" element={<Assignments />} />

              <Route
                path="course/:id/create-subcourse/:id"
                element={<SubCourseCreation />}
              />
              <Route
                path="create-subcourse/:id"
                element={<SubCourseCreation />}
              />
              <Route path="addvideo/:id" element={<AddVideo />} />
              <Route path="subcourse/:id" element={<SubCourse />} />
              <Route path="course/:id/subcourse/:id" element={<SubCourse />} />
              <Route
                path="/institute-list/institute/:id/create-principal/:id"
                element={<PrincipalCreation />}
              />
              <Route
                path="/institute-list/institute/:id/create-teacher/:id"
                element={<TeacherCreation />}
              />
              <Route
                path="/institute-list/institute/:id/create-student/:id"
                element={<StudentCreation />}
              />
              <Route path="/courses" element={<Courses />} />
              <Route path="/teacher" element={<Teacher />} />

            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="principal-login" element={<PrincipalLogin />} />
          </Routes>
        </>
      )}
    </AppProvider>
  );
};

export default App;
