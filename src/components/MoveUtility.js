import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

function MovePage() {
  const [institutes, setInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubCourse, setSelectedSubCourse] = useState("");
  const [targetInstitute, setTargetInstitute] = useState("");
  const [targetCourse, setTargetCourse] = useState("");

  // fetch institutes, courses, subcourses on component mount
  useEffect(() => {
    // fetch institutes
    const fetchInstitutes = async () => {
      const response = await axios
        .get("http://65.1.211.146:8000/getAllInstitute")
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
      setInstitutes(newArr);
    };

    const fetchCourses = async () => {
      const response = await axios
        .get(
          `http://65.1.211.146:8000/getCourses?Institute=${selectedInstitute}`
        )
        .then((res) => {
          return res.data.data;
        });
      const newArr = response.map((x) => {
        return {
          label: x.course,
          value: x.course_id,
        };
      });
      console.log("responsec", response);
      setCourses(newArr);
    };

    fetchInstitutes();
    fetchCourses();
  }, [selectedInstitute]);

  // function to handle moving of course
  const moveCourse = () => {
    axios
      .put(
        `http://65.1.211.146:8000/updateCoursesById?course_id=${selectedCourse}`,
        {
          Institute: targetInstitute,
        }
      )
      .then((response) => {
        alert("Course moved successfully");
      })
      .catch((error) => {
        console.error("Error moving course", error);
      });
  };

  // function to handle moving of subcourse
  const moveSubCourse = () => {
    axios
      .put(`/api/subcourses/${selectedSubCourse}`, { course_id: targetCourse })
      .then((response) => {
        alert("Subcourse moved successfully");
      })
      .catch((error) => {
        console.error("Error moving subcourse", error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Move Page</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Move Course</h2>
        <Select
          options={institutes}
          onChange={(x) => {
            console.log("value", x);
            setSelectedInstitute(x.value);
          }}
        />
        <Select
          options={courses}
          onChange={(x) => {
            console.log("value", x);
            setSelectedCourse(x.value);
          }}
        />
        <p>move to which institue?</p>
        <Select
          options={institutes}
          onChange={(x) => {
            console.log("value", x);
            setTargetInstitute(x.value);
          }}
        />
        <button
          onClick={moveCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Move Course
        </button>
      </div>

      <div>
        {/* <h2 className="text-2xl font-semibold mb-2">Move Subcourse</h2>
        <Dropdown
          options={courses}
          value={selectedCourse}
          onChange={setSelectedCourse}
        />
        <Dropdown
          options={subCourses}
          value={selectedSubCourse}
          onChange={setSelectedSubCourse}
        />
        <Dropdown
          options={courses}
          value={targetCourse}
          onChange={setTargetCourse}
        />
        <button
          onClick={moveSubCourse}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Move Subcourse
        </button> */}
      </div>
    </div>
  );
}

export default MovePage;
