import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllConsultants } from '../api-helpers/api-helpers';
import MovieItem from './Consultants/MovieItem';
import { getLogInToken } from '../util/localStorage';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('asdsdsg', getLogInToken());
        if (!getLogInToken()) {
            navigate({
                pathname: '/auth',
            });
        }
    });

    useEffect(() => {
        getAllConsultants()
            .then((data) => setMovies(data.consultant))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Box width={'100%'} height="100%" margin="auto" marginTop={2}>
            <Box margin={'auto'} width="80%" height={'40vh'} padding={2}>
                <img src="" alt="" width={'100%'} height={'100%'} />
            </Box>
            <Box padding={5} margin="auto">
                <Typography variant="h4" textAlign={'center'}>
                    Latest Releases
                </Typography>
            </Box>
            <Box
                margin={'auto'}
                display="flex"
                width="80%"
                justifyContent={'center'}
                alignItems="center"
                flexWrap="wrap"
            >
                {movies &&
                    movies
                        .slice(0, 4)
                        .map((movie, index) => (
                            <MovieItem
                                id={movie.id}
                                name={movie.name}
                                country={movie.country}
                                jobs={movie.jobs}
                                key={index}
                            />
                        ))}
            </Box>
            <Box display="flex" padding={5} margin="auto">
                <Button LinkComponent={Link} to="/movies" variant="outlined" sx={{ margin: 'auto', color: '#2b2d42' }}>
                    View All Movies
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
