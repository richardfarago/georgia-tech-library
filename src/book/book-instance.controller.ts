import { Controller, Post, Body, Param, Delete, Get, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ParseISBNPipe } from '../common/pipes/isbn.pipe';
import { DoesExistGuard } from '../common/guards/does-exist.guard';
import { BookInstanceService } from './book-instance.service';
import { BookDescription } from './entities/book-description.entity';
import { BookInstance } from './entities/book-instance.entity';

@Controller('book/:isbn')
export class BookInstanceController {
    constructor(private readonly book_instance_service: BookInstanceService) {}

    @Post()
    addToBook(@Param('isbn', ParseISBNPipe) isbn: string, @Body() body: any) {
        return this.book_instance_service.create(isbn, body);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.book_instance_service.findOne(id);
    }

    @Delete(':id')
    @UseGuards(new DoesExistGuard(BookDescription, 'isbn'), new DoesExistGuard(BookInstance, 'id'))
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.book_instance_service.remove(id);
    }
}
