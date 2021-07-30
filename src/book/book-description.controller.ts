import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsISBN } from 'class-validator';
import { ParseISBNPipe } from '../common/pipes/isbn.pipe';
import { BookDescriptionService } from './book-description.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookDescriptionController {
    constructor(private readonly book_service: BookDescriptionService) {}

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
    update(@Param('isbn', ParseISBNPipe) isbn: string, @Body() update_book_dto: UpdateBookDto) {
        return this.book_service.update(isbn, update_book_dto);
    }

    @Delete(':isbn')
    remove(@Param('isbn', ParseISBNPipe) isbn: string) {
        return this.book_service.remove(isbn);
    }
}
