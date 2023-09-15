import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomSnackBars from '../components/snackBar/SnackBar';
const UserProfile = () => {
    const [bookings, setBookings] = useState();
    const [user, setUser] = useState();
    const [triggerAlert, setTriggerAlert] = useState(false);
    useEffect(() => {
        getUserBooking()
            .then((res) => setBookings(res.bookings))
            .catch((err) => console.log(err));

        getUserDetails()
            .then((res) => setUser(res.user))
            .catch((err) => console.log(err));
    }, []);
    const handleDelete = (id) => {
        deleteBooking(id)
            .then((res) => {
                setTriggerAlert(true);
            })
            .catch((err) => console.log(err));
    };
    return (
        <React.Fragment>
            <div
                style={{
                    /*  position: 'absolute', */
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'pink',
                }}
            >
                <CustomSnackBars message="Booking Removed " snackBarType="error" snackBarOpen={triggerAlert} />
            </div>
            <Box width={'100%'} display="flex">
                <Fragment>
                    {user && (
                        <Box
                            flexDirection={'column'}
                            justifyContent="center"
                            alignItems={'center'}
                            width={'30%'}
                            padding={3}
                        >
                            <AccountCircleIcon sx={{ fontSize: '10rem', textAlign: 'center', ml: 3 }} />
                            <Typography
                                padding={1}
                                width={'auto'}
                                textAlign={'center'}
                                border={'1px solid #ccc'}
                                borderRadius={6}
                            >
                                Name: {user.name}
                            </Typography>
                            <Typography
                                mt={1}
                                padding={1}
                                width={'auto'}
                                textAlign={'center'}
                                border={'1px solid #ccc'}
                                borderRadius={6}
                            >
                                Email: {user.email}
                            </Typography>
                        </Box>
                    )}
                    {bookings && (
                        <Box width={'100%'} display="flex" flexDirection={'column'} sx={{ mt: '100px' }}>
                            <Typography
                                variant="h3"
                                fontFamily={'verdana'}
                                textAlign="center"
                                padding={2}
                                sx={{ fontWeight: 700 }}
                            >
                                Consultants Bookings
                            </Typography>
                            <Box margin={'auto'} display="flex" flexDirection={'column'} width="80%">
                                <List>
                                    {bookings.map((booking, index) => (
                                        <ListItem
                                            sx={{
                                                bgcolor: '#00d386',
                                                color: 'white',
                                                textAlign: 'center',
                                                margin: 1,
                                                borderRadius: '12px',
                                                border: '2px solid #000000',
                                            }}
                                        >
                                            <ListItemText
                                                sx={{ margin: 1, width: 'auto', textAlign: 'left', width: '30%' }}
                                            >
                                                consultant Name: {booking?.consultant?.name}
                                            </ListItemText>
                                            <ListItemText
                                                sx={{ margin: 1, width: 'auto', textAlign: 'left', width: '30%' }}
                                            >
                                                Time Slot: {booking?.time}
                                            </ListItemText>
                                            <ListItemText
                                                sx={{ margin: 1, width: 'auto', textAlign: 'left', width: '30%' }}
                                            >
                                                Date: {new Date(booking.date).toDateString()}
                                            </ListItemText>
                                            <IconButton
                                                onClick={() => handleDelete(booking._id)}
                                                color="error"
                                                sx={{ width: '5%', justifyContent: 'center', display: 'flex' }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    )}
                </Fragment>
            </Box>
        </React.Fragment>
    );
};

export default UserProfile;
