import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDescription } from './entities/book-description.entity';

@Injectable()
export class BookDescriptionService {
    constructor(@InjectRepository(BookDescription) private book_repository: Repository<BookDescription>) {}

    async create(create_book_dto: CreateBookDto) {
        const exists = await this.book_repository.findOne(create_book_dto.isbn);

        if (exists) {
            throw new BadRequestException('ISBN already exists in the database');
        }

        const book: BookDescription = this.book_repository.create(create_book_dto);
        return this.book_repository.save(book);
    }

    findAll() {
        return this.book_repository.find({
            take: 500,
        });
    }

    findOne(isbn: string) {
        return this.book_repository.findOne(isbn);
    }

    update(isbn: string, update_book_dto: UpdateBookDto) {
        return this.book_repository.update(isbn, update_book_dto);
    }

    remove(isbn: string) {
        return this.book_repository.delete(isbn); //BookInstance and AuthorGroup cascades
    }
}
