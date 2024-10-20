import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books/books.entity';
import { Member } from './members/members.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Member) private membersRepository: Repository<Member>,
  ) {}

  async seed() {
    const books = [
      { code: 'JK-45', title: 'Harry Potter', author: 'J.K. Rowling', stock: 1 },
      { code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1 },
      { code: 'TW-11', title: 'Twilight', author: 'Stephenie Meyer', stock: 1 },
      { code: 'HOB-83', title: 'The Hobbit', author: 'J.R.R. Tolkien', stock: 1 },
      { code: 'NRN-7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', stock: 1 },
    ];

    for (const book of books) {
      await this.booksRepository.save(book);
    }

    const members = [
      { code: 'M001', name: 'Angga', borrowedBooks: [] },
      { code: 'M002', name: 'Ferry', borrowedBooks: [] },
      { code: 'M003', name: 'Putri', borrowedBooks: [] },
    ];

    for (const member of members) {
      await this.membersRepository.save(member);
    }
  }
}
