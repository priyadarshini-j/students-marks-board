
import React, { useEffect, useState } from "react";
import "./App.css";

import StudentMarksBoard from "./features/component/studentMarksBoard.jsx";
import getStudentData from "./features/component/studentTable/getStudentdata/GetStudentData.jsx";
import addStudentData from "./features/component/addStudentForm/AddStudentData/addStudentData.jsx";
import deleteStudentData from "./features/component/studentTable/DeleteStudentData/deleteStudentData.jsx";
import editStudentData from "./features/component/studentTable/UpdateStudentData/editStudentData.jsx";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);


  useEffect(() => {

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const [data] = await Promise.all([
          getStudentData(),
          new Promise((resolve) => setTimeout(resolve, 2000))
        ]);

        setStudents(data);

      } catch (error) {
        setError("Failed to load student data. Please try again.");

      } finally {
        setLoading(false);
      }
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

  const handleEditStudent = async (student) => {
    if (selectedStudent === null) {
      setSelectedStudent(student);
      return;
    }

    const total =
      Number(student.tamil) +
      Number(student.english) +
      Number(student.maths) +
      Number(student.science) +
      Number(student.social);

    const percentage = total / 5;

    const updatedStudent = {
      ...student,
      total,
      percentage,
      result:
        Number(student.tamil) >= 35 &&
          Number(student.english) >= 35 &&
          Number(student.maths) >= 35 &&
          Number(student.science) >= 35 &&
          Number(student.social) >= 35
          ? "Pass"
          : "Fail"
    };

    try {
      const savedStudent = await editStudentData(
        selectedStudent.id,
        updatedStudent
      );

      setStudents((prevStudents) =>
        prevStudents.map((item) =>
          item.id === selectedStudent.id
            ? savedStudent
            : item
        )
      );

      setSelectedStudent(null);

    } catch (error) {
      console.error("Edit error:", error);
    }
  };
  return (
    <StudentMarksBoard
      students={students}
      loading={loading}
      error={error}
      selectedStudent={selectedStudent}
      handleAddStudent={handleAddStudent}
      handleDeleteStudent={handleDeleteStudent}
      handleEditStudent={handleEditStudent}
    />
  );
}

export default App;
