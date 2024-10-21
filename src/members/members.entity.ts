import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MemberBook } from '../member-book.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => MemberBook, (memberBook) => memberBook.member)
  borrowedBooks: MemberBook[];

  @Column({ type: 'date', nullable: true })
  penaltyUntil: Date | null;

  canBorrow(): boolean {
    const today = new Date();
    
    // Filter the books where returnedAt is null (i.e., books currently borrowed)
    const currentlyBorrowedBooks = this.borrowedBooks.filter(
      (memberBook) => memberBook.returnedAt === null
    );
  
    // Check if the member has borrowed fewer than 2 books and is not penalized
    return currentlyBorrowedBooks.length < 2 && (!this.penaltyUntil || today > this.penaltyUntil);
  }

  borrowBook(memberBook: MemberBook) {
    if (!this.canBorrow()) {
      throw new Error('Cannot borrow books at the moment');
    }
    this.borrowedBooks.push(memberBook);
  }

  returnBook(memberBook: MemberBook) {
    this.borrowedBooks = this.borrowedBooks.filter((mb) => mb.id !== memberBook.id);
  }

  imposePenalty(days: number) {
    const today = new Date();
    today.setDate(today.getDate() + days);
    this.penaltyUntil = today;
  }
}
