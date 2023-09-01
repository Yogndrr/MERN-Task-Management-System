import { useEffect, useState } from 'react';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';

const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [assignee, setAssignee] = useState("");
    const taskStatus = "To Do"

    const dispatch = useDispatch()

    const { status, error } = useSelector(state => state.task);
    const { currentToken, employeesList } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { title, description, dueDate, taskStatus };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff("taskCreate", fields, currentToken))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Task</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={assignee}
                                        label="Choose an option"
                                        onChange={(e) => setAssignee(e.target.value)} required
                                    >
                                        {employeesList ?
                                            employeesList.map((employee) => (
                                                <MenuItem key={employee._id} value={employee._id}>
                                                    {employee.name}
                                                </MenuItem>
                                            ))
                                            :
                                            <MenuItem value="Select Subject">
                                                Add Employees Fist
                                            </MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label="Enter title for task"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Write your task"
                                    variant="outlined"
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                                <TextField
                                    fullWidth
                                    label="Select a Due Date"
                                    type="date"
                                    value={dueDate}
                                    onChange={(event) => setDueDate(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddTask;