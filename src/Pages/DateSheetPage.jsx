import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";
import Logo1 from "../assets/images/Logo1.png";
import Logo2 from "../assets/images/logo1.jpeg";

const DateSheetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const datesheetRef = useRef();

  const { dateSheet = [], examType, discipline, semester, sessionYear } = location.state || {};

  useEffect(() => {
    console.log("Received DateSheet Data:", dateSheet);
  }, [dateSheet]);

  const handleDownload = () => {
    setTimeout(() => {
      if (!datesheetRef.current) return;

      console.log("Downloading PDF...");
      console.log("Element Found:", datesheetRef.current);
      
      const opt = {
        margin: [0.2, 1, 0.2, 3.5],
        filename: "datesheet.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 5, width: 1080, height: 1500 },
        jsPDF: { unit: "px", format: [1080, 1500], orientation: "portrait" },
      };
      html2pdf().from(datesheetRef.current).set(opt).save();
    }, 500);
  };
 
  
  const formattedDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700 p-4 relative">
      {/* Responsive Back & Download Buttons */}
      <div className="w-full flex justify-between items-center absolute top-4 px-4 sm:px-10">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-800 text-white rounded shadow-lg hover:bg-gray-700 text-xs sm:text-sm"
        >
          Back to Template
        </button>
        <button 
          onClick={handleDownload} 
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 text-xs sm:text-sm"
        >
          Download PDF
        </button>
      </div>
  
      {/* Main Container */}
      <div ref={datesheetRef} className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 sm:p-10 mt-16 ml-6 sm:ml-12">

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
          <table className="w-full border border-gray-300 text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-200">
                {["Date", "Day", "Subject", "Invigilator Name", "Start Time", "End Time", "Room"].map((heading) => (
                  <th key={heading} className="border border-gray-300 p-2 sm:p-3">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
  {dateSheet.length > 0 ? (
    dateSheet
      .filter((exam) => exam.subject && exam.invigilator && exam.room) // Filter out rows with missing values
      .map((exam, index) => (
        <tr key={index} className="text-center">
          <td className="border border-gray-300 p-2 sm:p-3">{formattedDate(exam.date)}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.day || "N/A"}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.subject}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.invigilator}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.startTime || "N/A"}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.endTime || "N/A"}</td>
          <td className="border border-gray-300 p-2 sm:p-3">{exam.room}</td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="7" className="border border-gray-300 p-3 text-center">
        No Data Available
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
  
        {/* Notes Section */}
        <div className="mt-6 text-xs sm:text-sm text-gray-700 text-left">
          <p className="font-bold">Note:</p>
          <ul className="list-disc list-inside italic">
            <li>Only registered students will be allowed to sit in the exam hall.</li>
            <li>Exams will be conducted by concerned teachers.</li>
            <li>Exchange of calculators or any other item is NOT ALLOWED during examination.</li>
            <li>Use of mobile phones is strictly prohibited in examination halls.</li>
            <li>Anyone found using mobile phones or unfair means shall be dealt under university disciplinary rules.</li>
            <li>Students have to display their CNIC in examination centers. If they do not possess CNIC, University/Library Cards are also acceptable.</li>
          </ul>
        </div>
  
        {/* Signatures Section */}
        <div className="flex flex-col sm:flex-row justify-between mt-10 text-xs sm:text-sm">
          <div className="text-left mb-4 sm:mb-0">
            <p className="font-bold text-sm sm:text-lg">Dr. Qurat-ul-Ain Akram</p>
            <p className="text-gray-600">Convener Semester Cell</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm sm:text-lg">Prof. Dr. Shahzad Asif</p>
            <p className="text-gray-600">Chairman</p>
            <p className="text-gray-600">Dept. of Computer Science</p>
            <p className="text-gray-600">New Campus</p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default DateSheetPage;