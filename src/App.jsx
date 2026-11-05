
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./features/component/header/Header";
import Home from "./features/pages/Home/Home.jsx";
import StudentReport from "./features/pages/StudentReport/StudentReport.jsx";
import NotFound from "./features/pages/NotFound/NotFound.jsx";
import AddStudent from "./features/pages/addStudent/AddStudent.jsx";

function App() {
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
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </>
    );
}

export default App;
