import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as ISBN from 'isbn-validate';

@Injectable()
export class ParseISBNPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        if (!ISBN.Validate(value)) {
            throw new BadRequestException('Value must be an ISBN number');
        }
        return value;
    }
}
