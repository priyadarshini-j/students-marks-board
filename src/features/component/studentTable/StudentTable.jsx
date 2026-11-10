import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudents from "../../../hooks/useStudents";

const cell = "px-[15px] py-3 text-center max-[480px]:p-2 max-[480px]:text-xs";
const noData = `${cell} text-center`;

function StudentTable() {
    const { students, loading, error, deleteStudent, editStudent } = useStudents();

    const [sortOrder, setSortOrder] = useState(false);
    const navigate = useNavigate();

    const sortedStudents = [...students].sort((a, b) =>
        sortOrder ? a.total - b.total : b.total - a.total
    );

    const handleSort = () => setSortOrder(!sortOrder);

    const highestMark =
        students.length > 0
            ? Math.max(...students.map((item) => Number(item.total) || 0))
            : 0;

    const markClass = (mark) =>
        `${cell} ${mark < 35 ? "text-[red] font-semibold" : ""}`;

    return (
        <div className="mx-auto mt-10 w-[72%] rounded-[15px] border border-[rgb(172,171,171)] bg-white px-5 py-2.5 max-[480px]:mt-4 max-[480px]:w-[92%] max-[480px]:rounded-lg max-[480px]:p-2">
            <div className="m-[15px] flex items-center justify-between text-2xl font-semibold max-[480px]:m-2 max-[480px]:text-lg">
                Student Marks

                <button
                    onClick={handleSort}
                    className="cursor-pointer rounded-md bg-[#14532d] px-3 py-1.5 text-sm font-normal text-white hover:bg-[#166534]"
                >
                    {sortOrder ? "Sort Descending" : "Sort by Total"}
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[rgb(179,175,175)]">
                        <tr>
                            {["S.No", "Name", "Tamil", "English", "Maths", "Science", "Social", "Total", "%", "Result", "Action"].map(
                                (h) => (
                                    <th key={h} className={cell}>
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="11" className={noData}>
                                    Loading student data...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="11" className={noData}>
                                    {error}
                                </td>
                            </tr>
                        ) : sortedStudents.length > 0 ? (
                            sortedStudents.map((item, index) => {
                                const isTopper = Number(item.total) === highestMark;
                                const isPass = item.result?.toLowerCase() === "pass";

                                return (
                                    <tr
                                        key={item.id}
                                        className={`text-center ${isTopper ? "bg-[rgb(250,250,186)]" : ""
                                            }`}
                                    >
                                        <td className={cell}>{index + 1}</td>

                                        <td className={cell}>
                                            <span
                                                className="cursor-pointer font-semibold text-[#050507] transition-colors duration-200 hover:text-[#096339]"
                                                onClick={() => navigate(`/student/${item.id}`)}
                                            >
                                                {item.name}
                                            </span>

                                            {isTopper && " 🏆"}
                                        </td>

                                        <td className={markClass(item.tamil)}>{item.tamil}</td>
                                        <td className={markClass(item.english)}>{item.english}</td>
                                        <td className={markClass(item.maths)}>{item.maths}</td>
                                        <td className={markClass(item.science)}>{item.science}</td>
                                        <td className={markClass(item.social)}>{item.social}</td>

                                        <td className={cell}>{item.total}</td>
                                        <td className={cell}>{item.percentage}%</td>

                                        <td className={cell}>
                                            <div
                                                className={`ml-2.5 flex h-[30px] w-[50px] items-center justify-center rounded-[20px] max-[480px]:h-6 max-[480px]:w-[42px] max-[480px]:text-[11px] ${isPass
                                                        ? "bg-[#d4edda] text-[#1F4D3A]"
                                                        : "bg-[#f8d7da] text-[red]"
                                                    }`}
                                            >
                                                {item.result}
                                            </div>
                                        </td>

                                        <td className={cell}>
                                            <span
                                                className="mr-2.5 cursor-pointer rounded-[5px] bg-[rgb(175,2,2)] p-[5px] text-sm text-[#faf6f6]"
                                                onClick={() => deleteStudent(item.id)}
                                            >
                                                Delete
                                            </span>

                                            <span
                                                className="ml-2.5 cursor-pointer rounded-[5px] bg-[#14532d] p-[5px] pr-2.5 text-sm text-white"
                                                onClick={() => {
                                                    editStudent(item);
                                                    navigate("/add");
                                                }}
                                            >
                                                Edit
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="11" className={noData}>
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
