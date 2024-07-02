import Link from 'next/link';

const BookCard = ({ book }: any) => {
  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p>by {book.author}</p>
      <p>${book.price}</p>
      <Link href={`/books/${book._id}`}>
        <a className="text-blue-500">View Details</a>
      </Link>
    </div>
  );
};

export default BookCard;
