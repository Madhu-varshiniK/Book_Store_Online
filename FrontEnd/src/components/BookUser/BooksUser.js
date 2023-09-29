import React, { useEffect, useState } from 'react'
import "./BookUser.css"
import axios from 'axios'
import BookUser from "./BookUser"
const URL = "http://localhost:5000/books";


const fetchHandler = async() => {
    return await axios.get(URL).then((res)=> res.data)
}

const BooksUser = (props) => {
    const bookName = props.bookname;

    const [books,setBooks] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setBooks(data.books));
    },[]);

    //Filter books based on bookName
    const filteredBooks = bookName
    ? books.filter((book) =>
        book.name.toLowerCase().includes(bookName.toLowerCase())
      )
    : books;
  return (
    <ul>
        {filteredBooks && filteredBooks.map((book,i)=> (
            <li key={i}>
                <BookUser book={book}/>
            </li>
        ))}
    </ul>
  )
}

export default BooksUser;
