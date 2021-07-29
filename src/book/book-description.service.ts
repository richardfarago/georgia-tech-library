import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDescription } from './entities/book-description.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookDescription) private book_repository: Repository<BookDescription>
    ) { }

    create(create_book_dto: CreateBookDto) {

        let book: BookDescription = this.book_repository.create(create_book_dto);
        console.log(book)
        return this.book_repository.save(book)
    }

    findAll() {
        return this.book_repository.find()
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
