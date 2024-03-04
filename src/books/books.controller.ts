import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService, BookInput, BookDTO } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('')
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    const book = this.booksService.getBookById(id);
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  @Post('/newBook')
  createBook(@Body() book: BookInput) {
    this.booksService.createBook(book);
  }

  @Delete('/delete/:id')
  deleteBook(@Param('id') id: string) {
    this.booksService.deleteBook(id);
  }

  @Put('/update/:id')
  updateBook(@Param('id') id: string, @Body() body: BookDTO) {
    this.booksService.updateBook(id, body);
  }
}
