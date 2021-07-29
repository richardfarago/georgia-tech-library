import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { BookInstanceService } from './book-instance.service';

@Controller('book/:isbn')
export class BookInstanceController {
    constructor(private readonly book_instance_service: BookInstanceService) {}

    @Post()
    addToBook(@Param('isbn') isbn: string, @Body() body: any) {
        return this.book_instance_service.create(isbn, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.book_instance_service.remove(id);
    }
}
