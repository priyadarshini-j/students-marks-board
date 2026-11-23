import {
    createAsyncThunk,
    createSelector,
    createSlice
} from "@reduxjs/toolkit";
import type { Student, StudentInput } from "./types";

const API_URL = "http://localhost:3001/students";

type StudentStatus = "idle" | "loading" | "succeeded" | "failed";

interface StudentsState {
    items: Student[];
    status: StudentStatus;
    error: string | undefined;
}

interface StudentsRootState {
    students: StudentsState;
}

interface UpdateStudentInput {
    id: string | undefined;
    student: StudentInput;
}

export const calculateStudent = <T extends StudentInput>(
    student: T
): T & Pick<Student, "total" | "percentage" | "result"> => {

    const marks = [
        Number(student.tamil),
        Number(student.english),
        Number(student.maths),
        Number(student.science),
        Number(student.social)
    ];

    const total = marks.reduce((sum, mark) => sum + mark, 0);

    const percentage = total / 5;

    const result = marks.every(mark => mark >= 35)
        ? "Pass"
        : "Fail";

    return { ...student, total, percentage, result };
};

// GET all students
export const fetchStudents = createAsyncThunk<Student[], void>(
    "students/fetchStudents",
    async () => {

        const [data] = await Promise.all([

            fetch(API_URL).then(async response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                return await response.json() as Student[];
            }),

            // same 2 second loading delay you had before
            new Promise<void>(resolve => setTimeout(resolve, 2000))
        ]);

        return data.map(student => calculateStudent(student));
    }
);

// POST a new student
export const addStudent = createAsyncThunk<Student, StudentInput>(
    "students/addStudent",
    async (student) => {

        const studentData = calculateStudent(student);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        return await response.json() as Student;
    }
);

// PUT (update) a student.
export const updateStudent = createAsyncThunk<Student, UpdateStudentInput>(
    "students/updateStudent",
    async ({ id, student }) => {

        const studentData = calculateStudent(student);

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        });

        if (!response.ok) {
            throw new Error("Failed to update student");
        }

        return await response.json() as Student;
    }
);

// DELETE a student. Returns the id so the reducer can remove it.
export const deleteStudent = createAsyncThunk<string | number, string | number>(
    "students/deleteStudent",
    async (id) => {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        return id;
    }
);

const initialState: StudentsState = {
    items: [],
    status: "idle",
    error: ""
};

const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // ----- fetchStudents -----
            .addCase(fetchStudents.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // ----- addStudent -----
            .addCase(addStudent.pending, (state) => {
                state.error = "";
            })
            .addCase(addStudent.fulfilled, (state, action) => {
               
                state.items.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // ----- updateStudent -----
            .addCase(updateStudent.pending, (state) => {
                state.error = "";
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    student => String(student.id) === String(action.payload.id)
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // ----- deleteStudent -----
            .addCase(deleteStudent.pending, (state) => {
                state.error = "";
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    student => String(student.id) !== String(action.payload)
                );
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default studentsSlice.reducer;

export const selectAllStudents = (state: StudentsRootState) => state.students.items;
export const selectStudentsStatus = (state: StudentsRootState) => state.students.status;
export const selectStudentsError = (state: StudentsRootState) => state.students.error;


export const selectStudentById = (state: StudentsRootState, id: string | undefined) =>
    state.students.items.find(student => String(student.id) === String(id));

export const selectStudentStats = createSelector(
    [selectAllStudents],
    (students) => {

        const total = students.length;

        const passed = students.filter(s => s.result === "Pass").length;

        const failed = students.filter(s => s.result === "Fail").length;

        const average = total > 0
            ? (
                students.reduce(
                    (sum, s) => sum + Number(s.percentage || 0), 0
                ) / total
            ).toFixed(2)
            : 0;

        return { total, passed, failed, average };
    }
);

export const selectTopper = (state: StudentsRootState): Student | null => {

    const students = state.students.items;

    if (students.length === 0) {
        return null;
    }

    return students.reduce((highest, current) =>
        Number(current.total) > Number(highest.total)
            ? current
            : highest
    );
};

export const selectStudentsSortedByTotal = createSelector(
    [selectAllStudents],
    (students) =>
        [...students].sort((a, b) => Number(b.total) - Number(a.total))
);