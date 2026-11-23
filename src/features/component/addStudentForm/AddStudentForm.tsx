
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Student, StudentInput } from "../../students/types";

const emptyForm = {
    name: "",
    tamil: "",
    english: "",
    maths: "",
    science: "",
    social: ""
};

const fields = [
    { name: "tamil", label: "Tamil" },
    { name: "english", label: "English" },
    { name: "maths", label: "Maths" },
    { name: "science", label: "Science" },
    { name: "social", label: "Social Science" }
];

type SubjectField = (typeof fields)[number]["name"];
type FormField = "name" | SubjectField;
type FormValues = Record<FormField, string>;
type FormErrors = Partial<Record<FormField | "form", string>>;

interface AddStudentFormProps {
    onSubmitStudent: (student: StudentInput) => Promise<boolean>;
    selectedStudent: Student | null;
}

const MARK_REGEX = /^(100|[1-9]?\d)$/;
const NAME_REGEX = /^[\p{L}\s.'-]+$/u;


const validate = (form: FormValues): FormErrors => {
    const errors: FormErrors = {};

    const name = form.name.trim();

    if (!name) {
        errors.name = "Name is required";
    } else if (!NAME_REGEX.test(name)) {
        errors.name = "Use letters, spaces, . ' or - only";
    }

    fields.forEach(({ name: subject }) => {
        const mark = form[subject].trim();

        if (mark === "") {
            errors[subject] = "Mark is required";
        } else if (!MARK_REGEX.test(mark)) {
            errors[subject] = "Enter a whole number from 0 to 100";
        }
    });

    return errors;
};

function AddStudentForm({ onSubmitStudent, selectedStudent }: AddStudentFormProps) {
    const [form, setForm] = useState<FormValues>(emptyForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        if (selectedStudent) {
            setForm({
                name: selectedStudent.name || "",
                tamil: String(selectedStudent.tamil ?? ""),
                english: String(selectedStudent.english ?? ""),
                maths: String(selectedStudent.maths ?? ""),
                science: String(selectedStudent.science ?? ""),
                social: String(selectedStudent.social ?? "")
            });
        } else {
            setForm(emptyForm);
        }

        setErrors({});
    }, [selectedStudent]);


    const checkField = (field: FormField, values: FormValues) => {
        const fieldErrors = validate(values);

        setErrors((prev) => {
            const updated = { ...prev };

            if (fieldErrors[field]) {
                updated[field] = fieldErrors[field];
            } else {
                delete updated[field];
            }

            return updated;
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const field = name as FormField;
        const next = { ...form, [field]: value };

        setForm(next);


        if (errors[field]) {
            checkField(field, next);
        }
    };


    const handleBlur = (field: FormField) => {
        checkField(field, form);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (saving) return;

        const trimmedForm = {
            name: form.name.trim(),
            tamil: form.tamil.trim(),
            english: form.english.trim(),
            maths: form.maths.trim(),
            science: form.science.trim(),
            social: form.social.trim()
        };

        const validationErrors = validate(trimmedForm);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const student = {
            name: trimmedForm.name,
            tamil: Number(trimmedForm.tamil),
            english: Number(trimmedForm.english),
            maths: Number(trimmedForm.maths),
            science: Number(trimmedForm.science),
            social: Number(trimmedForm.social)
        };

        try {
            setSaving(true);

            const result = await onSubmitStudent(student);

            if (result !== false) {
                setErrors({});


                if (!selectedStudent) {
                    setForm(emptyForm);
                }
            }
        } catch (error) {
            console.error("Failed to save student:", error);
            setErrors({ form: "Could not save the student. Please try again." });
        } finally {
            setSaving(false);
        }
    };


    const total = fields
        .filter(({ name }) => MARK_REGEX.test(form[name].trim()))
        .reduce((sum, { name }) => sum + Number(form[name].trim()), 0);

    const percentage = (total / 500) * 100;

    const inputClass = (field: FormField) =>
        `w-full rounded-lg border px-4 py-3 outline-none transition ${errors[field]
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
        }`;

    return (
        <div className="mx-auto my-10 w-[95%] max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-md sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                {selectedStudent ? "Update Student" : "Add Student"}
            </h2>

            <form onSubmit={handleSubmit} noValidate>

                <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Student Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter student name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass("name")}
                    />

                    {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-500">
                            {errors.name}
                        </p>
                    )}
                </div>


                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label
                                htmlFor={field.name}
                                className="mb-2 block font-medium text-gray-700"
                            >
                                {field.label} Mark
                            </label>

                            <input
                                id={field.name}
                                type="text"
                                inputMode="numeric"
                                name={field.name}
                                placeholder="Enter mark (0-100)"
                                value={form[field.name]}
                                onChange={handleChange}
                                onBlur={() => handleBlur(field.name)}
                                aria-invalid={!!errors[field.name]}
                                aria-describedby={
                                    errors[field.name]
                                        ? `${field.name}-error`
                                        : undefined
                                }
                                className={inputClass(field.name)}
                            />

                            {errors[field.name] && (
                                <p
                                    id={`${field.name}-error`}
                                    className="mt-1 text-sm text-red-500"
                                >
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>


                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-green-50 p-4">
                        <p className="text-sm font-medium text-gray-600">
                            Live Total
                        </p>

                        <p className="mt-1 text-2xl font-bold text-green-800">
                            {total} / 500
                        </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4">
                        <p className="text-sm font-medium text-gray-600">
                            Live Percentage
                        </p>

                        <p className="mt-1 text-2xl font-bold text-blue-800">
                            {percentage.toFixed(2)}%
                        </p>
                    </div>
                </div>


                {errors.form && (
                    <p role="alert" className="mt-5 text-sm text-red-500">
                        {errors.form}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={saving}
                    className="mt-7 w-full rounded-lg bg-[#1F4D3A] px-6 py-3 font-semibold text-white transition hover:bg-[#173b2c] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {saving
                        ? "Saving..."
                        : selectedStudent
                            ? "Update Student"
                            : "Add Student"}
                </button>
            </form>
        </div>
    );
}

export default AddStudentForm;