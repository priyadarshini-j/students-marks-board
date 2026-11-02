
const getStudentData = async () => {
    try {
        const response = await fetch("http://localhost:3001/students", {
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