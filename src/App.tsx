import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
// import "./App.css";

import Header from "./features/component/header/Header";
import Home from "./features/pages/Home/Home";
import StudentReport from "./features/pages/StudentReport/StudentReport";
import NotFound from "./features/pages/NotFound/NotFound";
import AddStudent from "./features/pages/addStudent/AddStudent";
import EditStudent from "./features/pages/editStudent/EditStudent";
import { fetchStudents } from "./features/students/studentsSlice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStudents());
    }, [dispatch]);

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/student/:id"
                    element={<StudentReport />}
                />

                <Route
                    path="/add"
                    element={<AddStudent />}
                />

                <Route
                    path="/edit/:id"
                    element={<EditStudent />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </>
    );
}

export default App;