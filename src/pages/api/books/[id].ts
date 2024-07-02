// src/pages/api/books/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Book from '../../../models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.status(200).json({ success: true, data: book });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedBook = await Book.deleteOne({ _id: id });
      if (!deletedBook) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
