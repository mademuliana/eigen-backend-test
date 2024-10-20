import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
})
export class MembersModule {}
