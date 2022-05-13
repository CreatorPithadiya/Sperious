import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddData() {

  const [values, setValues] = useState({ name: "", email: "", username: "", project: "" });
  const [error, setError] = useState("");
  const { name, username, email, project } = values;


  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !project || !username) {
      setError("Please Insert Details!!!")
    } else {
      axios.post("http://localhost:3003/projects", values);
      console.log(values);
      navigate("/all");
      window.location.reload(true);
      setError("");
    }
  }

  return (
    <>
      {error && <h1 style={{ color: 'red', textAlign: 'center' }}>{error}</h1>}
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div className="container" style={{ marginTop: "20px" }}>
          <h1>Add Project</h1>
          <br />
          <br />
          <TextField
            placeholder='FullName'
            type="text"
            onChange={handleInputChange}
            name='name'
            value={name}
            style={{ width: "400px" }}
            size="large"
          />
          <br />
          <br />
          <TextField
            placeholder='UserName'
            type="text"
            onChange={handleInputChange}
            name='username'
            value={username}
            style={{ width: "400px" }}
            size="large"
          />
          <br />
          <br />
          <TextField
            placeholder='E-Mail'
            type="email"
            name='email'
            onChange={handleInputChange}
            value={email}
            style={{ width: "400px" }}
            size="large"
          />
          <br />
          <br />
          <TextField
            placeholder='Project'
            type="text"
            onChange={handleInputChange}
            name='project'
            value={project}
            style={{ width: "400px" }}
            size="large"
          />
          <br />
          <br />
          <Button type="submit" variant='outlined'>
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}