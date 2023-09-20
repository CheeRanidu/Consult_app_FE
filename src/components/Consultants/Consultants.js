import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllConsultants } from '../../api-helpers/api-helpers';
import CustomCard from './CustomCard';
import Grid from '@mui/material/Unstable_Grid2';

const ConsultantsComp = () => {
    const [Consultants, setConsultants] = useState();
    useEffect(() => {
        getAllConsultants()
            .then((data) => setConsultants(data.consultant))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log('sssssssssssssssss', Consultants);
    }, [Consultants]);
    return (
        <Box margin={'auto'} marginTop={4} sx={{ marginX: 4 }}>
            <Typography
                margin={'auto'}
                variant="h4"
                padding={2}
                width="40%"
                bgcolor={'#00d386'}
                color="white"
                textAlign={'center'}
                sx={{ borderRadius: '12px' }}
            >
                All Consultants
            </Typography>
            <Grid container spacing={4} marginTop={4}>
                {Consultants &&
                    Consultants.map((Consultant, index) => {
                        console.log('sss', Consultant);
                        return (
                            <Grid xs={2}>
                                <CustomCard
                                    key={index}
                                    id={Consultant._id}
                                    jobs={Consultant.jobs}
                                    country={Consultant.country}
                                    name={Consultant.name}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Box>
    );
};

export default ConsultantsComp;
