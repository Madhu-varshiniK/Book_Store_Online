import React, { useEffect, useState } from 'react'
import "./BookAdmin.css"
import axios from 'axios'
import BookAdmin from "./BookAdmin"
const URL = "http://localhost:5000/books";


const fetchHandler = async() => {
    return await axios.get(URL).then((res)=> res.data)
}

const BooksAdmin = () => {
    const [books,setBooks] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    },[]);
  return (
    <ul>
        {books && books.map((book,i)=> (
            <li key={i}>
                <BookAdmin book={book}/>
            </li>
        ))}
    </ul>
  )
}

export default BooksAdmin;
