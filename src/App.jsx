
import React, { useEffect, useState } from "react";
import "./App.css";

import studentsData from "./data/data.js";
import StudentMarksBoard from "./features/component/studentMarksBoard.jsx";

function App() {
  const [students, setStudents] = useState(studentsData);

  // const [students, setStudents] = useState(() => {
  //   const savedData = localStorage.getItem("students");

  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);

  //     // Combine default data and saved data
  //     const combinedData = [
  //       ...studentsData,
  //       ...parsedData.filter(
  //         saved => !studentsData.some(
  //           item => item.id === saved.id
  //         )
  //       )
  //     ];

  //     return combinedData;
  //   }

  //   return studentsData;
  // });

  // // Save student data
  // useEffect(() => {
  //   localStorage.setItem("students", JSON.stringify(students));
  // }, [students]);

  function handleAddStudent(newStudent) {

    const total =
      Number(newStudent.tamil) +
      Number(newStudent.english) +
      Number(newStudent.maths) +
      Number(newStudent.science) +
      Number(newStudent.social);

    const percentage = total / 5;
    setStudents((prevStudents) => {

      const student = {
        id: Date.now(),
        sno: prevStudents.length + 1,
        ...newStudent,
        total,
        percentage,
        result: newStudent.tamil >= 35 &&
          newStudent.english >= 35 &&
          newStudent.maths >= 35 &&
          newStudent.science >= 35 &&
          newStudent.social >= 35 ? "Pass" : "Fail"
      };

      return [...prevStudents, student];
    });
  }

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((item) => item.id !== id)
    );
  };
  return (
    <StudentMarksBoard
      students={students}
      handleAddStudent={handleAddStudent}
    />
  );
}

export default App;
