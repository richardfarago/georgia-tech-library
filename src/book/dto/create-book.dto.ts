import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsISBN, IsString, ValidateNested } from "class-validator";
import { Author } from "../entities/author.entity";

export class CreateBookDto {

    @IsISBN("10")
    isbn: string;

    @IsString()
    title: string;

    @IsString()
    description: string | null;

    @IsBoolean()
    is_watchlist: boolean;

    @IsBoolean()
    is_loanable: boolean;

    @IsString()
    language: string

    @IsString()
    cover: string

    @IsString()
    subject_area: string

    @IsArray()
    @ValidateNested()
    @Type(() => Author)
    authors: Author[];
}
