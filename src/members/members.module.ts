import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { BooksModule } from '../books/books.module';  // Import BooksModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    BooksModule
  ],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
  exports: [MembersService],
})
export class MembersModule {}
