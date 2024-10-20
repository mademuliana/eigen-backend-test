import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { Member } from './members/members.entity';
import { Book } from './books/books.entity';

@Entity('member_books')
export class MemberBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member, (member) => member.borrowedBooks)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ManyToOne(() => Book, (book) => book.membersBorrowing)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({ type: 'date' })
  borrowedAt: Date;

  @Column({ type: 'date', nullable: true })
  returnedAt: Date | null;
}
