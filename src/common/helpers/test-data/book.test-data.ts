import { CreateBookInstanceDto } from "../../../book/dto/create-book-instance.dto";
import { CreateBookDto } from "../../../book/dto/create-book.dto";
import { UpdateBookDto } from "../../../book/dto/update-book.dto";
import { BookDescription } from "../../../book/entities/book-description.entity";

export const create_book_description_dto: CreateBookDto = {
    isbn: '0-7390-4524-5',
    title: 'Testing',
    description: 'Test book description.',
    is_watchlist: true,
    is_loanable: false,
    language: 'Italian',
    cover: 'Hard',
    subject_area: 'Science',
    authors: [{ id: '4af74fbf-707b-4a12-a7d4-32c91865a3fb' }, { id: 'ecf77574-bfc2-446c-bedb-61339ce054f5' }],
};

export const book_description_single: BookDescription = {
    isbn: "0-7390-4524-5",
    title: "Testing",
    description: "Test book description.",
    is_watchlist: true,
    is_loanable: false,
    language: "Italian",
    cover: "Hard",
    subject_area: "Science",
    authors: [
        {
            id: "4af74fbf-707b-4a12-a7d4-32c91865a3fb",
            first_name: "Garner",
            last_name: "Ricardon"
        },
        {
            id: "ecf77574-bfc2-446c-bedb-61339ce054f5",
            first_name: "Nicolai",
            last_name: "Fryer"
        }
    ],
    book_instances: [
        {
            id: "fc98e52e-b031-416e-b22e-953e048207fe",
            condition: "10"
        }
    ]
}

export const book_description_list = [
    {
        isbn: "065013903-8",
        title: "My Mother (Ma mère)",
        description: "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.",
        is_watchlist: true,
        is_loanable: false,
        language: "Italian",
        cover: "Hard",
        subject_area: "Science",
        authors: [
            {
                id: "4af74fbf-707b-4a12-a7d4-32c91865a3fb",
                first_name: "Garner",
                last_name: "Ricardon"
            },
            {
                id: "ecf77574-bfc2-446c-bedb-61339ce054f5",
                first_name: "Nicolai",
                last_name: "Fryer"
            }
        ],
        book_instances: [
            {
                id: "00027af9-33e3-4970-9271-f0cecab87a41",
                condition: "5"
            },
            {
                id: "1fc0688b-06d5-4548-a3a2-bfbed433708d",
                condition: "5"
            },
            {
                id: "4162431a-1400-451b-9904-9bdf1099c674",
                condition: "9"
            }
        ]
    },
    {
        isbn: "181903055-5",
        title: "Holiday in Handcuffs",
        description: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        is_watchlist: false,
        is_loanable: false,
        language: "Danish",
        cover: "Hard",
        subject_area: "Biography",
        authors: [
            {
                id: "15e8b46a-cdb1-43e8-bb76-974e6e3dd9d0",
                first_name: "Gretchen",
                last_name: "Van De Cappelle"
            }
        ],
        book_instances: [
            {
                id: "0012d434-115f-4fd1-b4d4-c44bc120c543",
                condition: "7"
            },
            {
                id: "1449d8e5-f6ce-4073-97f6-9771f3f2e030",
                condition: "1"
            },
            {
                id: "b0641cd2-48e9-48bd-9f51-5b77e09d8548",
                condition: "2"
            },
            {
                id: "ce2764e7-2cf6-48f6-844c-2b676cd7010f",
                condition: "2"
            },
            {
                id: "f376eeda-1da3-4046-b0f9-56bb6aa7007b",
                condition: "3"
            },
            {
                id: "f5c7e43d-ac33-4627-990b-8c4736fa57e6",
                condition: "4"
            }
        ]
    },
    {
        isbn: "130358763-7",
        title: "Heavy Weather",
        description: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.",
        is_watchlist: true,
        is_loanable: true,
        language: "Italian",
        cover: "Soft",
        subject_area: "History",
        authors: [
            {
                id: "10e245e2-bc55-4fde-a12d-1cf468231f54",
                first_name: "Grazia",
                last_name: "Sadlier"
            }
        ],
        book_instances: [
            {
                id: "002617a6-e522-4f04-8aa5-be8f3254e820",
                condition: "5"
            },
            {
                id: "8cf5588e-ba8b-417f-a1a9-6f78986b166f",
                condition: "5"
            },
            {
                id: "a914152a-900f-4276-b96f-6a408285c55a",
                condition: "4"
            },
            {
                id: "c0d30abd-df9b-4047-9c5b-21ecc1323132",
                condition: "2"
            }
        ]
    },
    {
        isbn: "263949100-8",
        title: "Superheroes",
        description: "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        is_watchlist: false,
        is_loanable: false,
        language: "Danish",
        cover: "Soft",
        subject_area: "Romance",
        authors: [
            {
                id: "15e8b46a-cdb1-43e8-bb76-974e6e3dd9d0",
                first_name: "Gretchen",
                last_name: "Van De Cappelle"
            }
        ],
        book_instances: [
            {
                id: "0026fd45-6035-4efc-bee6-95f4ed39fad6",
                condition: "6"
            },
            {
                id: "4cb115cc-b174-46cf-b773-e60d16d76af6",
                condition: "10"
            },
            {
                id: "6b49054f-dff6-4b9d-86e7-72c3fd77878e",
                condition: "1"
            },
            {
                id: "725294d3-da23-42af-9072-d0f76eca143b",
                condition: "1"
            },
            {
                id: "729fdbf3-6efd-4f5a-8090-8767d0947fcb",
                condition: "3"
            },
            {
                id: "c63f03ec-0dfa-4ccb-b258-33f365458f3c",
                condition: "8"
            },
            {
                id: "f9f7cb08-bdae-46dc-ad53-c325235ef9f4",
                condition: "4"
            }
        ]
    },
    {
        isbn: "773760022-1",
        title: "Initiation, The",
        description: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
        is_watchlist: false,
        is_loanable: false,
        language: "English",
        cover: "Soft",
        subject_area: "Fantasy",
        authors: [
            {
                id: "e0615411-2745-4a25-80cf-7d663cda7d38",
                first_name: "Viola",
                last_name: "Johansen"
            }
        ],
        book_instances: [
            {
                id: "00295dff-ca64-478e-adc3-fa2c86bca6ec",
                condition: "6"
            },
            {
                id: "afe91f48-012c-4fde-b325-aedb4f7a8e74",
                condition: "6"
            }
        ]
    }
]

export const update_book_dto: UpdateBookDto = {
    title: "Advanced testing"
}

export const isbn: string = "ISBN"

export const create_book_instance_body = {
    condition: "10",
}

export const create_book_instance_dto = {
    condition: "10",
    isbn: { isbn }
}

export const book_id = 'BOOK_ID'