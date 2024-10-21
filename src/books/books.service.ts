import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.booksRepository.findAll();
  }

  async findBook(bookCode: string): Promise<Book> {
    const book = await this.booksRepository.findOneByCode(bookCode);
    if (!book) {
      throw new Error(`Book with code ${bookCode} not found`);
    }
    return book;
  }

  async borrowBook(bookCode: string): Promise<void> {
    const book = await this.findBook(bookCode);
    book.borrow();
    await this.booksRepository.save(book);
  }

  async returnBook(bookCode: string): Promise<void> {
    const book = await this.findBook(bookCode);
    book.returnBook();
    await this.booksRepository.save(book);
  }
}
