import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './AddStudent.css';

import { addStudent } from "../../students/studentsSlice";
import AddStudentForm from "../../component/addStudentForm/AddStudentForm";

function AddStudent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (student) => {
        try {
            await dispatch(addStudent(student)).unwrap();
            navigate("/");
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="student-board-container">

            <h2 className="flex mt-5 mr-[300px] -mb-5 ml-[350px] font-bold text-2xl">
                Add New Student
            </h2>

            <AddStudentForm
                onSubmitStudent={handleSubmit}
                selectedStudent={null}
            />

        </div>
    );
}

export default AddStudent;