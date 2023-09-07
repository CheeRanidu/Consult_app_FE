import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useNavigate } from "react-router-dom";

const labelStyle = { mt: 1, mb: 1 };
const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const onclickSwitchAccount = () => {
    if (window.location.pathname.includes("auth")) {
      navigate({ pathname: "/admin" });
    } else {
      {
        navigate({ pathname: "/auth" });
      }
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to="/">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              />
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            onClick={onclickSwitchAccount}
            fullWidth
            variant="contained"
          >
            Switch Account
          </Button>
          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              Switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
