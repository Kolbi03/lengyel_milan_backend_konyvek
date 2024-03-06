import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { NotFoundException } from '@nestjs/common';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return a single todo after create', () => {
    const createdBook = service.createBook({
      title: 'testTitle',
      author: 'testAuthor',
      publishYear: '42',
    }); //arrange
    const book = service.getBookById(createdBook.id); //act
    expect(book).toEqual({
      id: expect.any(String),
      title: 'testTitle',
      author: 'testAuthor',
      publishYear: '42',
    }); //assert
  });

  it('should return undefined if id is unknown', () => {
    const book = service.getBookById('42'); //act
    expect(book).toBeUndefined(); //assert
  });

  describe('update', () => {
    it('should return the updated todo with getTodo after update', () => {
      const book = service.createBook({
        title: 'testTitle',
        author: 'testAuthor',
        publishYear: '42',
      }); //arrange
      service.updateBook(book.id, {
        title: 'AfterTestTitle',
        author: 'AfterTestAuthor',
        publishYear: '43',
      }); //act
      expect(service.getBookById(book.id)).toEqual({
        id: book.id,
        title: 'AfterTestTitle',
        author: 'AfterTestAuthor',
        publishYear: '43',
      }); //assert
    });

    it('should return a NotFoundException after update', () => {
      expect(() => {
        service.updateBook('42', {
          title: 'testTitle',
          author: 'testAuthor',
          publishYear: '42',
        });
      }).toThrow(NotFoundException);
    });
  });
});
