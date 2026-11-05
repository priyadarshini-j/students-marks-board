const addStudentData = async (newStudent) => {
    try {
        const response = await fetch("http://localhost:3001/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newStudent)
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error adding student:", error);
        throw error;
    }
};

export default addStudentData;