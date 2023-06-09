import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "../StudentAttendance.module.css";

// Setup the localizer by providing the moment (or globalize) Object
const localizer = momentLocalizer(moment);

function StudentAttendance({ data }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [events, setEvents] = useState([]);

  // Extract unique students when the component mounts
  useEffect(() => {
    const uniqueStudents = [...new Set(data.map((record) => record.name))];
    setStudents(uniqueStudents);
  }, [data]);

  // Create events for the calendar when a student is selected
  useEffect(() => {
    if (selectedStudent) {
      const studentAttendance = data.filter(
        (record) => record.name === selectedStudent
      );
      const studentEvents = studentAttendance.map((record) => ({
        title: record.isPersent === "1" ? "Present" : "Absent",
        start: new Date(record.date),
        end: new Date(record.date),
        allDay: true,
        resource: record.isPersent === "1" ? "Present" : "Absent",
      }));
      setEvents(studentEvents);
    }
  }, [selectedStudent, data]);

  // Handle dropdown selection change
  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  // Custom event style
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = event.resource === "Present" ? "#5cb85c" : "#d9534f";
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <div className={styles.attendanceTracker}>
      <h1 className={styles.header}>Attendance Tracker</h1>
      <select onChange={handleStudentChange} className={styles.dropdown}>
        <option>Select a student</option>
        {students.map((student, index) => (
          <option key={index}>{student}</option>
        ))}
      </select>
      {selectedStudent && (
        <div className={styles.calendarContainer}>
          <h2>Attendance for {selectedStudent}</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      )}
    </div>
  );
}

export default StudentAttendance;
