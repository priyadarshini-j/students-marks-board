import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../addStudent/AddStudent.css';

import {
    updateStudent,
    selectStudentById,
    selectStudentsStatus,
    selectStudentsError
} from "../../students/studentsSlice";
import AddStudentForm from "../../component/addStudentForm/AddStudentForm";

function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const student = useSelector((state) => selectStudentById(state, id));
    const status = useSelector(selectStudentsStatus);
    const error = useSelector(selectStudentsError);

    const handleSubmit = async (updated) => {
        try {
            await dispatch(updateStudent({ id, student: updated })).unwrap();
            navigate("/");
            return true;
        } catch {
            return false;
        }
    };

    if (status === "idle" || status === "loading") {
        return <h2>Loading student...</h2>;
    }

    if (status === "failed") {
        return <p>{error}</p>;
    }

    if (!student) {
        return <h2>Student not found</h2>;
    }

    return (
        <div className="student-board-container">

            <h2 className="flex mt-5 mr-[300px] -mb-5 ml-[350px] font-bold text-2xl">
                Update Existing Student
            </h2>

            <AddStudentForm
                onSubmitStudent={handleSubmit}
                selectedStudent={student}
            />

        </div>
    );
}

export default EditStudent;