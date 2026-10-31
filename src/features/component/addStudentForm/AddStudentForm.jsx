import React from "react";
import './AddStudentForm.css';
function AddStudentForm() {
    return <div className="student-form-container">
        <div className="add-student-form">Add Student</div>
        <div>
            <input className="add-student-details" type="text" placeholder="Student Name" />
            <input className="add-student-details" type="text" placeholder="Tamil" />
            <input className="add-student-details" type="text" placeholder="English" />
            <input className="add-student-details" type="text" placeholder="Maths" />
            <input className="add-student-details" type="text" placeholder="Science" />
            <input className="add-student-details" type="text" placeholder="Social" />
            <button className="add-button">Add Student</button>
        </div>
    </div>

}
export default AddStudentForm;