import { IsISBN, IsString } from 'class-validator';
import { BookDescription } from '../entities/book-description.entity';

export class CreateBookInstanceDto {
    @IsString()
    condition: string;

    @IsISBN(10)
    isbn: Partial<BookDescription>;
}
