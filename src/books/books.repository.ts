import { Book } from './books.entity';

export class BooksRepository {
  private books: Book[] = [
    new Book('JK-45', 'Harry Potter', 'J.K. Rowling', 1),
    new Book('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
    new Book('TW-11', 'Twilight', 'Stephenie Meyer', 1),
    new Book('HOB-83', 'The Hobbit', 'J.R.R. Tolkien', 1),
    new Book('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1),
  ];

  findAll(): Book[] {
    return this.books;
  }

  findByCode(code: string): Book {
    return this.books.find((book) => book.code === code);
  }
}
