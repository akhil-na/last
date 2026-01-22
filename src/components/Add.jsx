import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = (e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log("Submit clicked!", inputs);

    axios
      .post("http://localhost:3002/add", inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "600px" }}
        onSubmit={addData} // ✅ form submit
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
          fullWidth
        />
        
        <TextField
          variant="outlined"
          placeholder="Content"
          name="content"
          value={inputs.content}
          multiline={4}
          onChange={inputHandler}
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          name="img_url"
          value={inputs.img_url}
          onChange={inputHandler}
        />
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
