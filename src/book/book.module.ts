import { Module } from '@nestjs/common';
import { BookDescriptionService } from './book-description.service';
import { BookDescriptionController } from './book-description.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookDescription } from './entities/book-description.entity';
import { BookInstance } from './entities/book-instance.entity';
import { Author } from './entities/author.entity';
import { BookInstanceController } from './book-instance.controller';
import { BookInstanceService } from './book-instance.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookDescription, BookInstance, Author])],
    controllers: [BookDescriptionController, BookInstanceController],
    providers: [BookDescriptionService, BookInstanceService],
})
export class BookModule {}
