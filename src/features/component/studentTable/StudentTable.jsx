import React, { useState } from "react";
import "./StudentTable.css";

function StudentTable({ students, handleDeleteStudent, handleEditStudent, loading, error }) {

    const [sortOrder, setSortOrder] = useState(false);

    const sortedStudents = [...students].sort((a, b) => {
        return sortOrder
            ? a.total - b.total
            : b.total - a.total;
    });

    const handleSort = () => {
        setSortOrder(!sortOrder);
    };

    const highestMark = students.length > 0
        ? Math.max(...students.map((item) => item.total)) : 0;


    return (
        <div className="student-table-container">

            <div className="student-table-header">
                Student Marks
                <button onClick={handleSort} className="sort-button">
                    {sortOrder ? "Sort Descending" : "Sort by Total"}
                </button>
            </div>



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
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td colSpan="11" className="no-data">
                                    Loading student data...
                                </td>
                            </tr>

                        ) : error ? (

                            <tr>
                                <td colSpan="11" className="no-data">
                                    {error}
                                </td>
                            </tr>

                        ) : sortedStudents.length > 0 ? (

                            sortedStudents.map((item, index) => (

                                <tr
                                    key={item.id}
                                    className={`table-data ${item.total === highestMark ? "topper-row" : ""
                                        }`}
                                >
                                    <td>{index + 1}</td>
                                    <td>
                                        {item.name}
                                        {item.total === highestMark && <span> 🏆</span>}
                                    </td>

                                    <td className={item.tamil < 35 ? "fail-mark" : ""}>
                                        {item.tamil}
                                    </td>

                                    <td className={item.english < 35 ? "fail-mark" : ""}>
                                        {item.english}
                                    </td>

                                    <td className={item.maths < 35 ? "fail-mark" : ""}>
                                        {item.maths}
                                    </td>

                                    <td className={item.science < 35 ? "fail-mark" : ""}>
                                        {item.science}
                                    </td>

                                    <td className={item.social < 35 ? "fail-mark" : ""}>
                                        {item.social}
                                    </td>

                                    <td>{item.total}</td>
                                    <td>{item.percentage}%</td>

                                    <td>
                                        <div className={`student-result ${item.result.toLowerCase() === "pass"
                                                ? "pass"
                                                : "fail"
                                            }`}>
                                            {item.result}
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className="action-delete"
                                            onClick={() => handleDeleteStudent(item.id)}
                                        >
                                            Delete
                                        </span>

                                        <span
                                            className="action-edit"
                                            onClick={() => handleEditStudent(item)}
                                        >
                                            Edit
                                        </span>
                                    </td>
                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="11" className="no-data">
                                    No Student Records Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
export default StudentTable;