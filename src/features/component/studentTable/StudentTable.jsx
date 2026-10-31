import React from "react";
import "./StudentTable.css";
import Student from "../../data/Student.json";

function StudentTable() {

    const highestMark = Math.max(
        ...Student.students.map((item) => item.total)
    );

    return (
        <div className="student-table-container">
            <div className="student-table-header">Marks</div>


            <div className="table-responsive">
                <table className="student-table-list">
                    <thead className="table-header">
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Tamil</th>
                            <th>English</th>
                            <th>Maths</th>
                            <th>Science</th>
                            <th>Social</th>
                            <th>Total</th>
                            <th>%</th>
                            <th>Result</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Student.students.map((item) => (
                            <tr
                                className={`table-data ${item.total === highestMark ? "topper-row" : ""
                                    }`}
                                key={item.sno}
                            >
                                <td>{item.sno}</td>
                                <td>{item.name}</td>
                                <td>{item.tamil}</td>
                                <td>{item.english}</td>
                                <td>{item.maths}</td>
                                <td>{item.science}</td>
                                <td>{item.social}</td>
                                <td>{item.total}</td>
                                <td>{item.percentage}%</td>
                                <td>
                                    <div
                                        className={`student-result ${item.result.toLowerCase() === "pass" ? "pass" : "fail"
                                            }`}
                                    >
                                        {item.total === highestMark ? "Pass" : item.result}
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentTable;