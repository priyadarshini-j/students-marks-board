<<<<<<< HEAD
import React from "react";
import "./StateCards.css";
import Student from "../../data/Student.json";

function StateCards() {

    const students = Student.students;
    const totalStudents = students.length;

    const passedStudents = students.filter(
        (item) => item.result.toLowerCase() === "pass"
    ).length;

    const failedStudents = students.filter(
        (item) => item.result.toLowerCase() === "fail"
    ).length;
    const totalPercentage = students.reduce(
        (sum, item) => sum + item.percentage, 0
    );

    const classAverage = students.length > 0
        ? (totalPercentage / students.length).toFixed(2)
        : "0.00";

    const studentStats = [
        { title: "Total Student", count: totalStudents },
        { title: "Passed", count: passedStudents, color: "green" },
        { title: "Failed", count: failedStudents, color: "red" },
        { title: "Class Average", count: `${classAverage}%` }
    ];

    return (
        <div className="student-state-container">

            {studentStats.map((item, index) => (
                <div className="state-card" key={index}>

                    <div className="state-card-fields">
                        {item.title}
                    </div>

                    <div
                        className="student-card-count"
                        style={{ color: item.color || "black" }}
                    >
                        {item.count}
                    </div>

                </div>
            ))}

        </div>
    );
}

export default StateCards;
=======

import React from "react";
import "./StateCards.css";

function StateCards({ students }) {

    const totalStudents = students.length;

    const passedStudents = students.filter(
        (item) => item.result.toLowerCase() === "pass"
    ).length;

    const failedStudents = students.filter(
        (item) => item.result.toLowerCase() === "fail"
    ).length;

    const totalPercentage = students.reduce(
        (sum, item) => sum + Number(item.percentage),
        0
    );

    const classAverage = students.length > 0
        ? (totalPercentage / students.length).toFixed(2)
        : "0.00";

    const studentStats = [
        { title: "Total Student", count: totalStudents },
        { title: "Passed", count: passedStudents, color: "green" },
        { title: "Failed", count: failedStudents, color: "red" },
        { title: "Class Average", count: `${classAverage}%` }
    ];

    return (
        <div className="student-state-container">

            {studentStats.map((item, id) => (
                <div className="state-card" key={id}>

                    <div className="state-card-fields">
                        {item.title}
                    </div>

                    <div
                        className="student-card-count"
                        style={{ color: item.color || "black" }}
                    >
                        {item.count}
                    </div>

                </div>
            ))}

        </div>
    );
}

export default StateCards;
>>>>>>> 6cc08d4 (updated student board)
