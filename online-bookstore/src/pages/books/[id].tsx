import { GetServerSideProps } from 'next';
import axios from 'axios';

const BookDetails = ({ book }: any) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>by {book.author}</p>
      <p>{book.description}</p>
      <p className="text-lg font-semibold">${book.price}</p>
      <img src={book.coverImage} alt={book.title} className="w-64 h-auto" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {book.reviews.map((review: any) => (
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params?.id}`);
  return { props: { book: res.data.data } };
};

export default BookDetails;
