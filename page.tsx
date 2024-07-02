// src/app/books/[id]/page.tsx
"use client"; // Add this at the top


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        setBook(data.data);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>by {book.author}</p>
      <p>{book.description}</p>
      <p className="text-lg font-semibold">${book.price}</p>
      <img src={book.coverImage} alt={book.title} className="w-64 h-auto" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {book.reviews.map((review) => (
          <div key={review._id} className="border p-2 mt-2">
            <p><strong>{review.user}</strong></p>
            <p>{review.review}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
