import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.model';

export class BookInput {
  title: string;
  author: string;
  publishYear: string;
}

export type BookDTO = Omit<Book, 'id'>;

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    {
      id: '0',
      title: 'asd',
      author: 'asd',
      publishYear: '2000',
    },
  ];

  getAllBooks() {
    return this.books;
  }

  getBookById(id: string) {
    return this.books.find((book) => book.id === id);
  }

  createBook(bookInput: BookInput) {
    const newBook: Book = {
      id: Math.random().toString(),
      ...bookInput,
    };
    this.books.push(newBook);
    return newBook;
  }

  deleteBook(id: string) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      return;
    }
    this.books.splice(index, 1);
  }

  updateBook(id: string, input: BookDTO) {
    const book = this.getBookById(id);
    if (!book) {
      throw new NotFoundException();
    }
    Object.assign(book, input);
    return book;
  }
}
