// src/app/page.tsx\
"use client"; // Add this at the top


import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch('/api/books');
      const data = await res.json();
      setBooks(data.data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold">Online Bookstore</h1>
        <button className='text-white bg-sky-700 p-5 rounded-lg ' onClick={()=>router.push('/admin')}>Add Book</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4">
            {/* <Link href={`/books/${book._id}`}> */}
                <h2 className="text-2xl font-bold">{book.title}</h2>
                <p>{book.author}</p>

                {/* <img src={book.coverImage} alt={book.title} className="w-32 h-auto" /> */}
              {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
