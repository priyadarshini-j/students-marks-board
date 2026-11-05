import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className='header-container'>

            <div className='student-class'>
                Class 10 - Marks Report
            </div>

            <div className='header-details'>
                <div className='school-name'>
                    Government Higher Secondary School - Chennai
                </div>

                <div>Quarterly Exam - 2026</div>
            </div>

            <nav className="header-nav">

                <NavLink to="/" end>
                    Home
                </NavLink>

                <NavLink to="/add">
                    Add Student
                </NavLink>
                

            </nav>

        </div>
    );
}

export default Header;