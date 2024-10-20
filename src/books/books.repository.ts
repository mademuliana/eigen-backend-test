import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repository.find();
  }

  async findOneByCode(code: string): Promise<Book | undefined> {
    return this.repository.findOne({ where: { code } });
  }
  

  save(book: Book): Promise<Book> {
    return this.repository.save(book);
  }
}
