import { MongoClient, Db } from 'mongodb';
import { NextApiRequest } from 'next';

export interface Book {
  _id: string;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: string;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string;
  categories: string;
}

export interface Review {
  _id: string;
  forBookId: string;
  reviwerId: string;
  reviwer: string;
  date: string;
  review: string;
}

export interface UserSession {
  id?: string;
  image?: string;
  email?: string;
  name?: string;
}

export interface Request extends NextApiRequest {
  db: Db;
  dbClient: MongoClient;
  user: { email: string; id: string };
}
