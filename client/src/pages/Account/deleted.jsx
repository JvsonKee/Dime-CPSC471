import React from 'react'
import { Link } from "react-router-dom"

const Deleted = () => {
    return (
        <div className = 'UpdateEmail'>
            <h1>Your account has been deleted</h1>
            <button>
            <Link to ="/">Return to log in page</Link>
        </button>
        </div>
    )
}

export default Deleted