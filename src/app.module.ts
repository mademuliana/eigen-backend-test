import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module'; // Import BooksModule
import { MembersModule } from './members/members.module'; // Import MembersModule
import { Book } from './books/books.entity'; // Import Book Entity
import { Member } from './members/members.entity'; // Import Member Entity

@Module({
  imports: [
    // TypeORM MySQL configuration
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'yourUsername', // Your MySQL username
      password: 'yourPassword', // Your MySQL password
      database: 'yourDatabase', // Your MySQL database name
      entities: [Book, Member], // Register your entities
      synchronize: true, // Synchronize entities with the database (Disable in production)
    }),
    TypeOrmModule.forFeature([Book, Member]), // Register Book and Member in TypeORM
    BooksModule, // Add BooksModule
    MembersModule, // Add MembersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
