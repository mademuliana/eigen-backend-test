export class Book {
  constructor(
    public code: string,
    public title: string,
    public author: string,
    public stock: number,
    public isBorrowed: boolean = false,
  ) {}

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
