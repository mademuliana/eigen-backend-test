import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MemberBook } from '../member-book.entity'; // Import the pivot table entity

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @OneToMany(() => MemberBook, (memberBook) => memberBook.book)
  membersBorrowing: MemberBook[]; // Link to the pivot table

  @Column({ default: false })
  isBorrowed: boolean;

  borrow() {
    if (this.isBorrowed || this.stock <= 0) {
      throw new Error('Book is not available for borrowing');
    }
    this.isBorrowed = true;
    this.stock--;
  }

  returnBook() {
    this.isBorrowed = false;
    this.stock++;
  }
}
