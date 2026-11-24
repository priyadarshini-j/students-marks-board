import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";

import { addStudent } from "../../students/studentsSlice";
import AddStudentForm from "../../component/addStudentForm/AddStudentForm";
import type { StudentInput } from "../../students/types";

function AddStudent() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (student: StudentInput) => {
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

            

            <AddStudentForm
                onSubmitStudent={handleSubmit}
                selectedStudent={null}
            />

        </div>
    );
}

export default AddStudent;