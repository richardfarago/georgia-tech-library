import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, NotImplementedException } from '@nestjs/common';
import * as ISBN from 'isbn-validate';


@Injectable()
export class IdExistsPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        let entityType = "Member" //Find a way to input data
        let id: string
        switch (entityType) {
            case "Member": {
                //db.query(`SELECT * FROM Member where user_id = '${id}'`)
                id = null
            }
            default: {
                throw new NotImplementedException(`Existence checking for ${value} is not implemented yet.`)
            }
        }

        if (id) {
            throw new BadRequestException('Provided key does not exist in the database.');
        }
        return value;
    }
}
