import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackBars = ({ message, snackBarType, snackBarOpen }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(snackBarOpen);
    }, [snackBarOpen]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const RenderSnackBar = () => {
        let comp = <div></div>;
        switch (snackBarType) {
            case 'error':
                comp = (
                    <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                );
                break;
            case 'warning':
                comp = (
                    <Alert severity="warning" onClose={handleClose} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                );
                break;
            case 'info':
                comp = (
                    <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                );
                break;
            case 'success':
                comp = (
                    <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                );
                break;
        }
        return comp;
    };

    return (
        <Stack
            spacing={2}
            sx={{
                width: '60vw !important ',
                '.MuiAlert-root': {
                    width: '60vw',
                },
            }}
        >
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar at the top center
            >
                {RenderSnackBar()}
            </Snackbar>
        </Stack>
    );
};

export default CustomSnackBars;
