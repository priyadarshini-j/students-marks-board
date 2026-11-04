import React from "react";
import StudentMarksBoard from "../../../features/component/StudentMarksBoard";

function Home({
    students,
    loading,
    error,
    handleDeleteStudent,
    handleEditStudent,
    selectedStudent
}) {

    return (
        <StudentMarksBoard
            students={students}
            loading={loading}
            error={error}
            selectedStudent={selectedStudent}
            handleDeleteStudent={handleDeleteStudent}
            handleEditStudent={handleEditStudent}
        />
    );
}

export default Home;