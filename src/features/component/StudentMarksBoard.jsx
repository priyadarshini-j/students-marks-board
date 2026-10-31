import React from "react";
import Header from "./header/Header";
import StateCards from "./stateCards/StateCards";
import './StudentMarksBoard.css';
import AddStudentForm from "./addStudentForm/AddStudentForm";
import StudentTable from "./studentTable/StudentTable";
function StudentMarksBoard() {
    return<div className="student-board-container">
        <Header/>
        <StateCards/>
        <AddStudentForm/>
        <StudentTable/>
    </div>

}
export default StudentMarksBoard;