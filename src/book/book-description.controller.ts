import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book-description.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly book_service: BookService) { }

    @Post()
    create(@Body() create_book_dto: CreateBookDto) {
        return this.book_service.create(create_book_dto);
    }

    @Get()
    findAll() {
        return this.book_service.findAll();
    }

    @Get(':isbn')
    findOne(@Param('isbn') isbn: string) {
        return this.book_service.findOne(isbn);
    }

    @Patch(':isbn')
    update(@Param('isbn') isbn: string, @Body() update_book_dto: UpdateBookDto) {
        return this.book_service.update(isbn, update_book_dto);
    }

    @Delete(':isbn')
    remove(@Param('isbn') isbn: string) {
        return this.book_service.remove(isbn);
    }
}
