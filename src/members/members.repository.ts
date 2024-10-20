import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from './members.entity';
import { MemberBook } from '../member-book.entity';

@Injectable()
export class MembersRepository {
  private readonly memberRepository: Repository<Member>;
  private readonly memberBookRepository: Repository<MemberBook>;

  constructor(private readonly dataSource: DataSource) {
    this.memberRepository = this.dataSource.getRepository(Member);
    this.memberBookRepository = this.dataSource.getRepository(MemberBook);
  }

  // Find all members
  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find({
      relations: ['borrowedBooks'], // Ensure that borrowedBooks is included in the result
    });
  }

  // Find a member by their code
  async findOneByCode(memberCode: string): Promise<Member | null> {
    return await this.memberRepository.findOne({
      where: { code: memberCode },
      relations: ['borrowedBooks'],
    });
  }

  // Save a member entity
  async save(member: Member): Promise<Member> {
    return await this.memberRepository.save(member);
  }

  // Save a borrowed book record for a member
  async saveMemberBook(memberBook: MemberBook): Promise<MemberBook> {
    return await this.memberBookRepository.save(memberBook);
  }

  // Find all borrowed books of a member
  async findBorrowedBooksByMemberCode(memberCode: string): Promise<MemberBook[]> {
    return await this.memberBookRepository.find({
      where: { member: { code: memberCode }, returnedAt: null },
      relations: ['book', 'member'],
    });
  }
}
