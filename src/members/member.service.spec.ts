import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';
import { MembersRepository } from './members.repository';
import { BooksService } from '../books/books.service';
import { Member } from './members.entity';
import { MemberBook } from '../member-book.entity';
import { Book } from '../books/books.entity';
import { BadRequestException } from '@nestjs/common';

const mockBooksService = {
  findBook: jest.fn(),
  borrowBook: jest.fn(),
  returnBook: jest.fn(),
};

const mockMembersRepository = {
  findAll: jest.fn(),
  findOneByCode: jest.fn(),
  save: jest.fn(),
  saveMemberBook: jest.fn(),
};

describe('MembersService', () => {
  let membersService: MembersService;
  let membersRepository: MembersRepository; 
  let booksService: BooksService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersService,
        { provide: MembersRepository, useValue: mockMembersRepository },
        { provide: BooksService, useValue: mockBooksService },
      ],
    }).compile();

    membersService = module.get<MembersService>(MembersService);
    membersRepository = module.get<MembersRepository>(MembersRepository);
    booksService = module.get<BooksService>(BooksService); 
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('borrowBook', () => {
    it('should allow a member to borrow a book', async () => {
      const member = new Member();
      member.code = 'M001';
      member.name = 'John Doe';
      member.penaltyUntil = null;
      member.borrowedBooks = []; 

      const book = new Book();
      book.code = 'B001';
      book.title = 'Test Book';

      mockMembersRepository.findOneByCode.mockResolvedValue(member);
      mockBooksService.findBook.mockResolvedValue(book);
      mockBooksService.borrowBook.mockResolvedValue(undefined);
      mockMembersRepository.saveMemberBook.mockImplementation(async (memberBook) => {
        member.borrowedBooks.push(memberBook); 
      });

      await membersService.borrowBook(member.code, book.code);

      expect(member.borrowedBooks.length).toBe(1); 
      expect(mockMembersRepository.saveMemberBook).toHaveBeenCalled();
    });
  });

  describe('returnBook', () => {
    it('should allow a member to return a book on time', async () => {
      const member = new Member();
      member.code = 'M001';
      member.name = 'John Doe';
      member.penaltyUntil = null; 
  
      const book = new Book();
      book.code = 'B001';
      book.title = 'Test Book';
  
      const memberBook = new MemberBook();
      memberBook.book = book;
      memberBook.borrowedAt = new Date(); 
      memberBook.returnedAt = null; 
      member.borrowedBooks = [memberBook]; 
  
      mockMembersRepository.findOneByCode.mockResolvedValue(member);
      mockBooksService.returnBook.mockResolvedValue(undefined);
      mockMembersRepository.saveMemberBook.mockImplementation(async (updatedMemberBook) => {
        updatedMemberBook.returnedAt = new Date();
      });
  
  
      await membersService.returnBook(member.code, book.code);
  
      expect(mockMembersRepository.saveMemberBook).toHaveBeenCalled(); 
    });
  
    it('should impose a penalty when returning a book late', async () => {
      const member = new Member();
      member.code = 'M001';
      member.name = 'John Doe';
      member.penaltyUntil = null; 
  
      const book = new Book();
      book.code = 'B001';
      book.title = 'Test Book';
  
      const memberBook = new MemberBook();
      memberBook.book = book;
      memberBook.borrowedAt = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      memberBook.returnedAt = null; 
      member.borrowedBooks = [memberBook];
  
      mockMembersRepository.findOneByCode.mockResolvedValue(member);
      mockBooksService.returnBook.mockResolvedValue(undefined);
      mockMembersRepository.saveMemberBook.mockImplementation(async (updatedMemberBook) => {
        updatedMemberBook.returnedAt = new Date();
      });
  
      await expect(membersService.returnBook(member.code, book.code)).rejects.toThrow(
        BadRequestException,
      );
  
      expect(member.penaltyUntil).toBeInstanceOf(Date); 
      expect(mockMembersRepository.saveMemberBook).toHaveBeenCalled(); 
    });
  });
  


});
