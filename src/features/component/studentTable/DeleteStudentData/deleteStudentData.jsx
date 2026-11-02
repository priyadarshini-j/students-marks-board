
const deleteStudentData = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3001/students/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        return await response.json();

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default deleteStudentData;