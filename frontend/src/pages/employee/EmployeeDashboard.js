import React from 'react'
import { Link } from 'react-router-dom'
import { DarkRedButton, PurpleButton } from '../../components/buttonStyles'

const EmployeeDashboard = () => {
    return (
        <div>
            <h1>EmployeeDashboard</h1>
            <Link to="/Profile">
                <PurpleButton>
                    Profile
                </PurpleButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Logout">
                <DarkRedButton>
                    Logout
                </DarkRedButton>
            </Link>
        </div>
    )
}

export default EmployeeDashboard