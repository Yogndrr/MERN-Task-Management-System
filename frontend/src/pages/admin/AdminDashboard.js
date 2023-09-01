import React from 'react'
import { Link } from 'react-router-dom'
import { BlackButton, BlueButton, GreenButton, IndigoButton, LightPurpleButton, PurpleButton } from '../../components/buttonStyles'

const AdminDashboard = () => {
    return (
        <div>
            <h1>AdminDashboard</h1>
            <Link to="/Admin/employee/add">
                <GreenButton>
                    Add Employee +
                </GreenButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Admin/employees">
                <IndigoButton>
                    Show Employees
                </IndigoButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Admin/task/add">
                <BlackButton>
                    Add Task +
                </BlackButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Admin/tasks">
                <BlueButton>
                    Show Tasks
                </BlueButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Profile">
                <PurpleButton>
                    Profile
                </PurpleButton>
            </Link>
            <br /><br /><br /><br /><br />
            <Link to="/Logout">
                <LightPurpleButton>
                    Logout
                </LightPurpleButton>
            </Link>
        </div>
    )
}

export default AdminDashboard