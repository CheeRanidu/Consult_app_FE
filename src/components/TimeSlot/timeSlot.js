import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

const timeConfig = [
    '08 00 AM',
    '08 30 AM ',
    '09 00 AM',
    '09 30 AM',
    '10 00 AM',
    '10 30 AM',
    '11 00 AM',
    '11 30 AM',
    '12 00 PM',
    '12 30 PM',
    '01 00 PM',
    '01 30 PM',
    '02 00 PM',
    '02 30 PM',
    '03 00 PM',
    '03 30 PM',
    '04 00 PM',
    '04 30 PM',
    '05 00 PM',
    '05 30 PM',
    '06 00 PM',
    '06 30 PM',
];

const TimeSlot = ({ setInputs, bookedTimeSlot }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    useEffect(() => {
        console.log('asasasas', selectedTimeSlot);
        setInputs((prevState) => ({
            ...prevState,
            time: selectedTimeSlot,
        }));
    }, [selectedTimeSlot]);

    const onClickTimeSlot = (SlotId) => {
        setSelectedTimeSlot(SlotId);
    };

    const ProcessTimeSlots = () => {
        return timeConfig.map((time, index) => {
            const disable = bookedTimeSlot.some((slot) => slot === index);
            return (
                <Grid item xs={6}>
                    <Box
                        onClick={() => onClickTimeSlot(index)}
                        sx={{
                            color: '#FFFFFF',
                            display: 'flex',
                            width: '100%',
                            height: '52px',
                            borderRadius: '12px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            pointerEvents: disable ? 'none' : 'auto',
                            ':hover': { background: '#ccc', cursor: disable ? 'not-allowed' : 'pointer' },
                            background: disable
                                ? 'red !important'
                                : selectedTimeSlot === index
                                ? '#515151 !important'
                                : 'transparent',
                            border: disable ? '3px solid #FFFFFF' : 'none',
                            fontWeight: 600,
                        }}
                    >
                        {time}
                    </Box>
                </Grid>
            );
        });
    };

    return (
        <Box
            sx={{
                borderRadius: '12px',
                background: '#828282',
                margin: '20px',
                padding: '10px',
                border: '5px solid #000000',
            }}
        >
            <Grid container spacing={2} sx={{}}>
                {ProcessTimeSlots()}
            </Grid>
        </Box>
    );
};

export default TimeSlot;
