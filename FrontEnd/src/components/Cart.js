import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./BookUser/BookUser.css"
import BooksCart from "./BookUser/BooksCart"
import Cookies from 'js-cookie';
 

const Cart = () => {

  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchUserId(); //fetch the user id to push the past order to profile
  }, []);

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books`);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const userData = response.data;

      const filteredUser = userData.find((profile) => profile.email === Cookies.get("email"));

      if (filteredUser) {
        setUser(filteredUser);
      } else {
        setUser(null);
      }
    }
    catch (error) {
      console.error("Error fetching user:", error);
    }

  };

  //Filter books based on cart selection
 const filteredBooks = books.filter((book) => book.cart === true);

 // Calculate subtotal
 const subtotal = filteredBooks.reduce((acc, book) => acc + book.price, 0);



 const clearCartOrders = async () => {

  try {
    // Create an array of promises to send PUT requests for each book in the cart
    const putRequests = filteredBooks.map(async (book) => {
      const { _id, name, author, description, price, image } = book; // Extract the book properties, excluding the 'id'
      
      await axios.put(`http://localhost:5000/books/${_id}`, {
          name: name,
          author: author,
          description: description,
          price: price,
          image: image,
          cart: false, //Cart should be set to false because existing book is updated here.
          available: false,
      });
    });

    // Wait for all PUT requests to complete
    await Promise.all(putRequests);

    console.log("Cart updated successfully!");
  } catch (error) {
    console.error("Error sending PUT requests to update cart:", error);
  }
};
  const sendOrders = async () => {
      // Create a single date to be used for all the ordered books
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString(); // Convert to ISO 8601 format
      const pastOrders = [];
    try {

      
      for (const book of filteredBooks) {
        const order = {
          Bookname: book.name,
          image: book.image,
          price: book.price,
          date: formattedDate,
        };

        pastOrders.push(order); // Push each book order to the pastOrders array
      }

      // Send the entire pastOrders array to the backend
      await axios.put(`http://localhost:5000/users/${user._id}`, {
        pastOrders: pastOrders,
      });
  
      console.log("Orders sent successfully!");
    } catch (error) {
      console.error("Error sending orders:", error);
    }
  };
 
 const sendRequest = async () => {
  try {
    const response = await axios.post("http://localhost:5000/checkout", {
      items: filteredBooks,
      subtotal: subtotal.toFixed(2),
    });

    //Extract the checkout URL from the response and store it in state
    const url = response.data.url;

    //Redirect to the Stripe Checkout page
    window.location = url;

    //Assuming payment is always successful
    sendOrders();

    //empty the cart 
    clearCartOrders();

  } catch (error) {
    console.error("Error sending request to checkout:", error);
  }
};

 const handleCheckout = () => {
  sendRequest();
};

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
    <ul>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <li key={i}>
              <BooksCart book={book} />
            </li>
          ))
        ) : (
          <p style={{fontSize:'40px', marginTop:'10px'}}>Shop to get books added here</p>
        )}
    </ul>
    <div>
        <p style={{ marginTop: "30px", fontSize: '1.2rem', color: 'black' }}
        >Subtotal: Rs {subtotal.toFixed(2)}</p>
        <button 
        onClick={handleCheckout}
        style={{
          backgroundColor: '#000000',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          fontSize: '1.2rem',
          marginTop: '10px',
          }}>Checkout</button>
    </div>
    </div>
  )
};

export default Cart;
