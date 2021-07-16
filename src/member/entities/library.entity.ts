import { Entity, Column } from "typeorm";

@Entity({ name: 'Library', schema: 'dbo' })
export class Library {
    @Column("varchar", { primary: true, name: 'name', length: '50' })
    name: string
}