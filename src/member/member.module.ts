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
import { UserModule } from '../../src/user/user.module';
import { MemberSubscriber } from './member.subscriber';
import { User } from '../../src/user/entities/user.entity';
import { Library } from './entities/library.entity';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([User, Member, MemberCard, LoanPermission, SchoolMember, Library, Address, City])],
    controllers: [MemberController],
    providers: [MemberService, MemberSubscriber],
    exports: [MemberService],
})
export class MemberModule { }
