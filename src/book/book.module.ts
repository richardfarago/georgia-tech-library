import { Module } from '@nestjs/common';
import { BookService } from './book-description.service';
import { BookController } from './book-description.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookDescription } from './entities/book-description.entity';
import { BookInstance } from './entities/book-instance.entity';
import { Author } from './entities/author.entity';
import { BoonInstanceController } from './book-instance.controller';
import { BookInstanceService } from './book-instance.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookDescription, BookInstance, Author])],
    controllers: [BookController, BoonInstanceController],
    providers: [BookService, BookInstanceService]
})
export class BookModule { }
