import StateCards from "../../component/stateCards/StateCards";
import StudentTable from "../../component/studentTable/StudentTable";
import "./Home.css";

function Home() {
    return (
        <div className="min-h-screen bg-[#f5f7fb] p-[30px] font-['Poppins',sans-serif]">

            <StateCards />

            {/* Topper card: use `const topper = useSelector(selectTopper)` from studentsSlice */}

            <StudentTable />

        </div>
    );
}

export default Home;