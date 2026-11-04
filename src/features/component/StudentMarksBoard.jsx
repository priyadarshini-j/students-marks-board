import React from "react";
import Header from "./header/Header";
import StateCards from "./stateCards/StateCards";
import './StudentMarksBoard.css';
import AddStudentForm from "./addStudentForm/AddStudentForm";
import StudentTable from "./studentTable/StudentTable";
function StudentMarksBoard({ students, handleAddStudent ,handleDeleteStudent,handleEditStudent,loading,error,selectedStudent,}) {
    

    return<div className="student-board-container">
        <StateCards students={students} />
        {/* <AddStudentForm onAddStudent={handleAddStudent} handleEditStudent={handleEditStudent} selectedStudent={selectedStudent}/> */}
        <StudentTable students={students} handleDeleteStudent={handleDeleteStudent} handleEditStudent={handleEditStudent}
         loading={loading}
         error={error}
        />
    </div>

}
export default StudentMarksBoard;