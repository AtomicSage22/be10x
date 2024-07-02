// src/pages/api/books/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Book from '../../../models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const books = await Book.find({});
      res.status(200).json({ success: true, data: books });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'POST') {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({ success: true, data: book });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
