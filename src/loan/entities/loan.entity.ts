import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Member } from "../../../src/member/entities/member.entity";
import { LoanContent } from "./loan.content";

@Entity("Loan", { schema: "dbo" })
export class Loan {
    @Column("varchar", { primary: true, name: "id", length: 50 })
    id: string;

    @Column("datetime", { name: "start_date" })
    start_date: string;

    @Column("datetime", { name: "end_date" })
    end_date: string;

    @Column("datetime", { name: "due_date" })
    due_date: string;

    @ManyToOne(() => Member, { eager: true })
    @JoinColumn([{ name: "user_id", referencedColumnName: "user_id" }])
    member: Member;

    @OneToMany(() => LoanContent, (loanContent) => loanContent.loan, { eager: true, cascade: true })
    loan_contents: LoanContent[];
}