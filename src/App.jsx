import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./features/component/header/Header";



import getStudentData from "./features/component/studentTable/getStudentdata/GetStudentData.jsx";
import addStudentData from "./features/component/addStudentForm/AddStudentData/addStudentData.jsx";
import deleteStudentData from "./features/component/studentTable/DeleteStudentData/deleteStudentData.jsx";
import editStudentData from "./features/component/studentTable/UpdateStudentData/editStudentData.jsx";
import Home from "./features/pages/Home/Home.jsx";
import StudentReport from "./features/pages/StudentReport/StudentReport.jsx";
import NotFound from "./features/pages/NotFound/NotFound.jsx";
import AddStudent from "./features/pages/addStudent/AddStudent.jsx";

function App() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // GET student data
  useEffect(() => {

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError("");

        const [data] = await Promise.all([
          getStudentData(),
          new Promise((resolve) =>
            setTimeout(resolve, 2000)
          )
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

  // POST - Add student
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
        Number(newStudent.tamil) >= 35 &&
          Number(newStudent.english) >= 35 &&
          Number(newStudent.maths) >= 35 &&
          Number(newStudent.science) >= 35 &&
          Number(newStudent.social) >= 35
          ? "Pass"
          : "Fail"
    };

    try {
      const savedStudent = await addStudentData(student);

      setStudents((prevStudents) => [
        ...prevStudents,
        savedStudent
      ]);

      return true;

    } catch (error) {
      console.error("Add error:", error);
      return false;
    }
  }

  // DELETE student
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

  // EDIT student
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
    <>
      {/* Common header for all pages */}
      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              students={students}
              loading={loading}
              error={error}
              handleDeleteStudent={handleDeleteStudent}
              handleEditStudent={handleEditStudent}
              selectedStudent={selectedStudent}
            />
          }
        />

        <Route
          path="/student/:id"
          element={<StudentReport />}
        />

        <Route
          path="/add"
          element={
            <AddStudent
              handleAddStudent={handleAddStudent}
              selectedStudent={selectedStudent}
              handleEditStudent={handleEditStudent}
            />
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}

export default App;