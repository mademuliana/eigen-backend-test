import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  // Get all books
  async getAllBooks(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }

  // Get a single book by code
  async findBook(bookCode: string): Promise<Book> {
    const book = await this.booksRepository.findOneByCode(bookCode);
    if (!book) {
      throw new Error(`Book with code ${bookCode} not found`);
    }
    return book;
  }

  // Borrow a book
  async borrowBook(bookCode: string): Promise<void> {
    const book = await this.findBook(bookCode);
    book.borrow();
    await this.booksRepository.save(book);
    // You may want to implement member borrowing logic here
  }

  // Return a book
  async returnBook(bookCode: string): Promise<void> {
    const book = await this.findBook(bookCode);
    book.returnBook();
    await this.booksRepository.save(book);
    // You may want to implement member returning logic here
  }
}
