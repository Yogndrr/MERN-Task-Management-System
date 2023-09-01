import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <Link to="/Choose">Choose User</Link>
        </div>
    )
}

export default Homepage