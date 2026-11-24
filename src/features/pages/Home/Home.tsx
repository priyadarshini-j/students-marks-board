import StateCards from "../../component/stateCards/StateCards";
import StudentTable from "../../component/studentTable/StudentTable";


function Home() {
    return (
        <div className="min-h-screen bg-[#f5f7fb] p-[30px] font-['Poppins',sans-serif]">

            <StateCards />


            <StudentTable />

        </div>
    );
}

export default Home;