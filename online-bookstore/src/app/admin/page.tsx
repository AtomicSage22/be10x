"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '', price: '' });

//   useEffect(() => {
//     if (status === 'loading') return; // Do nothing while loading
//     if (!session || session.user.role !== 'admin') {
//         console.log('you dumb:', session)
//       router.push('/'); // Redirect to home if not admin
//     } else {
//       fetchBooks();
//     }
//   }, [session, status, router]);
useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const addBook = async () => {
    try {
      await axios.post('/api/books', newBook);
      fetchBooks();
      setNewBook({ title: '', author: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

//   if (!session || session.user.role !== 'admin') {
//     return <div>Access Denied</div>;
//   }

  return (
    <div className=" p-4 bg-black text-white h-[100vh] flex justify-center flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Add book</h1>
      
      <div className="mb-4 text-black flex flex-col ">
        <h2 className="text-xl font-bold mb-2 text-white text-center">Add New Book</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newBook.title}
          onChange={handleInputChange}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleInputChange}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newBook.description}
          onChange={handleInputChange}
          className="block mb-2 p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newBook.price}
          onChange={handleInputChange}
          className="block mb-2 p-2 border rounded"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book._id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <span>{book.title} by {book.author}</span>
              <button
                onClick={() => deleteBook(book._id)}
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
