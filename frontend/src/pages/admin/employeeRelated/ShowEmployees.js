import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GreenButton } from '../../../components/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../../../redux/userRelated/userHandle';

const ShowEmployees = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { loading, employeesList, response, currentToken } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllEmployees('employeeList', currentToken));
    }, [dispatch, currentToken]);

    return (
        <>
            {
                loading ?
                    <>
                        <h1>Loading....</h1>
                    </>
                    :
                    <>
                        {
                            response ?
                                <>
                                    <h1>{response}</h1>
                                </>
                                :
                                <>
                                    {
                                        employeesList.map((employee) => (
                                            <div key={employee._id}>
                                                <li>
                                                    {employee.name}
                                                </li>
                                                <GreenButton variant="contained"
                                                    onClick={() => navigate("/Admin/employee/view/" + employee._id)}>
                                                    View
                                                </GreenButton>
                                            </div>
                                        ))
                                    }
                                </>
                        }
                    </>
            }
        </>
    )
}

export default ShowEmployees