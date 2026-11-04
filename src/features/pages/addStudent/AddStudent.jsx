import React from "react";
import { useNavigate } from "react-router-dom";

import AddStudentForm from "../../../features/component/addStudentForm/AddStudentForm";
import './AddStudent.css';

function AddStudent({
    handleAddStudent,
    selectedStudent,
    handleEditStudent
}) {

    const navigate = useNavigate();

    const handleSubmit = async (student) => {

        const success = await handleAddStudent(student);

        if (success) {
            navigate("/");
        }
    };

    // Update student
    const handleUpdate = async (student) => {

        const success = await handleEditStudent(student);

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="student-board-container">

            <h2 className="new-student">
                {selectedStudent ? "Update Student" : "Add New Student"}
            </h2>

            <AddStudentForm
                onAddStudent={handleSubmit}
                selectedStudent={selectedStudent}
                handleEditStudent={handleUpdate}
            />

        </div>
    );
}

export default AddStudent;