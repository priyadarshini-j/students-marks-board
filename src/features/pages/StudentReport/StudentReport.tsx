import { useParams } from "react-router-dom";

import { useAppSelector } from "../../../hooks/redux";

import {
    selectStudentById,
    selectStudentsStatus,
    selectStudentsError
} from "../../students/studentsSlice";


const th =
    "bg-[#1F4D3A] px-2 py-[13px] text-center text-sm text-white max-[600px]:px-[5px] max-[600px]:py-2 max-[600px]:text-[11px]";
const td =
    "border border-[#e5e7eb] px-2 py-[13px] text-center text-sm max-[600px]:px-[5px] max-[600px]:py-2 max-[600px]:text-[11px]";
const passText = "font-bold text-[#15803d]";
const failText = "font-bold text-[#dc2626]";

function StudentReport() {
    const { id } = useParams<{ id: string }>();

    const student = useAppSelector((state) => selectStudentById(state, id));
    const status = useAppSelector(selectStudentsStatus);
    const error = useAppSelector(selectStudentsError);

    if (status === "idle" || status === "loading") {
        return <h2>Loading student report...</h2>;
    }

    if (status === "failed") {
        return <p>{error}</p>;
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

    const total = subjects.reduce((sum, subject) => sum + subject.mark, 0);

    const percentage = total / 5;

    const result = subjects.every((subject) => subject.mark >= 35)
        ? "Pass"
        : "Fail";

    const failedSubjects = subjects.filter((subject) => subject.mark < 35);

    return (
        <div className="student-report mx-auto my-10 max-w-[800px] rounded-[10px] border-2 border-[#1F4D3A] bg-white p-[35px] text-[#333] shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-[600px]:m-[15px] max-[600px]:p-[15px] print:m-0 print:max-w-full print:border print:border-[#333] print:p-5 print:shadow-none">

            
            <div className="border-b-2 border-[#1F4D3A] pb-5 text-center">
                <h2 className="mb-3 text-[25px] font-bold text-[#1F4D3A] max-[600px]:text-[19px]">
                    Government Higher Secondary School
                </h2>
                <h3 className="my-2 text-xl font-bold">STUDENT MARKS REPORT</h3>
                <p className="mt-2 text-[#666]">Quarterly Examination - 2026</p>
            </div>

           
            <div className="my-[25px] grid grid-cols-2 gap-2.5 rounded-[7px] bg-[#f3f7f4] p-[18px] max-[600px]:grid-cols-1 print:grid-cols-2">
                <p className="my-[5px]"><strong>Student Name:</strong> {student.name}</p>
                <p className="my-[5px]"><strong>Student ID:</strong> {student.id}</p>
                <p className="my-[5px]"><strong>Class:</strong> 10</p>
                <p className="my-[5px]"><strong>Exam:</strong> Quarterly Exam</p>
            </div>

            <h3 className="mb-3 mt-[25px] text-[1.17em] font-bold text-[#1F4D3A]">
                Subject-wise Marks
            </h3>

            <table className="mb-[25px] mt-[15px] w-full border-collapse">
                <thead>
                    <tr>
                        <th className={th}>S.No</th>
                        <th className={th}>Subject</th>
                        <th className={th}>Maximum Marks</th>
                        <th className={th}>Obtained Marks</th>
                        <th className={th}>Result</th>
                    </tr>
                </thead>

                <tbody>
                    {subjects.map((subject, index) => (
                        <tr
                            key={subject.name}
                            className="even:bg-[#f3f7f4] hover:bg-[#eff6ff] print:hover:bg-transparent"
                        >
                            <td className={td}>{index + 1}</td>
                            <td className={td}>{subject.name}</td>
                            <td className={td}>100</td>
                            <td className={`${td} ${subject.mark < 35 ? failText : ""}`}>
                                {subject.mark}
                            </td>
                            <td className={`${td} ${subject.mark >= 35 ? passText : failText}`}>
                                {subject.mark >= 35 ? "Pass" : "Fail"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div className="rounded-md border-l-4 border-[#1F4D3A] bg-[#f3f7f4] p-[18px]">
                <h3 className="mb-3 text-[1.17em] font-bold text-[#1F4D3A]">
                    Performance Summary
                </h3>

                <p className="my-2.5"><strong>Total Marks:</strong> {total} / 500</p>
                <p className="my-2.5"><strong>Percentage:</strong> {percentage.toFixed(2)}%</p>

                <p className="my-2.5">
                    <strong>Overall Result:</strong>
                    <span className={result === "Pass" ? passText : failText}>
                        {" "}{result}
                    </span>
                </p>
            </div>

            
            {failedSubjects.length > 0 && (
                <div className="mt-5 rounded-md border-l-4 border-[#dc2626] bg-[#fef2f2] p-[15px]">
                    <h3 className="text-[1.17em] font-bold text-[#dc2626]">
                        Failed Subjects
                    </h3>

                    {failedSubjects.map((subject) => (
                        <p key={subject.name} className="my-2 font-semibold text-[#dc2626]">
                            {subject.name}: {subject.mark} marks
                        </p>
                    ))}
                </div>
            )}

            <button
                className="mx-auto mt-[30px] block cursor-pointer rounded-[7px] border-none bg-[#1F4D3A] px-[25px] py-3 text-[15px] font-semibold text-white hover:bg-[#0c3625] print:hidden"
                onClick={() => window.print()}
            >
                Print Report
            </button>
        </div>
    );
}

export default StudentReport;