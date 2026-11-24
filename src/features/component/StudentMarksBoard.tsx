import StateCards from "./stateCards/StateCards";
import StudentTable from "./studentTable/StudentTable";

function StudentMarksBoard() {
    return (
        <div className="mb-[30px]">
            <StateCards />
            <StudentTable />
        </div>
    );

}
export default StudentMarksBoard;