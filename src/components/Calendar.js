import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import Select from "react-select";
import DateTimePicker from "react-datetime-picker";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

function MyCalendar() {
  Modal.setAppElement("#root");

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "#378006";
    if (event.type === "assignment") {
      backgroundColor = "#ff0000";
    }
    const style = {
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [teacherModalIsOpen, setTeacherModalIsOpen] = useState(false);
  const [assignmentModalIsOpen, setAssignmentModalIsOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignmentDueDate, setAssignmentDueDate] = useState(new Date());
  const [assignments, setAssignments] = useState([]);

  const handleEventClick = (event) => {
    setSelectedDate(event.start);
    setSelectedEndDate(event.end);
    setSelectedEvent(event);
    setEventModalIsOpen(true);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "black",
    }),
  };

  useEffect(() => {
    // Fetch the events from the API when the component mounts
    const getteacher = axios.get("http://65.1.211.146:8000/getTeacherModule");

    const getAssignm = axios.get("http://65.1.211.146:8000/getAllAssignment");

    axios.all([getteacher, getAssignm]).then(
      axios.spread((...responses) => {
        const teacherEventsResponse = responses[0];
        const assignmentEventsResponse = responses[1];

        // Transform the teacher events data into the format required by react-big-calendar
        const transformedTeacherEvents = teacherEventsResponse.data.data.map(
          (event) => {
            if (event.teachDate && event.startTime && event.endTime) {
              return {
                title: "some",
                start: new Date(event.teachDate + "T" + event.startTime + "Z"),
                end: new Date(event.teachDate + "T" + event.endTime + "Z"),
                type: "teacher",
                id: event.id,
              };
            }
          }
        );
        const transformedAssignmentEvents =
          assignmentEventsResponse.data.data.map((assignment) => {
            console.log("assignment", assignment);
            return {
              title: assignment.assignmentsName,
              start: new Date(assignment.lastDate + "T" + "00:30:00.000Z"),
              end: new Date(assignment.lastDate + "T" + "00:30:00.000Z"),
              type: "assignment",
            };
          });
        setEvents([
          ...transformedTeacherEvents,
          ...transformedAssignmentEvents,
        ]);
      })
    );

    // Transform the assignment events data into the format required by react-big-calendar

    // Combine the teacher events and assignment events and update the events state

    // Fetch the teachers from the API when the component mounts
    axios.get("http://65.1.211.146:8000/getAllTeacher").then((res) => {
      setTeachers(
        res.data.data.map((teacher) => ({
          value: teacher.user_id,
          label: teacher.name,
        }))
      );
    });
    axios.get("http://65.1.211.146:8000/getAllAssignment").then((res) => {
      console.log("res.data.data", res.data.data);
      setAssignments(
        res.data.data.map((assignment) => ({
          value: assignment.id,
          label: assignment.assignmentsName,
        }))
      );
    });
  }, []);

  useEffect(() => {
    console.log("events", events);
  }, [events]);

  useEffect(() => {
    if (selectedTeacher) {
      // Fetch the courses for the selected teacher when it changes
      axios.get(`http://65.1.211.146:8000/getCoursesAll`).then((res) => {
        setCourses(
          res.data.data.map((course) => ({
            value: course.course_id,
            label: course.course,
          }))
        );
      });
    }
  }, [selectedTeacher]);

  const handleSelectForTeacher = ({ start, end }) => {
    setSelectedDate(start);
    setTeacherModalIsOpen(true);
  };
  const handleSelectForAssignment = ({ start, end }) => {
    setAssignmentDueDate(new Date());
    setAssignmentModalIsOpen(true);
  };

  const handleSubmit = () => {
    let date = new Date(selectedDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Ensure hours and minutes are two digits
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    let time24hrStart = `${hours}:${minutes}`;

    let date2 = new Date(selectedEndDate);
    let hours2 = date2.getHours();
    let minutes2 = date2.getMinutes();

    // Ensure hours and minutes are two digits
    hours2 = ("0" + hours2).slice(-2);
    minutes2 = ("0" + minutes2).slice(-2);

    let time24hrEnd = `${hours2}:${minutes2}`;

    axios
      .post("http://65.1.211.146:8000/insertTeacherModule", {
        courseId: selectedCourse,
        userId: selectedTeacher,
        teachDate: selectedDate,
        startTime: time24hrStart,
        endTime: time24hrEnd,
      })
      .then((res) => {
        setEvents([
          ...events,
          {
            start: time24hrStart,
            end: time24hrEnd,
            title: `${selectedTeacher.label} - ${selectedCourse.label}`,
          },
        ]);
        setModalIsOpen(false);
      });
  };

  const handleEventUpdate = () => {
    console.log("selected", selectedDate);
    // Update the selected event with the new start and end dates
    let date = new Date(selectedDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Ensure hours and minutes are two digits
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);

    let time24hrStart = `${hours}:${minutes}`;

    let date2 = new Date(selectedEndDate);
    let hours2 = date2.getHours();
    let minutes2 = date2.getMinutes();

    // Ensure hours and minutes are two digits
    hours2 = ("0" + hours2).slice(-2);
    minutes2 = ("0" + minutes2).slice(-2);

    let time24hrEnd = `${hours2}:${minutes2}`;
    axios
      .put(
        `http://65.1.211.146:8000/updateTeacherModule?id=${selectedEvent.id}`,
        {
          start: date,
          end: date2,
          // ... other data
        }
      )
      .then((res) => {
        // ... other code
      });
  };

  const handleEventDelete = () => {
    // Delete the selected event
    axios
      .delete(
        `http://65.1.211.146:8000/deleteTeacherModule?id=${selectedEvent.id}`
      )
      .then((res) => {
        // ... other code
        alert(res);
      });
  };

  return (
    <div className="flex justify-center content-center h-screen sticky w-full">
      <div
        className={`${teacherModalIsOpen || eventModalIsOpen ? "" : "h-full"}`}
      >
        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSelectForTeacher}
          className="h-full"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
        />
      </div>
      <Modal
        isOpen={teacherModalIsOpen}
        onRequestClose={() => setTeacherModalIsOpen(false)}
        style={{
          content: {
            backgroundColor: "white", // Or any other opaque color
          },
        }}
        contentLabel="Assign Course"
      >
        <h2 className="text-xl font-bold mb-4">Assign Course</h2>
        <Select
          options={teachers}
          //   value={selectedTeacher}
          onChange={(x) => setSelectedTeacher(x.value)}
          className="mb-4"
          styles={customStyles}
        />
        <Select
          options={courses}
          //   value={selectedCourse}
          onChange={(x) => setSelectedCourse(x.value)}
          className="mb-4"
          styles={customStyles}
        />
        <div>
          <DateTimePicker
            onChange={(x) => {
              console.log("start", x);
              setSelectedDate(x);
            }}
            value={selectedDate}
          />
        </div>
        <div>
          <DateTimePicker
            onChange={(x) => {
              setSelectedEndDate(x);
              console.log("end", selectedEndDate);
            }}
            value={selectedEndDate}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Assign Course
        </button>
      </Modal>

      <Modal
        style={{
          content: {
            zIndex: 100, // Or any other opaque color
          },
        }}
        isOpen={eventModalIsOpen}
        onRequestClose={() => setEventModalIsOpen(false)}
        contentLabel="Event Details"
      >
        {selectedEvent && (
          <>
            <h2>{selectedEvent.title}</h2>
            <p>Type: {selectedEvent.type}</p>
            <div>
              <DateTimePicker
                onChange={(x) => {
                  console.log("start", x);
                  setSelectedDate(x);
                }}
                value={selectedDate}
              />
            </div>
            <div>
              <DateTimePicker
                onChange={(x) => {
                  setSelectedEndDate(x);
                  console.log("end", selectedEndDate);
                }}
                value={selectedEndDate}
              />
            </div>
            {/* Display other event details here */}
            <button
              onClick={handleEventUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update time
            </button>
            <button
              onClick={handleEventDelete}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}

export default MyCalendar;
