import { Db } from 'mongodb';
import { Book } from '../types';

export const getBooks = async (db: Db): Promise<Book[]> => {
  return db.collection('books').find({}).toArray();
};

export const getBookById = async (db: Db, id: string): Promise<Book> => {
  return db.collection('books').findOne({ _id: id });
};
