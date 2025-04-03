import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const CreateDateSheet = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setSelectedSession(location.state.selectedSession || "");
      setSelectedDiscipline(location.state.selectedDiscipline || "");
      setSelectedSemester(location.state.selectedSemester || "");
      setSelectedExamType(location.state.selectedExamType || "");
    }
  }, [location.state]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/sessions");
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleAddSession = async () => {
    if (!newSession.trim()) {
      alert("Session year cannot be empty!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/sessions", {
        session_year: newSession,
      });
      setSessions([...sessions, response.data]);
      setNewSession("");
    } catch (error) {
      console.error("Error adding session:", error);
      alert("Failed to add session!");
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/sessions/${id}`);
      setSessions(sessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!selectedSession) newErrors.session = "Session is required";
    if (!selectedDiscipline) newErrors.discipline = "Discipline is required";
    if (!selectedSemester) newErrors.semester = "Semester is required";
    if (!selectedExamType) newErrors.examType = "Exam Type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      navigate("/review-info", {
        state: { selectedSession, selectedDiscipline, selectedSemester, selectedExamType },
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4">
      <button
    onClick={() => navigate("/")}
    className="absolute top-4 left-4 sm:top-4 sm:left-4 bg-gray-800 text-white px-3 py-2 rounded shadow-lg hover:bg-gray-700"
  >
    Go Back
  </button>
      <div className="p-6 sm:p-8 max-w-md sm:max-w-lg md:max-w-xl w-full bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Datesheet
        </h2>

        {/* Select Session with Dropdown */}
        <div className="mb-6 relative">
          <label className="block font-medium text-gray-700 mb-2">Select Session:</label>
          <div
            className="border rounded-md shadow-sm p-3 flex justify-between items-center bg-white cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{selectedSession || "Select a session"}</span>
            <IoMdArrowDropdown size={20} className="text-gray-500" />
          </div>

          {dropdownOpen && (
            <div className="absolute w-full bg-white border rounded-md shadow-md mt-1 max-h-40 overflow-auto z-10">
              {sessions.length === 0 ? (
                <p className="p-3 text-gray-500">No sessions available</p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session._id}
                    className="flex justify-between items-center p-3 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedSession(session.session_year);
                      setDropdownOpen(false);
                    }}
                  >
                    <span>{session.session_year}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(session.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
          {errors.session && <p className="text-red-500 text-sm">{errors.session}</p>}
        </div>

        {/* Add New Session */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Add New Session:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="p-3 border rounded-md flex-grow shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter New Session"
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
              onClick={handleAddSession}
            >
              Add
            </button>
          </div>
        </div>

        {/* Select Discipline */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Discipline:</label>
          <select
            className="w-full p-3 border rounded-md shadow-sm"
            value={selectedDiscipline}
            onChange={(e) => setSelectedDiscipline(e.target.value)}
          >
            <option value="">Choose Discipline</option>
            <option value="CS">Computer Science</option>
            <option value="SE">Software Engineering</option>
          </select>
          {errors.discipline && <p className="text-red-500 text-sm">{errors.discipline}</p>}
        </div>

        {/* Select Semester */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Semester:</label>
          <select
            className="w-full p-3 border rounded-md shadow-sm"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Choose Semester</option>
            {[...Array(8).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                Semester {i + 1}
              </option>
            ))}
          </select>
          {errors.semester && <p className="text-red-500 text-sm">{errors.semester}</p>}
        </div>

        {/* Select Exam Type */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-2">Select Exam Type:</label>
          <select
            className="w-full p-3 border rounded-md shadow-sm"
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
          >
            <option value="">Choose Exam Type</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final</option>
          </select>
          {errors.examType && <p className="text-red-500 text-sm">{errors.examType}</p>}
        </div>

        {/* Next Button */}
        <button onClick={handleNext} className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateDateSheet;
