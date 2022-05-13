import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Button, Table } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const useStyles = makeStyles({
  header: {
    background: "black",
  },
  tabs: {
    color: "white",
    fontSize: 17,
  },
  container: {
    width: "80%",
    margin: "3% 0% 0% 22%",
  },
  nav: {
    textDecoration: "none",
  },
});

export default function AllData() {
  const classes = useStyles;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = async () => {
    const responce = await axios.get("http://localhost:3003/projects");
    // console.log(responce.data);
    setProjects(responce.data);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      axios.delete(`http://localhost:3003/projects/${id}`);
    }
    window.location.reload(true);
  };
  return (
    <div>
      <h1>Project Details</h1>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "15%",
          }}
        >
          <Button
            style={{ padding: "1%", paddingRight: "3%", paddingLeft: "3%" }}
            onClick={() => navigate("/add")}
            variant="outlined"
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.tabs}>Name</TableCell>
              <TableCell className={classes.tabs}>UserName</TableCell>
              <TableCell className={classes.tabs}>Email</TableCell>
              <TableCell className={classes.tabs}>Project</TableCell>
              <TableCell className={classes.tabs}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tabs}>
            {projects.map((project) => (
              <TableRow>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.username}</TableCell>
                <TableCell>{project.email}</TableCell>
                <TableCell>{project.project}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/edit/${project.id}`)}>
                    <AiFillEdit />
                  </Button>
                  <Button color="error" onClick={() => handleDelete(project.id)}>
                    <AiFillDelete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}