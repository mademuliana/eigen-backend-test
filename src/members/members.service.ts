import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { BooksService } from '../books/books.service';
import { Member } from './members.entity';
import { MemberBook } from '../member-book.entity';

@Injectable()
export class MembersService {
  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly booksService: BooksService,
  ) {}

  async getAllMembers(): Promise<Member[]> {
    return await this.membersRepository.findAll();
  }

  async getMemberByCode(memberCode: string): Promise<Member> {
    const member = await this.membersRepository.findOneByCode(memberCode);
    if (!member) {
      throw new NotFoundException(`Member with code ${memberCode} not found`);
    }
    return member;
  }

  async borrowBook(memberCode: string, bookCode: string): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    if (!member.canBorrow()) {
      throw new BadRequestException('Cannot borrow books at the moment due to borrowing limit or penalty');
    }

    const book = await this.booksService.findBook(bookCode);
    await this.booksService.borrowBook(bookCode);

    const memberBook = new MemberBook();
    memberBook.member = member;
    memberBook.book = book;
    memberBook.borrowedAt = new Date();
    await this.membersRepository.saveMemberBook(memberBook);
  }

  async returnBook(memberCode: string, bookCode: string): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    const borrowedBookIndex = member.borrowedBooks.findIndex(
      (memberBook) => !memberBook.returnedAt,
    );

    if (borrowedBookIndex === -1) {
      throw new BadRequestException(`Book ${bookCode} not borrowed by the member`);
    }

    const borrowedBook = member.borrowedBooks[borrowedBookIndex];

    // Calculate late return penalty
    const currentDate = new Date();
    const borrowedAt = new Date(borrowedBook.borrowedAt);
    const daysLate = Math.floor((currentDate.getTime() - borrowedAt.getTime()) / (1000 * 3600 * 24)) - 7;

    // Mark the book as returned
    borrowedBook.returnedAt = currentDate;

    // Save the updated borrowed book state
    await this.membersRepository.saveMemberBook(borrowedBook);

    // Return the book in the BooksService
    await this.booksService.returnBook(bookCode);

    // Check for penalties
    if (daysLate > 0) {
      member.imposePenalty(3);
      await this.membersRepository.save(member);
      throw new BadRequestException(`Book returned late by ${daysLate} days. Member penalized for 3 days.`);
    }

    // Save the updated member state after removing the borrowed book
    await this.membersRepository.save(member);
}


  async imposePenalty(memberCode: string, days: number): Promise<void> {
    const member = await this.getMemberByCode(memberCode);
    member.imposePenalty(days);
    await this.membersRepository.save(member);
  }
}
