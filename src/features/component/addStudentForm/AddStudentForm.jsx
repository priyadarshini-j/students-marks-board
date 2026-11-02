<<<<<<< HEAD
import React from "react";
import './AddStudentForm.css';
function AddStudentForm() {
    return <div className="student-form-container">
        <div className="add-student-form">Add Student</div>
        <div>
            <input className="add-student-details" type="text" placeholder="Student Name" />
            <input className="add-student-details" type="text" placeholder="Tamil" />
            <input className="add-student-details" type="text" placeholder="English" />
            <input className="add-student-details" type="text" placeholder="Maths" />
            <input className="add-student-details" type="text" placeholder="Science" />
            <input className="add-student-details" type="text" placeholder="Social" />
            <button className="add-button">Add Student</button>
        </div>
    </div>

}
=======
import React, { useState } from "react";
import './AddStudentForm.css';
function AddStudentForm({ onAddStudent }) {
    const [name, setName] = useState("");
    const [tamil, setTamil] = useState("");
    const [english, setEnglish] = useState("");
    const [maths, setMaths] = useState("");
    const [science, setScience] = useState("");
    const [social, setSocial] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        const newStudent = {
            name: name.trim(),
            tamil: Number(tamil),
            english: Number(english),
            maths: Number(maths),
            science: Number(science),
            social: Number(social)
        };

        onAddStudent(newStudent);
        setName("");
        setTamil("");
        setEnglish("");
        setMaths("");
        setScience("");
        setSocial("");
    }


    return <div className="student-form-container">
        <div className="add-student-form">Add Student</div>
        <form onSubmit={handleSubmit}>

            <div >

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
                    Add Student
                </button>

            </div>


        </form>
    </div>

}
>>>>>>> 6cc08d4 (updated student board)
export default AddStudentForm;