import { Button, FormLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultantBooking, getConsultantsDetails, newBooking } from '../../api-helpers/api-helpers';
import CustomSnackBars from '../snackBar/SnackBar';
import TimeSlot from '../TimeSlot/timeSlot';
import Img from '../../asset/img.jpg';

const Booking = () => {
    const [consultants, setConsultants] = useState();
    const [inputs, setInputs] = useState({ time: '', date: '' });
    const [triggerAlert, setTriggerAlert] = useState(false);
    const id = useParams().id;
    const [bookedTimeSlot, setBookedTimeSlot] = useState([]);

    console.log('ssss id', id);

    useEffect(() => {
        const input = { date: inputs.date, consultantId: id };
        if (input.date?.length > 0) {
            getConsultantBooking(input)
                .then((res) => {
                    console.log(res.bookings);
                    const timeSlot = [];
                    res.bookings.map(({ time }) => {
                        timeSlot.push(time);
                    });
                    console.log(timeSlot);
                    setBookedTimeSlot(timeSlot);
                })
                .catch((err) => console.log(err));
        }
    }, [inputs.date, triggerAlert]);

    useEffect(() => {
        getConsultantsDetails(id)
            .then((res) => {
                console.log(res.consultant);
                setConsultants(res.consultant);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        console.log(e.target);
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, consultants: consultants._id, consultant: id })
            .then((res) => setTriggerAlert(true))
            .catch((err) => console.log(err));
        console.log('fn', { ...inputs, consultants: consultants._id });
    };

    useEffect(() => {
        console.log(',,,,,,,,,,,,', inputs);
    }, [inputs]);

    // Calculate the minimum date (current date) and the maximum date (7 days from now)
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 7);

    return (
        <Fragment>
            {consultants && (
                <Fragment>
                    <div
                        style={{
                            /*  position: 'absolute', */
                            width: '100vw',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <CustomSnackBars
                            message="Consultant Booked "
                            snackBarType="success"
                            snackBarOpen={triggerAlert}
                        />
                    </div>
                    <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign={'center'}>
                        Book Your consultant {consultants.title}
                    </Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Box
                            display={'flex'}
                            justifyContent={'column'}
                            flexDirection="column"
                            paddingTop={3}
                            width="30%"
                            marginRight={'auto'}
                        >
                            <img
                                width="200px"
                                height={'auto'}
                                style={{ border: '3px solid #000000', borderRadius: '100%', marginLeft: '80px' }}
                                src={Img}
                                alt={consultants.title}
                            />
                            <Box width={'80%'} marginTop={3} padding={2} sx={{ marginLeft: '80px' }}>
                                <Typography paddingTop={2} sx={{ fontSize: '24px', fontWeight: 700 }}>
                                    {consultants.description}
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 700 }} marginTop={1}>
                                    Jobs:
                                    <span style={{ fontWeight: 400 }}>
                                        {consultants.jobs.map((job) => ' ' + job + ' ')}
                                    </span>
                                </Typography>
                                <Typography sx={{ fontSize: '18px', fontWeight: 700 }} marginTop={1}>
                                    availableDates:
                                    <span style={{ fontWeight: 400 }}>
                                        {new Date(consultants.availableDates).toDateString()}
                                    </span>
                                </Typography>
                            </Box>
                        </Box>
                        <Box width={'70%'} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box
                                    margin={'auto'}
                                    display="flex"
                                    flexDirection={'column'}
                                    sx={{ marginRight: '60px' }}
                                >
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1, flexDirection: 'column', display: 'flex' }}>
                                            <FormLabel sx={{ fontSize: '32px', color: '#000000', fontWeight: 900 }}>
                                                Booking Date
                                            </FormLabel>
                                            <TextField
                                                name="date"
                                                type={'date'}
                                                margin="normal"
                                                variant="standard"
                                                value={inputs.date}
                                                onChange={handleChange}
                                                // Set the min and max date values
                                                inputProps={{
                                                    min: currentDate.toISOString().split('T')[0],
                                                    max: maxDate.toISOString().split('T')[0],
                                                }}
                                            />
                                            <Button
                                                type="submit"
                                                sx={{
                                                    mt: 3,
                                                    color: '#FFFFFF',
                                                    fontSize: '20px',
                                                    background: '#828282',
                                                    fontWeight: 600,
                                                    ':hover': { background: '#ccc', cursor: 'pointer' },
                                                }}
                                            >
                                                Book Now
                                            </Button>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <FormLabel sx={{ fontSize: '32px', color: '#000000', fontWeight: 900 }}>
                                                Time Slot
                                            </FormLabel>
                                            <TimeSlot setInputs={setInputs} bookedTimeSlot={bookedTimeSlot} />
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Booking;
