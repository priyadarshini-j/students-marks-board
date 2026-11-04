import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './StudentReport.css'

function StudentReport() {

    const { id } = useParams();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchStudent = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:3001/students/${id}`
                );

                if (!response.ok) {
                    throw new Error("Student not found");
                }

                const data = await response.json();

                setStudent(data);

            } catch (error) {

                console.log("Student fetch error:", error);
                setStudent(null);
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchStudent();

    }, [id]);


    if (loading) {
        return <h2>Loading report card...</h2>;
    }

    if (error || !student) {
        return <h2>Student not found</h2>;
    }
    const subjects = [
        { name: "Tamil", marks: Number(student.tamil) },
        { name: "English", marks: Number(student.english) },
        { name: "Maths", marks: Number(student.maths) },
        { name: "Science", marks: Number(student.science) },
        { name: "Social", marks: Number(student.social) }
    ];



    const total = subjects.reduce(
        (sum, subject) => sum + subject.marks,
        0
    );


    const percentage = total / 5;


    const failedSubjects = subjects.filter(
        (subject) => subject.marks < 35
    );


    const result = failedSubjects.length === 0
        ? "Pass"
        : "Fail";


    return (

        <div className="report-card">

            <h2>Student Report Card</h2>

            <h3>Name: {student.name}</h3>

            <table>

                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                    </tr>
                </thead>

                <tbody>

                    {subjects.map((subject) => (

                        <tr key={subject.name}>

                            <td>{subject.name}</td>

                            <td style={{
                                color: subject.marks < 35 ? "red" : "black"
                            }}>
                                {subject.marks}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <h3>Total: {total} / 500</h3>

            <h3>Percentage: {percentage}%</h3>

            <h3>
                Result: {result}
            </h3>

            {failedSubjects.length > 0 && (

                <div style={{ color: "red" }}>

                    <h3>Failed Subjects:</h3>

                    {failedSubjects.map((subject) => (

                        <p key={subject.name}>
                            {subject.name} - {subject.marks}
                        </p>

                    ))}

                </div>

            )}

            <button
                className="print-button"
                onClick={() => window.print()}
            >
                Print Report Card
            </button>

        </div>
    );
}

export default StudentReport;