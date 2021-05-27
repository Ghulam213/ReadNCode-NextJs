import { NextApiResponse } from 'next';
import nc from 'next-connect';
import middleware from '../../../middleware/all';
import onError from '../../../middleware/error';
import { createReview, getReviewsByBookId } from '../../../db/review';
import { Review, Request } from '../../../types';

const handler = nc<Request, NextApiResponse>({
  onError,
});

handler.use(middleware);

handler.post((req, res) => {
  const newReview: Review = req.body;
  createReview(req.db, newReview);
  res.send({ data: newReview });
});

export default handler;
