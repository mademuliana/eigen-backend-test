import { Member } from './members.entity';

export class MembersRepository {
  private members: Member[] = [
    new Member('M001', 'Angga'),
    new Member('M002', 'Ferry'),
    new Member('M003', 'Putri'),
  ];

  findAll(): Member[] {
    return this.members;
  }

  findByCode(code: string): Member {
    return this.members.find((member) => member.code === code);
  }
}
