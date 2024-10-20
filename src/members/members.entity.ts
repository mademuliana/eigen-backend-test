import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MemberBook } from '../member-book.entity'; // Import the pivot table entity

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => MemberBook, (memberBook) => memberBook.member)
  borrowedBooks: MemberBook[]; // Link to the pivot table

  @Column({ type: 'date', nullable: true })
  penaltyUntil: Date | null;

  // Additional methods as before...
  canBorrow(): boolean {
    const today = new Date();
    return this.borrowedBooks.length < 2 && (!this.penaltyUntil || today > this.penaltyUntil);
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
