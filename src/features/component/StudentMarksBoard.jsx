<<<<<<< HEAD
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
=======
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
>>>>>>> 6cc08d4 (updated student board)
export default StudentMarksBoard;