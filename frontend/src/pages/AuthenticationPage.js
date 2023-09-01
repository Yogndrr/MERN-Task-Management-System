import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid, Box, Typography, Paper, Checkbox, FormControlLabel,
    TextField, CssBaseline, IconButton, InputAdornment, CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import { authHandler } from '../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const AuthenticationPage = ({ mode, role }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, response, error, currentToken } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [companyNameError, setCompanyNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (mode === "Register") {
            const name = event.target.userName.value;
            const companyName = event.target.companyName.value;

            if (!name) {
                if (!name) setUserNameError(true);
                if (!companyName) setCompanyNameError(true);
                return;
            }

            const fields = { name, email, password, companyName, role }
            dispatch(authHandler(fields, role, mode))
        }
        else if (mode === "Login") {
            const fields = { email, password }
            dispatch(authHandler(fields, role, mode))
        }
        setLoader(true)
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'userName') setUserNameError(false);
        if (name === 'companyName') setCompanyNameError(false);
    };

    useEffect(() => {
        if (status === 'success' && currentToken !== null) {
            navigate('/Dashboard');
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
    }, [status, currentToken, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            {role} {mode}
                        </Typography>

                        {mode === "Register" &&
                            <Typography variant="h7">
                                Register as admin and you can view whole system.
                                <br />
                                You will be able to do changes and manage the system.
                            </Typography>
                        }

                        {mode === "Login" &&
                            <Typography variant="h7">
                                Welcome back! Please enter your details
                            </Typography>
                        }

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {mode === "Register" &&
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="Enter your name"
                                        name="userName"
                                        autoComplete="name"
                                        autoFocus
                                        error={userNameError}
                                        helperText={userNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="companyName"
                                        label="Create your company name"
                                        name="companyName"
                                        autoComplete="name"
                                        autoFocus
                                        error={companyNameError}
                                        helperText={companyNameError && 'Company Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            }
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : mode}
                            </LightPurpleButton>
                            {
                                role === "Admin" &&
                                <Grid container>
                                    <Grid>
                                        {mode === "Register" &&
                                            "Already have an account?"
                                        }
                                        {mode === "Login" && role === "Admin" &&
                                            "Don't have an account?"
                                        }
                                    </Grid>
                                    <Grid item sx={{ ml: 2 }}>
                                        {mode === "Register" &&
                                            <StyledLink to="/Adminlogin">
                                                Log in
                                            </StyledLink>
                                        }
                                        {mode === "Login" && role === "Admin" &&
                                            <StyledLink to="/Adminregister">
                                                Sign up
                                            </StyledLink>
                                        }
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider >
    );
}

export default AuthenticationPage

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
