
import React, {
    createContext,
    useState,
    useEffect
} from "react";

export const StudentsContext = createContext();

export function StudentsProvider({ children }) {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

   
    const calculateStudent = (student) => {

        const marks = [
            Number(student.tamil),
            Number(student.english),
            Number(student.maths),
            Number(student.science),
            Number(student.social)
        ];

        const total = marks.reduce(
            (sum, mark) => sum + mark, 0
        );

        const percentage = total / 5;

        const result = marks.every(mark => mark >= 35)
            ? "Pass"
            : "Fail";

        return {
            ...student,
            total,
            percentage,
            result
        };
    };

    useEffect(() => {

        const fetchStudents = async () => {

            try {

                setLoading(true);
                setError("");

                const [data] = await Promise.all([

                    fetch("http://localhost:3001/students")
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Failed to fetch students");
                            }

                            return response.json();
                        }),

                    new Promise(resolve =>
                        setTimeout(resolve, 2000)
                    )

                ]);

                const calculatedStudents = data.map(student =>
                    calculateStudent(student)
                );

                setStudents(calculatedStudents);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchStudents();

    }, []);

    const addStudent = async (student) => {

        try {

            setError("");

            const studentData = calculateStudent(student);

            const response = await fetch(
                "http://localhost:3001/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add student");
            }

            const newStudent = await response.json();

            setStudents(prev => [...prev, newStudent]);

            setSelectedStudent(null);

            return true;

        } catch (err) {

            setError(err.message);
            return false;

        }
    };

  
    const deleteStudent = async (id) => {

        try {

            setError("");

            const response = await fetch(
                `http://localhost:3001/students/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete student");
            }

            setStudents(prev =>
                prev.filter(student =>
                    String(student.id) !== String(id)
                )
            );

            return true;

        } catch (err) {

            setError(err.message);
            return false;

        }
    };

   
    const editStudent = (student) => {
        setSelectedStudent(student);
    };

   
   const updateStudent = async (updatedStudent) => {
    try {
        if (!selectedStudent) {
            console.log("No student selected for update");
            return false;
        }

        const studentData = calculateStudent(updatedStudent);

        const response = await fetch(
            `http://localhost:3001/students/${selectedStudent.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentData)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update student");
        }

        const updatedData = await response.json();

        setStudents((previousStudents) =>
            previousStudents.map((student) =>
                String(student.id) === String(updatedData.id)
                    ? updatedData
                    : student
            )
        );

        setSelectedStudent(null);

        return true;

    } catch (error) {
        console.error("Update error:", error);
        return false;
    }
};
    return (
        <StudentsContext.Provider
            value={{
                students,
                addStudent,
                deleteStudent,
                editStudent,
                updateStudent,
                selectedStudent,
                setSelectedStudent,
                loading,
                error
            }}
        >
            {children}
        </StudentsContext.Provider>
    );
}
