async function editStudentData(id, student) {

    const response = await fetch(
        `http://localhost:3001/students/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return await response.json();
}

export default editStudentData;