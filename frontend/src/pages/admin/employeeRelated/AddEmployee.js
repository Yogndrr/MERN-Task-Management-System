import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("");
    const role = "Employee"

    const dispatch = useDispatch()

    const { currentToken, status, response, error } = useSelector(state => state.user);

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { name, email, password, position, role };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff("EmployeeRegister", fields, currentToken))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setLoader(false)
            setMessage("Network Error")
            setShowPopup(true)
        }
    }, [status, response, error])

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
                            <Typography variant="h4">Employee</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Enter employee's name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Enter employee's email"
                                    value={email}
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Create password"
                                    value={password}
                                    type="password"
                                    onChange={(event) => setPassword(event.target.value)} required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Enter employee's position in company"
                                    value={position}
                                    onChange={(event) => setPosition(event.target.value)} required
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

export default AddEmployee;