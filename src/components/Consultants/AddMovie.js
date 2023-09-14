import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovie = () => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    country: "",
    availableDates: "",
    featured: false,
  });
  const [jobs, setjobs] = useState([]);
  const [job, setjob] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, jobs);
    addMovie({ ...inputs, jobs })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New consultant
          </Typography>
          <FormLabel sx={labelProps}>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            name="name"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Country</FormLabel>
          <TextField
            value={inputs.country}
            onChange={handleChange}
            name="country"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Available Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.availableDates}
            onChange={handleChange}
            name="availableDates"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Jobs</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={job}
              name="jobs"
              onChange={(e) => setjob(e.target.value)}
              variant="standard"
              margin="normal"
            />
            <Button
              onClick={() => {
                setjobs([...jobs, job]);
                setjob("");
              }}
            >
              Add
            </Button>
          </Box>
          {/* <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            name="fetaured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevSate) => ({
                ...prevSate,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          /> */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Consultant
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovie;
