import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "50%",
    margin: "5% 0% 0% 25%",
    "& > *": {
      marginTop: 20,
    },
    fontSize: 40,
  },
  tabs: {
    margin: "0% 0% 0% 25%",
    "& > *": {
      marginTop: 20,
    },
    fontSize: 30,
    alignContent: "center",
  },
  btn: {
    marginTop: 20,
    marginLeft: "95%",
  },
}));

export default function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projects, setProjects] = useState({
    name: "",
    username: "",
    email: "",
    project: "",
  });

  const { name, username, email, project } = projects;
  const onInputChange = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/projects/${id}`, projects);
    navigate("/all");
  };

  const loadProjects = async () => {
    const result = await axios.get(`http://localhost:3003/projects/${id}`);
    setProjects(result.data);
  };

  const classes = useStyles();
  return (
    <>
      <form style={{ textAlign: "center" }}>
        <div className="container" style={{ marginTop: "20px" }}>
          <h1>Update Details</h1>
          <Grid xs={12} sm={6} item className={classes.tabs}>
            <TextField
              placeholder="Enter first name"
              label="First Name"
              variant="outlined"
              style={{ width: "400px" }}
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>

          <Grid xs={12} sm={6} item className={classes.tabs}>
            <TextField
              placeholder="Enter user name"
              label="@user_name"
              variant="outlined"
              style={{ width: "400px" }}
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>

          <Grid xs={12} sm={6} item className={classes.tabs}>
            <TextField
              placeholder="Enter Your E-mail Address"
              label="Email Address"
              variant="outlined"
              style={{ width: "400px" }}
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>

          <Grid xs={12} sm={6} item className={classes.tabs}>
            <TextField
              placeholder="Enter Your Project"
              label="Project"
              variant="outlined"
              style={{ width: "400px" }}
              name="project"
              value={project}
              onChange={(e) => onInputChange(e)}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <Button
              variant="outlined"
              className={classes.btn}
              onClick={(e) => add(e)}
            >
              Update
            </Button>
          </Grid>
        </div>
      </form>
    </>
  );
}
