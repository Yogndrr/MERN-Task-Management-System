import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../../redux/taskRelated/taskHandle';
import { GreenButton } from '../../../components/buttonStyles';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { singleDeleteHandler } from '../../../redux/userRelated/userHandle';

const ShowTasks = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { currentToken } = useSelector((state) => state.user);
    const { loading, tasksList, response } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(getAllTasks('taskListbyAdmin', currentToken));
        console.log(tasksList)
    }, [dispatch, currentToken]);

    const handleDelete = (id) => {
        dispatch(singleDeleteHandler("deleteTaskbyAdmin", id, currentToken))
            .then(() => {
                dispatch(getAllTasks('taskListbyAdmin', currentToken));
            })
    }

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
                                        tasksList.map((task) => (
                                            <div key={task._id}>
                                                <li>
                                                    {task.description}
                                                </li>
                                                <IconButton onClick={() => handleDelete(task._id)} color="secondary">
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                                <GreenButton variant="contained"
                                                    onClick={() => navigate("/Admin/task/view/" + task._id)}>
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

export default ShowTasks