import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getAllConsultants } from '../../api-helpers/api-helpers';
import CustomCard from './CustomCard';

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
        <Box margin={'auto'} marginTop={4}>
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
            <Box
                width={'100%'}
                margin="auto"
                marginTop={5}
                display={'flex'}
                justifyContent="flex-start"
                flexWrap={'wrap'}
            >
                {Consultants &&
                    Consultants.map((Consultant, index) => {
                        console.log('sss', Consultant);
                        return (
                            <CustomCard
                                key={index}
                                id={Consultant._id}
                                jobs={Consultant.jobs}
                                country={Consultant.country}
                                name={Consultant.name}
                            />
                        );
                    })}
            </Box>
        </Box>
    );
};

export default ConsultantsComp;
