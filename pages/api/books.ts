import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { getBooks } from '../../db/books';
import middleware from '../../middleware/all';
import onError from '../../middleware/error';
import { Request } from '../../types';

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.get((req, res) => {
  const books = getBooks(req.db);
  res.send({ data: books });
});

export default handler;
