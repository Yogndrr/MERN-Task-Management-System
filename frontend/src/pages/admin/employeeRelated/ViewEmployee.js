import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../../redux/userRelated/userHandle';

const ViewEmployee = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { currentToken, employeeDetails } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getEmployeeDetails("employeeDetails", params.id, currentToken));
    }, [dispatch, currentToken, params.id]);

    return (
        <div>
            <h1>ViewEmployee</h1>
            {employeeDetails && employeeDetails.name}
        </div>
    )
}

export default ViewEmployee