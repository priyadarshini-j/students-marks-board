
import { useContext } from "react";
import { StudentsContext } from "../context/StudentContext";

function useStudents() {

    const context = useContext(StudentsContext);

    if (!context) {
        throw new Error(
            "useStudents must be used inside StudentsProvider"
        );
    }

    return context;
}

export default useStudents;
