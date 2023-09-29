import { Button } from '@mui/material';
import axios from 'axios'
import React from 'react'
import "./BookCart.css"

const BooksCart = (props) => {

    const {_id,name,author, description, price, image} = props.book;

    // Function to add to cart button click event
    const handleButtonClick = () => {
        sendRequest();
        window.location.reload();
    };

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/books/${_id}`, {
                name: String(name),
                author: String(author),
                description: String(description),
                price: Number(price),
                image: String(image),
                cart: false, // setting to false since book is removed from cart
                available: true, // book removed from cart, so book is available on store page
            })
            .then((res) => res.data);
    };

    return (
        <div className="cart-card">
            <img src={image} alt={name}/>
            <article>Author : {author}</article>
            <h3>{name}</h3>
            <p>{description}</p>
            <h3>Rs {price}</h3>
            <Button variant='contained' 
            style={{ backgroundColor: 'black', color: 'white', marginBottom:'5px'}}
            onClick={handleButtonClick}
             >Remove from cart</Button>
        </div>

    )
}

export default BooksCart;