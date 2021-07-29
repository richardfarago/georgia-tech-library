import { IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { BookDescription } from "./book-description.entity";

@Entity("Author", { schema: "dbo" })
export class Author {
    @IsUUID()
    @Column("varchar", { primary: true, name: "id", length: 50 })
    id: string;

    @IsOptional()
    @IsString()
    @Column("varchar", { name: "first_name", length: 50 })
    first_name: string;

    @IsOptional()
    @IsString()
    @Column("varchar", { name: "last_name", length: 50 })
    last_name: string;

    @IsOptional()
    @ManyToMany(() => BookDescription, (bookDescription) => bookDescription.authors)
    @JoinTable({
        name: "AuthorGroup",
        joinColumns: [{ name: "author_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "isbn", referencedColumnName: "isbn" }],
        schema: "dbo",
    })
    books: BookDescription[];
}
