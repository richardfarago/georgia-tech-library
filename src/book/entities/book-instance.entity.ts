import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BookDescription } from './book-description.entity';

@Entity('BookInstance', { schema: 'dbo' })
export class BookInstance {
    @Column('varchar', { primary: true, name: 'id', length: 50 })
    id: string;

    @Column('varchar', { name: 'condition', length: 100 })
    condition: string;

    @ManyToOne(() => BookDescription, (book_description) => book_description.book_instances)
    @JoinColumn([{ name: 'isbn', referencedColumnName: 'isbn' }])
    isbn: BookDescription;
}
