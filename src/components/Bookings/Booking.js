import { Button, FormLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultantsDetails, newBooking } from '../../api-helpers/api-helpers';
import CustomSnackBars from '../snackBar/SnackBar';

const Booking = () => {
    const [consultants, setConsultants] = useState();
    const [inputs, setInputs] = useState({ time: '', date: '' });
    const [triggerAlert, setTriggerAlert] = useState(false);
    const id = useParams().id;

    console.log('ssss id', id);

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
        console.log(',,,,,,,,,,,,', consultants);
    }, [consultants]);

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
                            background: 'pink',
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
                            width="50%"
                            marginRight={'auto'}
                        >
                            <img width="80%" height={'300px'} src={consultants.posterUrl} alt={consultants.title} />
                            <Box width={'80%'} marginTop={3} padding={2}>
                                <Typography paddingTop={2}>{consultants.description}</Typography>
                                <Typography fontWeight={'bold'} marginTop={1}>
                                    Jobs:
                                    {consultants.jobs.map((job) => ' ' + job + ' ')}
                                </Typography>
                                <Typography fontWeight={'bold'} marginTop={1}>
                                    availableDates: {new Date(consultants.availableDates).toDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box width={'50%'} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} margin={'auto'} display="flex" flexDirection={'column'}>
                                    <FormLabel>Time Slot</FormLabel>
                                    <TextField
                                        name="time"
                                        value={inputs.time}
                                        onChange={handleChange}
                                        type={'number'}
                                        margin="normal"
                                        variant="standard"
                                    />
                                    <FormLabel>Booking Date</FormLabel>
                                    <TextField
                                        name="date"
                                        type={'date'}
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.date}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" sx={{ mt: 3 }}>
                                        Book Now
                                    </Button>
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
