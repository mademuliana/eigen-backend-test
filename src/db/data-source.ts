import { DataSource } from 'typeorm';
import { Book } from '../books/books.entity';
import { Member } from '../members/members.entity';
import { MemberBook } from '../member-book.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', 
  host: 'localhost',
  port: 3306, 
  username: 'root', 
  password: '', 
  database: 'library', 
  synchronize: false, 
  logging: true,
  entities: [Book, Member, MemberBook],
  migrations: ['src/db/migrations/*.ts'],
  
});
