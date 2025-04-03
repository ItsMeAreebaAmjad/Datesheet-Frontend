import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Logo1 from "../assets/images/Logo1.png";
import Logo2 from "../assets/images/logo1.jpeg";

dayjs.extend(customParseFormat);

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TemplateSheet = () => {
  const [rooms, setRooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [roomClash, setRoomClash] = useState(null);
  const [invigilatorClash, setInvigilatorClash] = useState(null);
  const [invigilators, setInvigilators] = useState([]);
  const [examType, setExamType] = useState("Final");
  const [discipline, setDiscipline] = useState("Software Engineering");
  const [semester, setSemester] = useState("7");
  const [sessionYear, setSessionYear] = useState("Fall 2024");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateSheet, setDateSheet] = useState([]);

  const [exams, setExams] = useState([
    { subject: "", isEditing: false },
    // Other exam rows...
  ]);
  const navigate = useNavigate();

  const [examSchedule, setExamSchedule] = useState([
    {
      date: new Date("2025-01-01"),
      day: "Monday",
      subject: "",
      invigilator: "",
      startTime: "02:15 PM",
      endTime: "03:45 PM",
      room: "",
    },
    {
      date: new Date("2025-01-02"),
      day: "Tuesday",
      subject: "",
      invigilator: "",
      startTime: "02:15 PM",
      endTime: "03:45 PM",
      room: "",
    },
    {
      date: new Date("2025-01-03"),
      day: "Wednesday",
      subject: "",
      invigilator: "",
      startTime: "02:15 PM",
      endTime: "03:45 PM",
      room: "",
    },
    {
      date: new Date("2025-01-04"),
      day: "Thursday",
      subject: "",
      invigilator: "",
      startTime: "02:15 PM",
      endTime: "03:45 PM",
      room: "",
    },
    {
      date: new Date("2025-01-05"),
      day: "Friday",
      subject: "",
      invigilator: "",
      startTime: "02:15 PM",
      endTime: "03:45 PM",
      room: "",
    },
  ]);

  const addNewRow = () => {
    setExamSchedule([
      ...examSchedule,
      {
        date: new Date(),
        day: "Monday",
        subject: "",
        invigilator: "",
        startTime: "02:15 PM",
        endTime: "03:45 PM",
        room: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedSchedule = examSchedule.filter((_, i) => i !== index);
    setExamSchedule(updatedSchedule);
  };

  const fetchSubjects = () => {
    axios
      .get("http://localhost:5000/subjects", {
        params: { discipline, semester },
      })
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const handleSave = async () => {
    const isEmpty = examSchedule.every(
      (exam) => !exam.subject && !exam.invigilator && !exam.room
    );

    if (isEmpty) {
      return; 
    }

    const filteredSchedule = examSchedule.filter(
      (exam) => exam.subject && exam.invigilator && exam.room
    );

    const requestData = {
      examType,
      discipline,
      semester,
      sessionYear,
      examSchedule: filteredSchedule,
    };

    console.log("Sending Request:", requestData);

    try {
      const response = await axios.post(
        "http://localhost:5000/save-datesheet",
        requestData
      );

      if (response.status === 200) {
        if (response.data.message.includes("Already Saved")) {
          setModalMessage("No Clash Detected ✅ (Already Saved)");
        } else {
          setModalMessage("No Clash Detected ✅");
        }
        setRoomClash(null);
        setInvigilatorClash(null);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error saving datesheet:", error);

      if (error.response) {
        const { roomClashes, invigilatorClashes } = error.response.data;

        if (roomClashes.length === 0 && invigilatorClashes.length === 0) {
          setModalMessage("No Clash Detected ✅");
          setRoomClash(null);
          setInvigilatorClash(null);
        } else {
          setRoomClash(roomClashes.length > 0 ? roomClashes.join("\n") : null);
          setInvigilatorClash(
            invigilatorClashes.length > 0 ? invigilatorClashes.join("\n") : null
          );
          setModalMessage("⚠ Clash Detected");
        }

        setIsModalOpen(true);
      } else {
        setModalMessage("Failed to save datesheet. Please try again.");
        setRoomClash(null);
        setInvigilatorClash(null);
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/rooms")
      .then((response) => {
        setRooms(response.data); 
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/invigilators")
      .then((response) => {
        setInvigilators(response.data);
      })
      .catch((error) => console.error("Error fetching invigilators:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/latestReviewInfo")
      .then((response) => {
        if (response.data) {
          setExamType(
            response.data.exam_type === "Midterm" ? "Mid-Term" : "Final-Term"
          );
          setDiscipline(
            response.data.discipline === "CS"
              ? "Computer Science"
              : "Software Engineering"
          );
          setSemester(response.data.semester);
          setSessionYear(response.data.session_year);
        }
      })
      .catch((error) => console.error("Error fetching review info:", error));
  }, []);

  useEffect(() => {
    const storedExamSchedule = localStorage.getItem("examSchedule");
    const storedExamType = localStorage.getItem("examType");
    const storedDiscipline = localStorage.getItem("discipline");
    const storedSemester = localStorage.getItem("semester");
    const storedSessionYear = localStorage.getItem("sessionYear");

    if (storedExamSchedule) {
      setExamSchedule(JSON.parse(storedExamSchedule));
    }
    if (storedExamType) setExamType(storedExamType);
    if (storedDiscipline) setDiscipline(storedDiscipline);
    if (storedSemester) setSemester(storedSemester);
    if (storedSessionYear) setSessionYear(storedSessionYear);

    // Agar page reload ho to localStorage clear ho jaye
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.clear();
      });
    };
  }, []);

  const handleChange = (index, field, value) => {
    const updatedSchedule = [...examSchedule];

    if (field === "startTime") {
      updatedSchedule[index].startTime = value;

      const newStartTime = dayjs(value, "hh:mm A");

      const newEndTime = newStartTime.add(90, "minute").format("hh:mm A");

      updatedSchedule[index].endTime = newEndTime;
    } else {
      updatedSchedule[index][field] = value;
    }

    setExamSchedule(updatedSchedule);
  };

  const handlePrint = () => {
    const formattedSchedule = examSchedule.map((exam) => ({
      ...exam,
      date:
        exam.date instanceof Date
          ? exam.date.toISOString().split("T")[0]
          : exam.date,
    }));

    localStorage.setItem("examSchedule", JSON.stringify(examSchedule));
    localStorage.setItem("examType", examType);
    localStorage.setItem("discipline", discipline);
    localStorage.setItem("semester", semester);
    localStorage.setItem("sessionYear", sessionYear);

    navigate("/ds-page", {
      state: {
        dateSheet: formattedSchedule,
        examType,
        discipline,
        semester,
        sessionYear,
      },
    });
  };

  const toggleEditMode = (index, mode) => {
    setExamSchedule((prevSchedule) =>
      prevSchedule.map((exam, i) =>
        i === index ? { ...exam, isEditing: mode } : exam
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div
            className={`p-6 rounded-lg shadow-lg text-center w-full max-w-sm sm:max-w-md border 
              ${modalMessage.includes("No Clash Detected") ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"}`}
          >
            <h2 className={`text-lg sm:text-2xl font-bold border-b pb-2 mb-4 
              ${modalMessage.includes("No Clash Detected") ? "text-green-700 border-green-300" : "text-red-700 border-red-300"}`}
            >
              {modalMessage}
            </h2>
  
            {modalMessage.includes("No Clash Detected") ? (
              <p className="text-green-700">Your datesheet is valid with no conflicts!</p>
            ) : (
              <>
                {roomClash && <p className="text-red-700">{roomClash}</p>}
                {invigilatorClash && <p className="text-yellow-800">{invigilatorClash}</p>}
              </>
            )}
  
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full px-4 py-2 text-sm sm:text-base font-bold rounded shadow-md 
                ${modalMessage.includes('No Clash Detected') ? 'bg-green-600 text-black hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}"
            >
              Close
            </button>
          </div>
        </div>
      )}
  
      {/* Main Container */}
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg text-center p-6 sm:p-10">
        <button
          onClick={() => navigate(-2)}
          className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded shadow-lg hover:bg-gray-700"
        >
          Go Back
        </button>
  
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <img src={Logo1} alt="Left Logo" className="h-16 sm:h-[130px] mb-2 sm:mb-0" />
          <div className="text-center">
            <p className="italic text-gray-600 text-sm sm:text-base">Department of Computer Science, New Campus</p>
            <h1 className="text-lg sm:text-2xl font-bold">UNIVERSITY OF ENGINEERING AND TECHNOLOGY, LAHORE</h1>
          </div>
          <img src={Logo2} alt="Right Logo" className="h-16 sm:h-[130px] mb-2 sm:mb-0" />
        </div>
  
        {/* Title */}
        <h2 className="text-sm sm:text-lg font-bold underline mb-6">
          {examType} Examinations Datesheet - B.Sc. {discipline} ({semester} Semester, {sessionYear})
        </h2>
  
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-200">
                {["Date", "Day", "Subject", "Invigilator", "Start Time", "End Time", "Room", "Actions"].map((heading) => (
                  <th key={heading} className="border border-gray-300 p-2">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((exam, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">
                    <DatePicker
                      selected={exam.date}
                      onChange={(date) => handleChange(index, "date", date)}
                      dateFormat="dd-MM-yyyy"
                      className="text-center border-none focus:ring-0 focus:outline-none w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      value={exam.day}
                      onChange={(e) => handleChange(index, "day", e.target.value)}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none"
                    >
                      {daysOfWeek.map((day) => <option key={day} value={day}>{day}</option>)}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={exam.subject}
                      onFocus={fetchSubjects}
                      onChange={(e) => handleChange(index, "subject", e.target.value)}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subj, idx) => <option key={idx} value={subj}>{subj}</option>)}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={exam.invigilator}
                      onChange={(e) => handleChange(index, "invigilator", e.target.value)}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none"
                    >
                      <option value="">Select Invigilator</option>
                      {invigilators.map((inv) => <option key={inv.id} value={inv.name}>{inv.name}</option>)}
                    </select>
                  </td>
                  <td className="border p-2">
                    <TimePicker
                      value={dayjs(exam.startTime, "hh:mm A")}
                      format="hh:mm A"
                      use12Hours
                      onChange={(time) => handleChange(index, "startTime", time.format("hh:mm A"))}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none"
                    />
                  </td>
                  <td className="border p-2">
                    <TimePicker
                      value={dayjs(exam.endTime, "hh:mm A")}
                      format="hh:mm A"
                      use12Hours
                      onChange={(time) => handleChange(index, "endTime", time.format("hh:mm A"))}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none"
                    />
                  </td>
                  <td className="border p-2">
                    <select
                      value={exam.room}
                      onChange={(e) => handleChange(index, "room", e.target.value)}
                      className="w-full text-center border-none focus:ring-0 focus:outline-none"
                    >
                      <option value="">Select Room</option>
                      {rooms.map((room, idx) => <option key={idx} value={room}>{room}</option>)}
                    </select>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteRow(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button onClick={addNewRow} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600">
            Add New Row
          </button>
          <button onClick={handleSave} className="flex-1 bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600">
            Save
          </button>
          <button onClick={handlePrint} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600">
            Print
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default TemplateSheet;
