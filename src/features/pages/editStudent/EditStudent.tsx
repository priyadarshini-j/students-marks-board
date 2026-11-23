import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import "../addStudent/AddStudent.css";

import {
    updateStudent,
    selectStudentById,
    selectStudentsStatus,
    selectStudentsError
} from "../../students/studentsSlice";
import AddStudentForm from "../../component/addStudentForm/AddStudentForm";
import type { StudentInput } from "../../students/types";

function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const student = useAppSelector((state) => selectStudentById(state, id));
    const status = useAppSelector(selectStudentsStatus);
    const error = useAppSelector(selectStudentsError);

    const handleSubmit = async (updated: StudentInput) => {
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

            

            <AddStudentForm
                onSubmitStudent={handleSubmit}
                selectedStudent={student}
            />

        </div>
    );
}

export default EditStudent;