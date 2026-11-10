
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {

    return (
        <header className="w-full bg-[#1F4D3A] px-5 py-5 text-white sm:px-10">

            <h1 className="text-2xl font-bold sm:text-3xl">
                Class 10 - Marks Report
            </h1>


            <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:text-base">

                <div>
                    Government Higher Secondary School - Chennai
                </div>

                <div>
                    Quarterly Exam - 2026
                </div>

            </div>


            <nav className="mt-5 flex flex-wrap gap-3">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `rounded-md px-4 py-2 text-sm font-medium transition ${isActive
                            ? "bg-[#338f56] text-white"
                            : "text-gray-100 hover:bg-[#286347]"
                        }`
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `rounded-md px-4 py-2 text-sm font-medium transition ${isActive
                            ? "bg-[#338f56] text-white"
                            : "text-gray-100 hover:bg-[#286347]"
                        }`
                    }
                >
                    Add Student
                </NavLink>

            </nav>

        </header>
    );
}

export default Header;
