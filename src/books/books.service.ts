import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  findAll() {
    return this.booksRepository.findAll();
  }

  borrow(code: string) {
    const book = this.booksRepository.findByCode(code);
    if (book) {
      book.borrow();
      return { message: `You have borrowed ${book.title}` };
    }
    throw new Error('Book not found');
  }

  return(code: string) {
    const book = this.booksRepository.findByCode(code);
    if (book) {
      book.returnBook();
      return { message: `You have returned ${book.title}` };
    }
    throw new Error('Book not found');
  }
}
