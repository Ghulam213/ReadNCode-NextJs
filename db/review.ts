import { Db } from 'mongodb';
import { Review } from '../types';

export const getReviewsByBookId = async (
  db: Db,
  id: string
): Promise<Review[]> => {
  return db.collection('reviews').find({ forBookId: id }).toArray();
};

export const createReview = async (db: Db, review: Review) => {
  return db
    .collection('reviews')
    .insertOne(review)
    .then(({ ops }) => ops[0]);
};
