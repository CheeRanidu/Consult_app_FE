import axios from '../config/axios';

//import axios from "axios";
export const getAllConsultants = async () => {
    const res = await axios.get('/consultants').catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('No Data');
    }

    const data = await res.data;
    return data;
};

export const sendUserAuthRequest = async (data, signup) => {
    const res = await axios
        .post(`/user/${signup ? 'signup' : 'login'}`, {
            name: signup ? data.name : '',
            email: data.email,
            password: data.password,
        })
        .catch((err) => console.log(err));

    if (res.status !== 200 && res.status !== 201) {
        console.log('Unexpected Error Occurred');
    }

    const resData = await res.data;
    return resData;
};

export const sendAdminAuthRequest = async (data) => {
    const res = await axios
        .post('/admin/login', {
            email: data.email,
            password: data.password,
        })
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('Unexpectyed Error');
    }

    const resData = await res.data;
    return resData;
};

export const getConsultantsDetails = async (id) => {
    const res = await axios.get(`/consultants/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log('Unexpected Error');
    }
    const resData = await res.data;
    return resData;
};

export const newBooking = async (data) => {
    const res = await axios
        .post('/bookings', {
            consultant: data.consultant,
            time: data.time,
            date: data.date,
            user: localStorage.getItem('userId'),
        })
        .catch((err) => console.log(err));

    if (res.status !== 201) {
        return console.log('Unexpected Error');
    }
    const resData = await res.data;
    return resData;
};

export const getUserBooking = async () => {
    const id = localStorage.getItem('userId');
    const res = await axios.get(`/user/bookings/${id}`).catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('Unexpected Error');
    }
    const resData = await res.data;
    return resData;
};

export const deleteBooking = async (id) => {
    const res = await axios.delete(`/bookings/${id}`).catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('Unepxected Error');
    }

    const resData = await res.data;
    return resData;
};

export const getUserDetails = async () => {
    const id = localStorage.getItem('userId');
    const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
        return console.log('Unexpected Error');
    }
    const resData = await res.data;
    return resData;
};

export const addMovie = async (data) => {
    const res = await axios
        .post(
            '/consultants',
            {
                name: data.name,
                description: data.description,
                jobs: data.jobs,
                fetaured: data.fetaured,
                availableDates: data.availableDates,
                country: data.country,
                admin: localStorage.getItem('adminId'),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        )
        .catch((err) => console.log(err));

    if (res.status !== 201) {
        return console.log('Unexpected Error Occurred');
    }

    const resData = await res.data;
    return resData;
};

export const getAdminById = async () => {
    const adminId = localStorage.getItem('adminId');
    const res = await axios.get(`/admin/${adminId}`).catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('Unexpected Error Occurred');
    }

    const resData = await res.data;
    return resData;
};

export const getConsultantBooking = async (input) => {
    const { date, consultantId } = input;
    const res = await axios
        .post('/bookings/getBooking', {
            consultantId,
            date,
        })
        .catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log('Unexpected Error Occurred');
    }

    const resData = await res.data;
    return resData;
};
