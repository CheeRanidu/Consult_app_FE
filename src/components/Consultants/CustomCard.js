import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomCard = ({ name, country, jobs, id }) => {
    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: 5,
                ':hover': {
                    border: '3px solid #000000',
                },
            }}
        >
            {/* <img height={"50%"} width="100%" src={posterUrl} alt={title} /> */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100%',
                    backgroundColor: 'lightseagreen',
                }}
            >
                <CardContent sx={{ flex: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {jobs}
                    </Typography>
                </CardContent>
                <CardActions sx={{ flex: 1 }}>
                    {localStorage.getItem('adminId')?.length > 0 ? null : (
                        <Button
                            variant="contained"
                            fullWidth
                            LinkComponent={Link}
                            to={`/booking/${id}`}
                            sx={{
                                margin: 'auto',
                                bgcolor: '#2b2d42',
                                ':hover': {
                                    bgcolor: '#121217',
                                },
                            }}
                            size="small"
                        >
                            Book
                        </Button>
                    )}
                </CardActions>
            </Box>
        </Card>
    );
};

export default CustomCard;
