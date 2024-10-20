import { Injectable } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { BooksService } from '../books/books.service';

@Injectable()
export class MembersService {
  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly booksService: BooksService,
  ) {}

  findAll() {
    return this.membersRepository.findAll();
  }

  borrowBook(memberCode: string, bookCode: string, daysLate?: number) {
    const member = this.membersRepository.findByCode(memberCode);
    const book = this.booksService.borrow(bookCode);
    member.borrowBook(bookCode);
    if (daysLate && daysLate > 7) {
      member.imposePenalty(3); // 3-day penalty
    }
    return { message: `Member ${member.name} borrowed ${bookCode}` };
  }

  returnBook(memberCode: string, bookCode: string, daysLate?: number) {
    const member = this.membersRepository.findByCode(memberCode);
    this.booksService.return(bookCode);
    member.returnBook(bookCode);
    if (daysLate && daysLate > 7) {
      member.imposePenalty(3); // 3-day penalty
    }
    return { message: `Member ${member.name} returned ${bookCode}` };
  }
}
