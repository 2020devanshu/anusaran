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
    <div>
      {token ? (
        <>
          <NavBar />
          <Routes>
            {role === "admin" ? (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
            <Route path="principal-creation" element={<PrincipalCreation />} />
            <Route path="course-creation" element={<CourseCreation />} />
            <Route path="dept-creation" element={<DeptCreation />} />
            <Route path="feedback" element={<Feedback />} />

            <Route path="institute-creation" element={<InstituteCreation />} />
            <Route path="institute-list" element={<InstituteView />} />
            <Route
              path="/institute-list/institute/:id"
              element={<InstituteById />}
            />
            <Route path="course/:id" element={<CourseDesc />} />
            <Route
              path="course/:id/create-subcourse/:id"
              element={<SubCourseCreation />}
            />
            <Route
              path="course/:id/create-subcourse/:id/course/:id"
              element={<SubCourse />}
            />
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
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="principal-login" element={<PrincipalLogin />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
