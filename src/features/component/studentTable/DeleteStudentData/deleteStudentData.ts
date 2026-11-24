
import API_URL from "../../../../api";

const deleteStudentData = async (id: string | number) => {
    try {
        const response = await fetch(
            `${API_URL}/${id}`,
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