import React from "react";
import Header from "./header/Header";
import StateCards from "./stateCards/StateCards";
import './StudentMarksBoard.css';
import AddStudentForm from "./addStudentForm/AddStudentForm";
import StudentTable from "./studentTable/StudentTable";
function StudentMarksBoard({ students, handleAddStudent }) {
    

    return<div className="student-board-container">
        <Header/>
        <StateCards students={students} />
        <AddStudentForm onAddStudent={handleAddStudent}/>
        <StudentTable students={students} 
        />
    </div>

}
export default StudentMarksBoard;