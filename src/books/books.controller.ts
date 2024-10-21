import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('books') // Tag for the Books API
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Get all available books (not borrowed)
  @Get()
  @ApiOperation({ summary: 'Get all available books' })
  @ApiResponse({ status: 200, description: 'List of available books', type: [String] })
  async getAvailableBooks() {
    return await this.booksService.getAllBooks();
  }

}
