import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { AppDataSource } from './db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options), // Configure TypeORM
    BooksModule,
    MembersModule,
  ],
})
export class AppModule {}
