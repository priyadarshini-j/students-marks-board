
import React, { useEffect, useState } from "react";
import "./App.css";

import studentsData from "./data/data.js";
import StudentMarksBoard from "./features/component/studentMarksBoard.jsx";
import getStudentData from "./features/component/studentTable/getStudentdata/GetStudentData.jsx";
import addStudentData from "./features/component/addStudentForm/AddStudentData/addStudentData.jsx";
import deleteStudentData from "./features/component/studentTable/DeleteStudentData/deleteStudentData.jsx";

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudentData();
      setStudents(data);
    };

    fetchStudents();
  }, []);
  async function handleAddStudent(newStudent) {

    const total =
      Number(newStudent.tamil) +
      Number(newStudent.english) +
      Number(newStudent.maths) +
      Number(newStudent.science) +
      Number(newStudent.social);

    const percentage = total / 5;

    const student = {
      ...newStudent,
      total,
      percentage,
      result:
        newStudent.tamil >= 35 &&
          newStudent.english >= 35 &&
          newStudent.maths >= 35 &&
          newStudent.science >= 35 &&
          newStudent.social >= 35
          ? "Pass"
          : "Fail"
    };

    try {
      const savedStudent = await addStudentData(student);

      setStudents((prevStudents) => [
        ...prevStudents,
        savedStudent
      ]);

    } catch (error) {
      console.error(error);
    }
  }

const handleDeleteStudent = async (id) => {
    try {
        await deleteStudentData(id);

        setStudents((prevStudents) =>
            prevStudents.filter((item) => item.id !== id)
        );

    } catch (error) {
        console.error("Delete error:", error);
    }
};


  return (
    <StudentMarksBoard
      students={students}
      handleAddStudent={handleAddStudent}
      handleDeleteStudent={handleDeleteStudent}
    />
  );
}

export default App;
