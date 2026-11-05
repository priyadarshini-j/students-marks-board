
import React from "react";
import { useParams } from "react-router-dom";

import useStudents from "../../../hooks/useStudents";
import useFetch from "../../../hooks/useFetch";

import "./StudentReport.css";

function StudentReport() {

    const { id } = useParams();

    const { error: contextError } = useStudents();

    const {
        data: student,
        loading,
        error
    } = useFetch(`http://localhost:3001/students/${id}`);

    if (loading) {
        return <h2>Loading student report...</h2>;
    }

    if (error || contextError) {
        return <p>{error || contextError}</p>;
    }

    if (!student) {
        return <h2>Student not found</h2>;
    }

    const subjects = [
        { name: "Tamil", mark: Number(student.tamil) },
        { name: "English", mark: Number(student.english) },
        { name: "Maths", mark: Number(student.maths) },
        { name: "Science", mark: Number(student.science) },
        { name: "Social", mark: Number(student.social) }
    ];

    const total = subjects.reduce(
        (sum, subject) => sum + subject.mark,
        0
    );

    const percentage = total / 5;

    const result = subjects.every(subject => subject.mark >= 35)
        ? "Pass"
        : "Fail";

    const failedSubjects = subjects.filter(
        subject => subject.mark < 35
    );

    return (
        <div className="student-report">

            <div className="report-header">
                <h2>Government Higher Secondary School</h2>
                <h3>STUDENT MARKS REPORT</h3>
                <p>Quarterly Examination - 2026</p>
            </div>

            <div className="student-details">
                <p><strong>Student Name:</strong> {student.name}</p>
                <p><strong>Student ID:</strong> {student.id}</p>
                <p><strong>Class:</strong> 10</p>
                <p><strong>Exam:</strong> Quarterly Exam</p>
            </div>

            <h3 className="marks-title">Subject-wise Marks</h3>

            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Subject</th>
                        <th>Maximum Marks</th>
                        <th>Obtained Marks</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {subjects.map((subject, index) => (
                        <tr key={subject.name}>
                            <td>{index + 1}</td>
                            <td>{subject.name}</td>
                            <td>100</td>
                            <td className={
                                subject.mark < 35 ? "fail-mark" : ""
                            }>
                                {subject.mark}
                            </td>
                            <td className={
                                subject.mark >= 35 ? "pass-text" : "fail-text"
                            }>
                                {subject.mark >= 35 ? "Pass" : "Fail"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="report-summary">
                <h3>Performance Summary</h3>

                <p><strong>Total Marks:</strong> {total} / 500</p>
                <p><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>

                <p>
                    <strong>Overall Result:</strong>
                    <span className={result === "Pass" ? "pass-text" : "fail-text"}>
                        {" "}{result}
                    </span>
                </p>
            </div>

            {failedSubjects.length > 0 && (
                <div className="failed-subjects">
                    <h3>Failed Subjects</h3>

                    {failedSubjects.map(subject => (
                        <p key={subject.name}>
                            {subject.name}: {subject.mark} marks
                        </p>
                    ))}
                </div>
            )}


            <button
                className="print-button"
                onClick={() => window.print()}
            >
                Print Report
            </button>

        </div>
    );
}

export default StudentReport;
