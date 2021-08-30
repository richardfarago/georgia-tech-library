import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { MemberCard } from './entities/member-card.entity';
import RandExp = require('randexp');

@Injectable()
export class MemberService {
    constructor(@InjectConnection() private connection: Connection, @InjectRepository(Member) private member_repository: Repository<Member>) {}

    async create(create_member_dto: CreateMemberDto): Promise<Member> {
        const member: Member = this.member_repository.create(create_member_dto);

        const id = uuidv4();
        member.user.id = id; // --> No need to set member.user_id

        const campus_id = uuidv4();
        member.campus_address.id = campus_id;
        member.member_card = this.create_member_card(id);

        if (member.school_member) {
            const home_id = uuidv4();
            member.school_member.home_address.id = home_id;
        }

        return this.member_repository.save(member);
    }

    async findAll(): Promise<Member[]> {
        return this.member_repository.find({
            take: 500,
        });
    }

    findOne(id: string): Promise<Member> {
        return this.member_repository.findOne({
            where: { user_id: id },
        });
    }

    update(id: string, update_member_dto: UpdateMemberDto): Promise<UpdateResult> {
        return this.member_repository.update(id, update_member_dto);
    }

    async remove(id: string): Promise<any> {
        return this.connection.transaction(async (manager) => {
            try {
                const member: Member = await this.findOne(id);

                await manager.query(`DELETE FROM AuthUser WHERE id = '${member.user_id}'`); //--> Member relation cascades
                await manager.query(`DELETE FROM SchoolMember WHERE ssn = '${member.school_member?.ssn}'`);
                await manager.query(`DELETE FROM Library WHERE name = '${member.library?.name}'`);
                await manager.query(`DELETE FROM Address WHERE id IN ('${member.campus_address.id}','${member.school_member?.home_address.id}')`);
                await manager.query(`DELETE FROM MemberCard WHERE number = '${member.member_card.number}'`);
                return 'Member deleted';
            } catch (err) {
                throw new InternalServerErrorException(err);
            }
        });
    }

    create_member_card(id: string): MemberCard {
        return {
            number: new RandExp(/\d{9}/).gen(),
            issuedAt: moment().toISOString(),
            photo_url: `http://dummyimage.com/131x108.png/${id}`,
        };
    }
}
