import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BookInstance } from "src/book/entities/book-instance.entity";
import { Loan } from "./loan.entity";

@Entity("LoanContent", { schema: "dbo" })
export class LoanContent {
    @Column("varchar", { primary: true, name: "book_id", length: 50 })
    book_id: string;

    @Column("varchar", { primary: true, name: "loan_id", length: 50 })
    loan_id: string;

    @Column("datetime", { name: "returned_at", nullable: true })
    returned_at: Date | null;

    @ManyToOne(() => BookInstance, { eager: true })
    @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
    book: BookInstance;

    @ManyToOne(() => Loan, (loan) => loan.loan_contents)
    @JoinColumn([{ name: "loan_id", referencedColumnName: "id" }])
    loan: Loan;
}