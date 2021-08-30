import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ParseISBNPipe } from '../common/pipes/isbn.pipe';
import { DoesExistGuard } from '../common/guards/does-exist.guard';
import { BookDescriptionService } from './book-description.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDescription } from './entities/book-description.entity';
import { BookInstance } from './entities/book-instance.entity';

@Controller('book')
export class BookDescriptionController {
    constructor(private readonly book_service: BookDescriptionService) { }

    @Post()
    create(@Body() create_book_dto: CreateBookDto) {
        return this.book_service.create(create_book_dto);
    }

    @Get()
    findAll() {
        return this.book_service.findAll();
    }

    @Get(':isbn')
    findOne(@Param('isbn', ParseISBNPipe) isbn: string) {
        return this.book_service.findOne(isbn);
    }

    @Patch(':isbn')
    @UseGuards(new DoesExistGuard(BookDescription, 'isbn'))
    update(@Param('isbn', ParseISBNPipe) isbn: string, @Body() update_book_dto: UpdateBookDto) {
        return this.book_service.update(isbn, update_book_dto);
    }

    @Delete(':isbn')
    @UseGuards(new DoesExistGuard(BookDescription, 'isbn'))
    remove(@Param('isbn', ParseISBNPipe) isbn: string) {
        return this.book_service.remove(isbn);
    }
}
