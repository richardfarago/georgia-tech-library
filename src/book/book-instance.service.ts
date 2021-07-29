import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookInstanceDto } from './dto/create-book-instance.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookInstance } from './entities/book-instance.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookInstanceService {
    constructor(@InjectRepository(BookInstance) private book_instance_repository: Repository<BookInstance>) {}

    create(isbn: string, body: any) {
        const dto: CreateBookInstanceDto = {
            isbn: { isbn },
            condition: body.condition,
        };

        const instance: BookInstance = this.book_instance_repository.create(dto);
        instance.id = uuid();
        console.log(instance);

        return this.book_instance_repository.save(instance);
    }

    remove(id: string) {
        return this.book_instance_repository.delete(id); //BookInstance and AuthorGroup cascades
    }
}
