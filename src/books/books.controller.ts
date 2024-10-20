import { Controller, Get, Post, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getAllBooks() {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Borrow a book by code' })
  @Post('borrow/:code')
  borrowBook(@Param('code') code: string) {
    return this.booksService.borrow(code);
  }

  @ApiOperation({ summary: 'Return a book by code' })
  @Post('return/:code')
  returnBook(@Param('code') code: string) {
    return this.booksService.return(code);
  }
}
