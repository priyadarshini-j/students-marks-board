import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";

import Header from "./features/component/header/Header";
import Home from "./features/pages/Home/Home.jsx";
import StudentReport from "./features/pages/StudentReport/StudentReport.jsx";
import NotFound from "./features/pages/NotFound/NotFound.jsx";
import AddStudent from "./features/pages/addStudent/AddStudent.jsx";
import EditStudent from "./features/pages/editStudent/EditStudent.jsx";
import { fetchStudents } from "./features/students/studentsSlice";

function App() {
    const dispatch = useDispatch();

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