import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomSnackBars from "../components/snackBar/SnackBar";
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
  }, [triggerAlert]);
  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        setTriggerAlert(true);
      })
      .catch((err) => console.log(err));
  };

  const findTimeSlot = (timeSlot) => {
    switch (timeSlot) {
      case 0:
        return "08 00 AM";
      case 1:
        return "08 30 AM ";
      case 2:
        return "09 00 AM";
      case 3:
        return "09 30 AM";
      case 4:
        return "10 00 AM";
      case 5:
        return "10 30 AM";
      case 6:
        return "11 00 AM";
      case 7:
        return "11 30 AM";
      case 8:
        return "12 00 PM";
      case 9:
        return "12 30 PM";
      case 10:
        return "01 00 PM";
      case 11:
        return "01 30 PM";
      case 12:
        return "02 00 PM";
      case 13:
        return "02 30 PM";
      case 14:
        return "03 00 PM";
      case 15:
        return "03 30 PM";
      case 16:
        return "04 00 PM";
      case 17:
        return "04 30 PM";
      case 18:
        return "05 00 PM";
      case 19:
        return "05 30 PM";
      case 20:
        return "06 00 PM";
      case 21:
        return "06 30 PM";
      default:
        return "not valid";
    }
  };

  const listitemStyle = {
    margin: 1,
    textAlign: "left",
    width: "30%",
  };
  return (
    <React.Fragment>
      <div
        style={{
          /*  position: 'absolute', */
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          background: "pink",
        }}
      >
        <CustomSnackBars
          message="Booking Removed "
          snackBarType="error"
          snackBarOpen={triggerAlert}
        />
      </div>
      <Box width={"100%"} display="flex">
        <Fragment>
          {user && (
            <Box
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
              width={"30%"}
              padding={3}
            >
              <AccountCircleIcon
                sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
              />
              <Typography
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                Name: {user.name}
              </Typography>
              <Typography
                mt={1}
                padding={1}
                width={"auto"}
                textAlign={"center"}
                border={"1px solid #ccc"}
                borderRadius={6}
              >
                Email: {user.email}
              </Typography>
            </Box>
          )}
          {bookings && (
            <Box
              width={"100%"}
              display="flex"
              flexDirection={"column"}
              sx={{ mt: "100px" }}
            >
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign="center"
                padding={2}
                sx={{ fontWeight: 700 }}
              >
                Consultants Bookings
              </Typography>
              <Box
                margin={"auto"}
                display="flex"
                flexDirection={"column"}
                width="80%"
              >
                <List>
                  {bookings.map((booking, index) => (
                    <ListItem
                      sx={{
                        bgcolor: "#00d386",
                        color: "white",
                        textAlign: "center",
                        margin: 1,
                        borderRadius: "12px",
                        border: "2px solid #000000",
                      }}
                    >
                      <ListItemText sx={listitemStyle}>
                        consultant Name: {booking?.consultant?.name}
                      </ListItemText>
                      <ListItemText sx={listitemStyle}>
                        Time Slot: {findTimeSlot(booking?.time)}
                      </ListItemText>
                      <ListItemText sx={listitemStyle}>
                        Date: {new Date(booking.date).toDateString()}
                      </ListItemText>
                      <IconButton
                        onClick={() => handleDelete(booking._id)}
                        color="error"
                        sx={{
                          width: "5%",
                          justifyContent: "center",
                          display: "flex",
                        }}
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
