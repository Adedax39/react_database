import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';

const CRUD = () =>{

const empdata = [
    {
      id : 1,
      name : "Bruce",
      age :26,
      isActive : 1
    },
    {
        id : 2,
        name : "Tony",
        age :36,
        isActive : 1

    },
    {
        id : 3,
        name : "Alfred",
        age :76,
        isActive : 0
      }
]
 const handleEdit = (id) => {
     alert(id);
 }

 const handleDelete = (id) => {
    alert(id);
}



    const [data,setData] = useState([])

    useEffect(()=>(
        setData(empdata)
     ),[])
    return(
    <Fragment>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>IsActive</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
       {
         data && data.length > 0 ?
         (data.map((item, index) =>(
         <tr key={index}>
          <td>{index+ 1}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.isActive}</td>
          <td colSpan={2}>
            <button className = "btn btn-primary" onClick={() =>handleEdit(item.id)}>Edit</button> &nbsp;          
            <button className = "btn btn-danger" onClick={() =>handleDelete(item.id)}>Delete</button>
          </td>
        </tr>
         )))
         :
         "Loading..."
       }        
       </tbody>
     </Table>
    </Fragment>
    )
}

export default CRUD;