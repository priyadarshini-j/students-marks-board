
import React from "react";
import { useNavigate } from "react-router-dom";
import './AddStudent.css';

import useStudents from "../../../hooks/useStudents";
import AddStudentForm from "../../component/addStudentForm/AddStudentForm";

function AddStudent() {

    const navigate = useNavigate();

    const {
        addStudent,
        selectedStudent,
        updateStudent
    } = useStudents();

    const handleSubmit = async (student) => {

        const success = selectedStudent
            ? await updateStudent(student)
            : await addStudent(student);

        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="student-board-container">

            <h2 className="flex mt-5 mr-[300px] -mb-5 ml-[350px] font-bold text-2xl">
                {selectedStudent
                    ? "Update Existing Student"
                    : "Add New Student"}
            </h2>

            <AddStudentForm
                onSubmitStudent={handleSubmit}
                selectedStudent={selectedStudent}
            />

        </div>
    );
}

export default AddStudent;
