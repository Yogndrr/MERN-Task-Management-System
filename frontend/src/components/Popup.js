import * as React from 'react';
import { useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { underControl } from '../redux/userRelated/userSlice';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top"
    const horizontal = "right"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl())
    };

    return (
        <>
            <Snackbar open={showPopup} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                {
                    (message === "Done Successfully") ?
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                        :
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                }
            </Snackbar>
        </>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
