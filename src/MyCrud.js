import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setisActive] = useState(0);

  const [editId, setEditId] = useState("");
  const [editName, editSetName] = useState("");
  const [editAge, editSetAge] = useState("");
  const [editIsActive, editSetisActive] = useState(0);

  const handleEdit = (id) => {
    //alert(id);
    handleShow();
  };

  const handleSave = () => {
    const url = "https://localhost:7131/api/Employee";
    const data = {
      "name": name,
      "age": age,
      "isActive": isActive,
    };

    axios.post(url,data)
    .then((result) =>{
       getData();
       clear();
       toast.success('Employee has been successfully recorded');
    })

  };

  const clear = () =>{
    setName('');
    setAge('');
    setisActive(0);
    editSetName('');
    editSetAge('');
    editSetisActive(0)
    setEditId('')
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7131/api/Employee")
      .then((result) => {
        setData(result.data); // Update state with API response
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you to delete this employee?") === true) alert(id);
  };

  const handleUpdate = () => {};

 const handleActiveChange = (e) =>{
     if (e.target.checked) 
     {
      setisActive(1);
     }
     else
     {
      setisActive(0);
     }
 }

 const editHandleActiveChange = (e) =>{
  if (e.target.checked) 
  {
   editSetisActive(1);
  }
  else
  {
   editSetisActive(0);
  }
}


  return (
    <Fragment>
    <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={handleActiveChange}
              value={isActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>IsActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.isActive}</td>
                <td colSpan={2}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => editSetName(e.target.value)}
                value={editName}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                onChange={(e) => editSetAge(e.target.value)}
                value={editAge}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editIsActive === 1 ? true : false}
                onChange={editHandleActiveChange}
                value={editIsActive}
              />
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
