import { Button } from '@mui/material';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import "./BookAdmin.css"

const BookAdmin = (props) => {
    const history = useNavigate();
    const {_id, name,author, description, price, image} = props.book;
    const deleteHandler = async () => {
        await axios
          .delete(`http://localhost:5000/books/${_id}`)
          .then((res) => res.data)
          .then(() => window.location.reload())
          .then(() => history("/books"));
      };
     
    return (
        <div className="card">
            <img src={image} alt={name}/>
            <article>Author : {author}</article>
            <h3>{name}</h3>
            <p>{description}</p>
            <h3>Rs {price}</h3>
            <Button variant="contained" 
            style={{ backgroundColor: 'black', color: 'white', marginBottom:'5px'}}
            LinkComponent={Link} to={`/books/${_id}`}>Update</Button>
            <Button variant="contained" 
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={deleteHandler} >Delete</Button>
        </div>

    )
}

export default BookAdmin;