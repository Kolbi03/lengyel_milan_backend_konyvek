import { Injectable } from '@nestjs/common';
import { Book } from './books.model';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    {
      title: 'asd',
      author: 'asd',
      publishYear: 2000,
    },
  ];

  getAllBooks() {
    return this.books;
  }
}
