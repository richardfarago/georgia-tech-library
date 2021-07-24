import { Inject, Injectable } from '@nestjs/common';
import { Providers } from 'src/common/constants/providers.enum';
import { Connection } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
    constructor(@Inject(Providers.DATABASE_CONNECTION) private db: Connection) { }

    create(createMemberDto: CreateMemberDto) {
        return 'This action adds a new member';
    }

    async findAll() {
        return this.db.getRepository(Member).find({
            relations: ['user', 'member_card', 'loan_permission', 'school_member', 'campus_address'],
            take: 500,
        });
        // return this.db.getRepository(Member).query("SELECT M.*,U.*,MC.* FROM Member M INNER JOIN AuthUser U ON U.id = M.user_id INNER JOIN MemberCard MC ON MC.number = M.card_number")
        // return this.db.getRepository(Member).createQueryBuilder('M')
        //   .leftJoinAndMapMany('User', 'U', 'U.id = M.user_id')
        //   .leftJoinAndMapMany('MemberCard', 'MC', 'MC.number = M.card_number')
        //   .limit(50).getMany()
    }

    findOne(id: string) {
        return this.db.getRepository(Member).findOne({
            where: { userId: id },
            relations: ['user', 'member_card', 'loan_permission', 'school_member', 'campus_address'],
        });
    }

    update(id: number, updateMemberDto: UpdateMemberDto) {
        return `This action updates a #${id} member`;
    }

    remove(id: number) {
        return `This action removes a #${id} member`;
    }
}
