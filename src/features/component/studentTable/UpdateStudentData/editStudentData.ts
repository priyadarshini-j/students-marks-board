import API_URL from "../../../../api";

async function editStudentData(id: string | number, student: Record<string, unknown>) {

    const response = await fetch(
        `${API_URL}/${id}`,
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