import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
// import { BookSubject } from "./BookSubject";
// import { BookLanguage } from "./BookLanguage";
// import { BookCover } from "./BookCover";
import { Author } from './author.entity';
import { BookInstance } from './book-instance.entity';

@Entity('BookDescription', { schema: 'dbo' })
export class BookDescription {
    @Column('varchar', { primary: true, name: 'isbn', length: 13 })
    isbn: string;

    @Column('varchar', { name: 'title', length: 100 })
    title: string;

    @Column('text', { name: 'description', nullable: true })
    description: string | null;

    @Column('bit', { name: 'is_watchlist' })
    is_watchlist: boolean;

    @Column('bit', { name: 'is_loanable' })
    is_loanable: boolean;

    //   @ManyToOne(() => BookSubject, (bookSubject) => bookSubject.bookDescriptions)
    //   @JoinColumn([{ name: "subject_area", referencedColumnName: "subject" }])
    //   subjectArea: BookSubject;

    //   @ManyToOne(
    //     () => BookLanguage,
    //     (bookLanguage) => bookLanguage.bookDescriptions
    //   )
    //   @JoinColumn([{ name: "language", referencedColumnName: "language" }])
    //   language: BookLanguage;

    //   @ManyToOne(() => BookCover, (bookCover) => bookCover.bookDescriptions)
    //   @JoinColumn([{ name: "cover", referencedColumnName: "cover" }])
    //   cover: BookCover;

    @Column()
    language: string;

    @Column()
    cover: string;

    @Column()
    subject_area: string;

    @ManyToMany(() => Author, (author) => author.books, { cascade: true, eager: true })
    authors: Author[];

    @OneToMany(() => BookInstance, (bookInstance) => bookInstance.isbn, { cascade: true, eager: true })
    book_instances: BookInstance[];
}
