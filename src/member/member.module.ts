import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberCard } from './entities/member-card.entity';
import { LoanPermission } from './entities/loan-permission.entity';
import { SchoolMember } from './entities/school-member.entity';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Member, MemberCard, LoanPermission, SchoolMember, Address, City])],
    controllers: [MemberController],
    providers: [MemberService],
    exports: [MemberService],
})
export class MemberModule {}
