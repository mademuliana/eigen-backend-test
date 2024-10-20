import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { BooksService } from '../books/books.service';
import { Member } from './members.entity';
import { MemberBook } from '../member-book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly booksService: BooksService,
  ) {}

  // Fetch all members
  async getAllMembers(): Promise<Member[]> {
    return await this.membersRepository.findAll();
  }

  // Fetch a single member by code
  async getMemberByCode(memberCode: string): Promise<Member> {
    const member = await this.membersRepository.findOneByCode(memberCode);
    if (!member) {
      throw new Error(`Member with code ${memberCode} not found`);
    }
    return member;
  }

  // Borrow a book
  async borrowBook(memberCode: string, bookCode: string): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    
    // Check if the member can borrow
    if (!member.canBorrow()) {
      throw new Error('Cannot borrow books at the moment due to borrowing limit or penalty');
    }

    // Fetch the book and check availability
    const book = await this.booksService.findBook(bookCode);
    await this.booksService.borrowBook(bookCode);
    

    // Add book to the member's borrowedBooks and save
    const memberBook = new MemberBook();
    memberBook.member = member;
    memberBook.book = book;
    memberBook.borrowedAt = new Date();
    await this.membersRepository.saveMemberBook(memberBook);

    // Save member state
    // await this.membersRepository.save(member);
  }

  // Return a book
  async returnBook(memberCode: string, bookCode: string): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    const borrowedBook = member.borrowedBooks.find(
      (memberBook) => !memberBook.returnedAt,
    );
    if (!borrowedBook) {
      throw new Error(`Book ${bookCode} not borrowed by the member`);
    }

    borrowedBook.returnedAt = new Date();
    await this.membersRepository.saveMemberBook(borrowedBook);

    // Return the book to increase stock
    await this.booksService.findBook(bookCode);
    await this.booksService.returnBook(bookCode);

    // Save member and book states
    // await this.membersRepository.save(member);
  }

  // Apply penalty to a member
  async imposePenalty(memberCode: string, days: number): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    member.imposePenalty(days);
    await this.membersRepository.save(member);
  }
}
