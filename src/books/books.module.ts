// books.module.ts
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],  // Include the Book entity
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],   // Ensure BooksService is provided
  exports: [BooksService]   // Export BooksService so it can be used in other modules
})

export class BooksModule {}
