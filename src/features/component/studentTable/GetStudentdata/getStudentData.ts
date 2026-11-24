
import API_URL from "../../../../api";

const getStudentData = async (): Promise<unknown[]> => {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch student data");
        }
        const data = await response.json();

        return data.students || data;

    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getStudentData;