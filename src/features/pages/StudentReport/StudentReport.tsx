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

    const downloadPdf = async () => {
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pageWidth - margin * 2;
        const green = [31, 77, 58] as const;
        const lightGreen = [243, 247, 244] as const;

        doc.setTextColor(...green);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Government Higher Secondary School", pageWidth / 2, 22, {
            align: "center"
        });

        doc.setFontSize(15);
        doc.text("STUDENT MARKS REPORT", pageWidth / 2, 32, {
            align: "center"
        });

        doc.setFont("helvetica", "normal");
        doc.setTextColor(102, 102, 102);
        doc.setFontSize(10);
        doc.text("Quarterly Examination - 2026", pageWidth / 2, 40, {
            align: "center"
        });
        doc.setDrawColor(...green);
        doc.line(margin, 45, pageWidth - margin, 45);

        const detailsY = 52;
        doc.setFillColor(...lightGreen);
        doc.setDrawColor(...green);
        doc.roundedRect(margin, detailsY, contentWidth, 24, 2, 2, "FD");
        doc.setTextColor(51, 51, 51);
        doc.setFontSize(10);
        doc.text(`Student Name: ${student.name}`, margin + 5, detailsY + 8);
        doc.text(`Student ID: ${student.id}`, margin + contentWidth / 2, detailsY + 8);
        doc.text("Class: 10", margin + 5, detailsY + 18);
        doc.text("Exam: Quarterly Exam", margin + contentWidth / 2, detailsY + 18);

        doc.setTextColor(...green);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Subject-wise Marks", margin, 86);

        const columnWidths = [15, 37, 39, 47, 42];
        const headers = ["S.No", "Subject", "Maximum Marks", "Obtained Marks", "Result"];
        const tableY = 91;
        const headerHeight = 11;
        const rowHeight = 9;
        let headerX = margin;

        headers.forEach((header, index) => {
            const width = columnWidths[index];
            doc.setFillColor(...green);
            doc.setDrawColor(...green);
            doc.rect(headerX, tableY, width, headerHeight, "FD");
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8);
            doc.text(header, headerX + width / 2, tableY + 7, { align: "center" });
            headerX += width;
        });

        subjects.forEach((subject, index) => {
            const rowY = tableY + headerHeight + index * rowHeight;
            const values = [
                String(index + 1),
                subject.name,
                "100",
                String(subject.mark),
                subject.mark >= 35 ? "Pass" : "Fail"
            ];
            let cellX = margin;

            values.forEach((value, columnIndex) => {
                const width = columnWidths[columnIndex];
                if (index % 2 === 0) {
                    doc.setFillColor(...lightGreen);
                } else {
                    doc.setFillColor(255, 255, 255);
                }
                doc.setDrawColor(229, 231, 235);
                doc.rect(cellX, rowY, width, rowHeight, "FD");
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                if (columnIndex === 4 && subject.mark >= 35) {
                    doc.setTextColor(21, 128, 61);
                } else if (columnIndex === 4) {
                    doc.setTextColor(220, 38, 38);
                } else {
                    doc.setTextColor(51, 51, 51);
                }
                doc.text(value, cellX + width / 2, rowY + 5.8, { align: "center" });
                cellX += width;
            });
        });

        const summaryY = tableY + headerHeight + subjects.length * rowHeight + 12;
        doc.setFillColor(...lightGreen);
        doc.setDrawColor(...green);
        doc.roundedRect(margin, summaryY, contentWidth, 30, 2, 2, "FD");
        doc.setTextColor(...green);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Performance Summary", margin + 5, summaryY + 8);
        doc.setTextColor(51, 51, 51);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Total Marks: ${total} / 500`, margin + 5, summaryY + 17);
        doc.text(`Percentage: ${percentage.toFixed(2)}%`, margin + 5, summaryY + 25);
        if (result === "Pass") {
            doc.setTextColor(21, 128, 61);
        } else {
            doc.setTextColor(220, 38, 38);
        }
        doc.text(`Overall Result: ${result}`, margin + contentWidth / 2, summaryY + 25);

        if (failedSubjects.length > 0) {
            const failedY = summaryY + 38;
            doc.setTextColor(220, 38, 38);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("Failed Subjects", margin, failedY);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            failedSubjects.forEach((subject, index) => {
                doc.text(
                    `${subject.name}: ${subject.mark} marks`,
                    margin,
                    failedY + 7 + index * 6
                );
            });
        }

        const safeName =
            student.name.trim().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "") ||
            "student";
        doc.save(`${safeName}-marks-report.pdf`);
    };

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
                onClick={() => {
                    void downloadPdf().catch((error: unknown) => {
                        console.error("Failed to generate the student report PDF.", error);
                        window.alert("Could not download the PDF. Please try again.");
                    });
                }}
            >
                Download PDF
            </button>
        </div>
    );
}

export default StudentReport;