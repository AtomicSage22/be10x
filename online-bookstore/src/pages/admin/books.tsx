import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminBooks = ({ books }: any) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleAddBook = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', { title, author, description, price, coverImage });
      router.reload();
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Manage Books</h1>
      <form onSubmit={handleAddBook} className="mt-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Add Book
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Books</h2>
        {books.map((book: any) => (
          <div key={book._id} className="border p-2 mt-2">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>${book.price}</p>
            <p>{book.description}</p>
            <button onClick={async () => {
              await axios.delete(`/api/books/${book._id}`);
              router.reload();
            }} className="bg-red-500 text-white p-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`);
  return { props: { books: res.data.data } };
}

export default AdminBooks;
