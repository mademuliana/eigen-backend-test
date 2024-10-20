import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('members') // This will group the members-related API endpoints under 'Members' in Swagger
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({ summary: 'Get all members' })
  @Get()
  getAllMembers() {
    return this.membersService.findAll();
  }

  @ApiOperation({ summary: 'Borrow a book for a member' })
  @Post('borrow/:memberCode/:bookCode')
  borrowBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
    @Body() body: { daysLate?: number }
  ) {
    return this.membersService.borrowBook(memberCode, bookCode, body.daysLate);
  }

  @ApiOperation({ summary: 'Return a book for a member' })
  @Post('return/:memberCode/:bookCode')
  returnBook(
    @Param('memberCode') memberCode: string,
    @Param('bookCode') bookCode: string,
    @Body() body: { daysLate?: number }
  ) {
    return this.membersService.returnBook(memberCode, bookCode, body.daysLate);
  }
}
