
import React, { useEffect, useState } from "react";
import "./AddStudentForm.css";

function AddStudentForm({
    onAddStudent,
    selectedStudent,
    handleEditStudent
}) {
    const [name, setName] = useState("");
    const [tamil, setTamil] = useState("");
    const [english, setEnglish] = useState("");
    const [maths, setMaths] = useState("");
    const [science, setScience] = useState("");
    const [social, setSocial] = useState("");
    useEffect(() => {
        if (selectedStudent) {
            setName(selectedStudent.name);
            setTamil(selectedStudent.tamil);
            setEnglish(selectedStudent.english);
            setMaths(selectedStudent.maths);
            setScience(selectedStudent.science);
            setSocial(selectedStudent.social);
        } else {
            setName("");
            setTamil("");
            setEnglish("");
            setMaths("");
            setScience("");
            setSocial("");
        }
    }, [selectedStudent]);

    function handleSubmit(e) {
        e.preventDefault();

        const student = {
            name: name.trim(),
            tamil: Number(tamil),
            english: Number(english),
            maths: Number(maths),
            science: Number(science),
            social: Number(social)
        };

        if (selectedStudent) {
            handleEditStudent(student);
        } else {
            onAddStudent(student);
        }
    }

    return (
        <div className="student-form-container">

            <div className="add-student-form">
                {selectedStudent ? "Update Student" : "Add Student"}
            </div>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-input-group"
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="form-input-group"
                    type="number"
                    placeholder="Tamil Mark"
                    min="0"
                    max="100"
                    value={tamil}
                    onChange={(e) => setTamil(e.target.value)}
                    required
                />

                <input
                    className="form-input-group"
                    type="number"
                    placeholder="English Mark"
                    min="0"
                    max="100"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    required
                />

                <input
                    className="form-input-group"
                    type="number"
                    placeholder="Maths Mark"
                    min="0"
                    max="100"
                    value={maths}
                    onChange={(e) => setMaths(e.target.value)}
                    required
                />

                <input
                    className="form-input-group"
                    type="number"
                    placeholder="Science Mark"
                    min="0"
                    max="100"
                    value={science}
                    onChange={(e) => setScience(e.target.value)}
                    required
                />

                <input
                    className="form-input-group"
                    type="number"
                    placeholder="Social Mark"
                    min="0"
                    max="100"
                    value={social}
                    onChange={(e) => setSocial(e.target.value)}
                    required
                />

                <button type="submit" className="submit">
                    {selectedStudent ? "Update Student" : "Add Student"}
                </button>

            </form>
        </div>
    );
}

export default AddStudentForm;
