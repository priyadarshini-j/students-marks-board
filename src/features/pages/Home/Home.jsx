import React from "react";
import useStudents from "../../../hooks/useStudents";
import useStats from "../../../hooks/useStats";
import StateCards from "../../component/stateCards/StateCards";
import StudentTable from "../../component/studentTable/StudentTable";
import "./Home.css";

function Home() {
    const { students, loading, error } = useStudents();
    const { topper } = useStats(students);

    return (
        <div className="home-container">

            <StateCards />

            {/* <div className="topper-card">
                <h3>🏆 Class Topper</h3>

                {loading ? (
                    <p>Loading topper details...</p>
                ) : error ? (
                    <p>Unable to load topper details.</p>
                ) : topper ? (
                    <>
                        <p>Name: {topper.name}</p>
                        <p>Total: {topper.total}</p>
                        <p>Percentage: {topper.percentage}%</p>
                    </>
                ) : (
                    <p>No topper available.</p>
                )}
            </div> */}

            <StudentTable />

        </div>
    );
}

export default Home;