export class Member {
  constructor(
    public code: string,
    public name: string,
    public borrowedBooks: string[] = [],
    public penaltyUntil: Date | null = null,
  ) {}

  canBorrow(): boolean {
    const today = new Date();
    return this.borrowedBooks.length < 2 && (!this.penaltyUntil || today > this.penaltyUntil);
  }

  borrowBook(bookCode: string) {
    if (!this.canBorrow()) {
      throw new Error('Cannot borrow books at the moment');
    }
    this.borrowedBooks.push(bookCode);
  }

  returnBook(bookCode: string) {
    this.borrowedBooks = this.borrowedBooks.filter((code) => code !== bookCode);
  }

  imposePenalty(days: number) {
    const today = new Date();
    today.setDate(today.getDate() + days);
    this.penaltyUntil = today;
  }
}
