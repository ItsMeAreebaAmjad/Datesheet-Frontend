import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ReviewInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSession, selectedDiscipline, selectedSemester, selectedExamType } = location.state || {};

  const handleConfirm = async () => {
    try {
      const response = await axios.post("http://localhost:5000/reviewInfo", {
        selectedSession,
        selectedDiscipline,
        selectedSemester,
        selectedExamType,
      });

      if (response.status === 201) {
        toast.success("✅ Your Info is Saved!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
          style: { fontSize: "18px", textAlign: "center" }, 
        });

        setTimeout(() => {
          navigate("/template-sheet");
        }, 3000);
      }
    } catch (error) {
      toast.error("❌ Your Info is NOT Saved!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        style: { fontSize: "18px", textAlign: "center" }, 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 px-4">
      <ToastContainer />
      <div className="p-6 sm:p-8 max-w-lg w-full bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-gray-800">
          Review Your Information
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {[
            { label: "Session", value: selectedSession },
            { label: "Discipline", value: selectedDiscipline },
            { label: "Semester", value: selectedSemester },
            { label: "Exam Type", value: selectedExamType },
          ].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2">
              <p className="font-semibold text-gray-700">{item.label}:</p>
              <p className="text-gray-900 font-medium">{item.value || "Not Provided"}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <button
            onClick={() => navigate("/create-datesheet", { state: { selectedSession, selectedDiscipline, selectedSemester, selectedExamType } })}
            className="w-full sm:w-auto bg-gray-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition duration-200 transform hover:scale-105"
          >
            Back
          </button>

          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition duration-200 transform hover:scale-105"
          >
            Confirm & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;
