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
  @ApiResponse({ status: 200, description: 'List of available books', type: [String] }) // Adjust type if you have a specific response type
  async getAvailableBooks() {
    return await this.booksService.getAllBooks();
  }

  // // Borrow a book by book code and member code
  // @Post('borrow/:bookCode/:memberCode')
  // @ApiOperation({ summary: 'Borrow a book' })
  // @ApiParam({ name: 'bookCode', description: 'Code of the book to borrow' })
  // @ApiParam({ name: 'memberCode', description: 'Code of the member who borrow' })
  // @ApiResponse({ status: 200, description: 'Book borrowed successfully' })
  // @ApiResponse({ status: 400, description: 'Bad request if unable to borrow the book' })
  // async borrowBook(
  //   @Param('bookCode') bookCode: string,
  //   @Body('memberCode') memberCode: string,
  // ) {
  //   try {
  //     return await this.booksService.borrowBook(bookCode, memberCode);
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // // Return a book by book code and member code
  // @Post('return/:bookCode/:memberCode')
  // @ApiOperation({ summary: 'Return a borrowed book' })
  // @ApiParam({ name: 'bookCode', description: 'Code of the book to return' })
  // @ApiParam({ name: 'memberCode', description: 'Code of the member who borrow' })
  // @ApiResponse({ status: 200, description: 'Book returned successfully' })
  // @ApiResponse({ status: 400, description: 'Bad request if unable to return the book' })
  // async returnBook(
  //   @Param('bookCode') bookCode: string,
  //   @Body('memberCode') memberCode: string,
  // ) {
  //   try {
  //     return await this.booksService.returnBook(bookCode, memberCode);
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }
}
