import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('members') // Tag for the Members API
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // Get all members and their borrowed books
  @Get()
  @ApiOperation({ summary: 'Get all members with their borrowed books' })
  @ApiResponse({ status: 200, description: 'List of members', type: [String] }) // Adjust type if you have a specific response type
  async getAllMembers() {
    return await this.membersService.getAllMembers();
  }

  // Get a member by their code
  @Get(':memberCode')
  @ApiOperation({ summary: 'Get a member by code' })
  @ApiParam({ name: 'memberCode', description: 'Code of the member to retrieve' })
  @ApiResponse({ status: 200, description: 'Member details', type: String }) // Adjust type if you have a specific response type
  async getMemberByCode(@Param('memberCode') memberCode: string) {
    return await this.membersService.getMemberByCode(memberCode);
  }

  // Impose a penalty on a member
  @Post('penalty/:memberCode')
  @ApiOperation({ summary: 'Impose a penalty on a member' })
  @ApiParam({ name: 'memberCode', description: 'Code of the member to impose a penalty on' })
  @ApiBody({ type: Number, description: 'Number of days to impose the penalty' })
  @ApiResponse({ status: 200, description: 'Penalty imposed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request if unable to impose penalty' })
  async imposePenalty(
    @Param('memberCode') memberCode: string,
    @Body('days') days: number,
  ) {
    try {
      return await this.membersService.imposePenalty(memberCode, days);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Borrow a book by book code and member code
  @Post('borrow/:bookCode/:memberCode')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiParam({ name: 'bookCode', description: 'Code of the book to borrow' })
  @ApiParam({ name: 'memberCode', description: 'Code of the member who borrow' })
  @ApiResponse({ status: 200, description: 'Book borrowed successfully' })
  @ApiResponse({ status: 201, description: 'Book borrowed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request if unable to borrow the book' })
  async borrowBook(
    @Param('bookCode') bookCode: string,
    @Body('memberCode') memberCode: string,
  ) {
    try {
      return await this.membersService.borrowBook(memberCode,bookCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Return a book by book code and member code
  @Post('return/:bookCode/:memberCode')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiParam({ name: 'bookCode', description: 'Code of the book to return' })
  @ApiParam({ name: 'memberCode', description: 'Code of the member who borrow' })
  @ApiResponse({ status: 200, description: 'Book returned successfully' })
  @ApiResponse({ status: 201, description: 'Book returned successfully' })
  @ApiResponse({ status: 400, description: 'Bad request if unable to return the book' })
  async returnBook(
    @Param('bookCode') bookCode: string,
    @Body('memberCode') memberCode: string,
  ) {
    try {
      return await this.membersService.returnBook(memberCode,bookCode);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
