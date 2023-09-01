import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTaskDetails } from '../../../redux/taskRelated/taskHandle';

const ViewTask = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { currentToken } = useSelector((state) => state.user);
    const { taskDetails } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getTaskDetails("taskDetails", currentToken, params.id));
    }, [dispatch, currentToken, params.id]);

    return (
        <div>
            <h1>ViewTask</h1>
            {taskDetails && taskDetails.description}
        </div>
    )
}

export default ViewTask