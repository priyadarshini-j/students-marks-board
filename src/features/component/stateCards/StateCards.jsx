
import useStats from "../../../hooks/useStats";
import useStudents from "../../../hooks/useStudents";
import "./StateCards.css";

function StateCards() {

    const { students } = useStudents();

    const {
        total,
        passed,
        failed,
        average
    } = useStats(students);

    return (
        <div className="student-state-container">

            <div className="state-card">
                <h3 className="state-card-fields">Total Students</h3>
                <h2 className="student-card-count">{total}</h2>
            </div>

            <div className="state-card">
                <h3 className="state-card-fields">Passed</h3>
                <h2 className="student-card-count" style={{ color: "green" }}>
                    {passed}
                </h2>
            </div>

            <div className="state-card">
                <h3 className="state-card-fields">Failed</h3>
                <h2 className="student-card-count" style={{ color: "red" }}>
                    {failed}
                </h2>
            </div>

            <div className="state-card">
                <h3 className="state-card-fields">Average</h3>
                <h2 className="student-card-count">{average}%</h2>
            </div>

        </div>
    );
}

export default StateCards;
