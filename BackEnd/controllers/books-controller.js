const Book = require("../model/Book");


const getAllBooks = async (req,res, next) => {
    let books;
    try{
        books = await Book.find();
    } 
    catch (err) {
        console.log(err);
    }

    if(!books){
        return res.status(404).json({message : "No products available"})
    }

    return res.status(200).json({books});
};

const getId = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findById(id);
    } catch(err) {
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "Book not found"});
    }

    return res.status(200).json({book});

};

const addBook = async (req, res, next) => {
    const cart = false;
    const {name,author,description,price,available,image} = req.body;
    let book;
    try {
        book = new Book({
            name,
            author,
            description,
            price,
            available,
            cart,
            image,
        });
        await book.save();
    } catch (err) {
        console.log(err);
    }

    if(!book){
        return res.status(500).json({message: "Unable to add book"});
    }

    return res.status(201).json({book});
};

const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const {name,author,description,price,available,cart,image} = req.body;
 
    let book;
    try {
        book = await Book.findByIdAndUpdate(id, {
            name,
            author,
            description,
            price,
            available,
            cart,
            image,
        });
        book = await book.save();
    } catch (err) {
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "Unable to update book"});
    }

    return res.status(200).json({book});
};

const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove(id);
    } catch (err) {
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "Unable to delete book"});
    }

    return res.status(200).json({message: "Book is deleted successfully"});
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getId = getId;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;