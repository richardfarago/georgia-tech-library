import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ParseISBNPipe } from '../common/pipes/isbn.pipe';
import { BookInstanceService } from './book-instance.service';

@Controller('book/:isbn')
export class BookInstanceController {
    constructor(private readonly book_instance_service: BookInstanceService) { }

    @Post()
    addToBook(@Param('isbn', ParseISBNPipe) isbn: string, @Body() body: any) {
        return this.book_instance_service.create(isbn, body);
    }

    @Get(':id')
    findOne(@Param() id: string) {
        return this.book_instance_service.findOne(id)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.book_instance_service.remove(id);
    }
}
