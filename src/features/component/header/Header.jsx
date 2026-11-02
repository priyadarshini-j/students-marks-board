import React from 'react';
import './Header.css';
function Header() {
    return <div className='header-container'>
        <div>
            <div className='student-class'>Class 10 - Marks Report</div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className='school-name'>Governemnt Higher Secondary School - Chennai</div>
                <div>Quartaly Exam - 2026</div>
            </div>
        </div>
    </div>
}
export default Header;