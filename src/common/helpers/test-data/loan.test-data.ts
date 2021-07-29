export const create_loan_dto = {
    loan_contents: [
        { book_id: "01284c9f-976a-4ed6-a401-c78727babe11" },
        { book_id: "013d33e2-d78a-44e8-a210-d3ee00d28e4a" },
        { book_id: "014ea02b-d681-45b3-88b3-213ebedeb869" }
    ]
}

export const loan_single = {
    id: "932126b0-6164-4246-abb1-11809eff7780",
    start_date: "2021-07-29T14:03:42.000Z",
    end_date: "2021-08-19T14:03:42.000Z",
    due_date: "2021-08-26T14:03:42.000Z",
    member: {
        user_id: "00005591-6afb-4c47-b010-e64350bffbd8",
        phone_number: "+504 (788) 213-8332",
        library: null,
        user: {
            id: "00005591-6afb-4c47-b010-e64350bffbd8",
            username: "nilchenko4r"
        },
        school_member: {
            ssn: "418-43-6907",
            first_name: "Nataline",
            last_name: "Ilchenko",
            home_address: {
                id: "5cb0b387-4012-4c01-b22a-733f266c94cc",
                street: "Fairfield Court",
                house_number: "62",
                city: {
                    zip: "80045",
                    city: "Aurora"
                }
            }
        },
        member_card: {
            number: "85-785-3299",
            photo_url: "http://dummyimage.com/101x196.png/ff4444/ffffff",
            issuedAt: "2020-04-30T11:27:10.000Z"
        },
        loan_permission: {
            name: "Student",
            book_limit: 5,
            loan_period: 21,
            grace_period: 7
        },
        campus_address: {
            id: "dbd67b55-ef1f-4455-bf18-6ce403080768",
            street: "Buhler Terrace",
            house_number: "28",
            city: {
                zip: "80243",
                city: "Denver"
            }
        }
    },
    loan_contents: [
        {
            book_id: "00027af9-33e3-4970-9271-f0cecab87a41",
            loan_id: "932126b0-6164-4246-abb1-11809eff7780",
            returned_at: "2021-07-29T15:49:13.000Z",
            book: {
                id: "00027af9-33e3-4970-9271-f0cecab87a41",
                condition: "5"
            }
        },
        {
            book_id: "fc98e52e-b031-416e-b22e-953e048207fe",
            loan_id: "932126b0-6164-4246-abb1-11809eff7780",
            returned_at: "2021-07-29T15:49:13.000Z",
            book: {
                id: "fc98e52e-b031-416e-b22e-953e048207fe",
                condition: "10"
            }
        }
    ]
}

export const loan_list = [
    {
        id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
        start_date: "2018-09-16T08:52:08.000Z",
        end_date: "2018-10-07T08:52:08.000Z",
        due_date: "2018-10-16T08:52:08.000Z",
        member: {
            user_id: "7f3968ce-c991-49bd-b4db-588aead7eec8",
            phone_number: "+33 (970) 143-4561",
            library: null,
            user: {
                id: "7f3968ce-c991-49bd-b4db-588aead7eec8",
                username: "aspore1y"
            },
            school_member: {
                ssn: "441-04-0153",
                first_name: "Auguste",
                last_name: "Spore",
                home_address: {
                    id: "df49f1b1-6572-4804-9c3b-c21b4231a99b",
                    street: "Jenifer Way",
                    house_number: "4",
                    city: {
                        zip: "71161",
                        city: "Shreveport"
                    }
                }
            },
            member_card: {
                number: "43-474-0568",
                photo_url: "http://dummyimage.com/108x131.png/ff4444/ffffff",
                issuedAt: "2018-04-22T23:36:34.000Z"
            },
            loan_permission: {
                name: "Student",
                book_limit: 5,
                loan_period: 21,
                grace_period: 7
            },
            campus_address: {
                id: "fead06e1-d074-4e6c-81cb-3f66f80c345d",
                street: "Menomonie Place",
                house_number: "4616",
                city: {
                    zip: "30045",
                    city: "Lawrenceville"
                }
            }
        },
        loan_contents: [
            {
                book_id: "0012d434-115f-4fd1-b4d4-c44bc120c543",
                loan_id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
                returned_at: "2018-10-16T08:52:08.000Z",
                book: {
                    id: "0012d434-115f-4fd1-b4d4-c44bc120c543",
                    condition: "7"
                }
            },
            {
                book_id: "1d36651c-09cb-4a83-8fdc-ec64a922f2ab",
                loan_id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
                returned_at: "2018-10-16T08:52:08.000Z",
                book: {
                    id: "1d36651c-09cb-4a83-8fdc-ec64a922f2ab",
                    condition: "3"
                }
            },
            {
                book_id: "8da05341-4bc2-42f8-9192-f75d2559541f",
                loan_id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
                returned_at: "2018-10-16T08:52:08.000Z",
                book: {
                    id: "8da05341-4bc2-42f8-9192-f75d2559541f",
                    condition: "9"
                }
            },
            {
                book_id: "e61d7c01-f6ac-43b3-b497-1c1297ba9d76",
                loan_id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
                returned_at: "2018-10-16T08:52:08.000Z",
                book: {
                    id: "e61d7c01-f6ac-43b3-b497-1c1297ba9d76",
                    condition: "2"
                }
            },
            {
                book_id: "f9cce543-12a8-4d78-98f7-09cd8a7161ef",
                loan_id: "036958d9-1ff9-4552-83ae-ff3e1974c318",
                returned_at: "2018-11-03T10:52:08.000Z",
                book: {
                    id: "f9cce543-12a8-4d78-98f7-09cd8a7161ef",
                    condition: "10"
                }
            }
        ]
    },
    {
        id: "0460c472-4955-4459-bde8-adce1cc8498c",
        start_date: "2019-12-15T06:40:03.000Z",
        end_date: "2020-01-05T06:40:03.000Z",
        due_date: "2020-01-14T06:40:03.000Z",
        member: {
            user_id: "2149796b-2ccc-4081-a1ff-475167b1e274",
            phone_number: "+225 (902) 304-6445",
            library: null,
            user: {
                id: "2149796b-2ccc-4081-a1ff-475167b1e274",
                username: "rbenner5q"
            },
            school_member: {
                ssn: "477-43-6313",
                first_name: "Raven",
                last_name: "Benner",
                home_address: {
                    id: "231b914e-7f10-4146-8ffc-9f3f0ea5590d",
                    street: "Rockefeller Road",
                    house_number: "23",
                    city: {
                        zip: "37416",
                        city: "Chattanooga"
                    }
                }
            },
            member_card: {
                number: "68-229-8440",
                photo_url: "http://dummyimage.com/178x177.png/ff4444/ffffff",
                issuedAt: "2018-07-04T03:42:15.000Z"
            },
            loan_permission: {
                name: "Student",
                book_limit: 5,
                loan_period: 21,
                grace_period: 7
            },
            campus_address: {
                id: "3074f51e-5861-4556-bfc1-84736f0c4f57",
                street: "Barby Park",
                house_number: "2",
                city: {
                    zip: "75037",
                    city: "Irving"
                }
            }
        },
        loan_contents: [
            {
                book_id: "002f790e-cdf6-40a6-a650-a8ca7650973c",
                loan_id: "0460c472-4955-4459-bde8-adce1cc8498c",
                returned_at: "2020-01-14T06:40:03.000Z",
                book: {
                    id: "002f790e-cdf6-40a6-a650-a8ca7650973c",
                    condition: "5"
                }
            },
            {
                book_id: "057e297c-32cb-4af8-a5bf-e7d7ffd5a062",
                loan_id: "0460c472-4955-4459-bde8-adce1cc8498c",
                returned_at: "2020-01-14T06:40:03.000Z",
                book: {
                    id: "057e297c-32cb-4af8-a5bf-e7d7ffd5a062",
                    condition: "3"
                }
            }
        ]
    },
    {
        id: "017973d2-1683-49bf-b932-fb22fd67e314",
        start_date: "2019-02-13T22:58:21.000Z",
        end_date: "2019-03-06T22:58:21.000Z",
        due_date: "2019-03-15T22:58:21.000Z",
        member: {
            user_id: "0c9da786-2786-4300-ae80-4d8b92de72a6",
            phone_number: "+86 (476) 268-3550",
            library: null,
            user: {
                id: "0c9da786-2786-4300-ae80-4d8b92de72a6",
                username: "bgrieveskb"
            },
            school_member: {
                ssn: "878-43-7143",
                first_name: "Basile",
                last_name: "Grieves",
                home_address: {
                    id: "45d10ad7-be85-484c-b54b-19f0ed480413",
                    street: "Esch Parkway",
                    house_number: "6",
                    city: {
                        zip: "10160",
                        city: "New York City"
                    }
                }
            },
            member_card: {
                number: "32-029-7294",
                photo_url: "http://dummyimage.com/167x203.png/dddddd/000000",
                issuedAt: "2020-09-17T16:36:09.000Z"
            },
            loan_permission: {
                name: "Student",
                book_limit: 5,
                loan_period: 21,
                grace_period: 7
            },
            campus_address: {
                id: "86106416-8266-4404-8e20-38612d748dee",
                street: "Doe Crossing Hill",
                house_number: "75368",
                city: {
                    zip: "30045",
                    city: "Lawrenceville"
                }
            }
        },
        loan_contents: [
            {
                book_id: "00366701-75b9-4e80-9d2e-449e9167187d",
                loan_id: "017973d2-1683-49bf-b932-fb22fd67e314",
                returned_at: "2019-03-15T22:58:21.000Z",
                book: {
                    id: "00366701-75b9-4e80-9d2e-449e9167187d",
                    condition: "10"
                }
            }
        ]
    },
    {
        id: "009785ff-8a47-4b6a-a919-2b5908db9fa1",
        start_date: "2020-08-25T14:43:58.000Z",
        end_date: "2020-09-15T14:43:58.000Z",
        due_date: "2020-09-24T14:43:58.000Z",
        member: {
            user_id: "22186610-34f8-46fc-b795-02771f4b48e6",
            phone_number: "+49 (918) 168-6576",
            library: null,
            user: {
                id: "22186610-34f8-46fc-b795-02771f4b48e6",
                username: "mfarrer9q"
            },
            school_member: {
                ssn: "391-96-0879",
                first_name: "Morie",
                last_name: "Farrer",
                home_address: {
                    id: "0b8460d6-1192-4fa0-aa8f-46fcd851a136",
                    street: "Independence Place",
                    house_number: "5954",
                    city: {
                        zip: "40287",
                        city: "Louisville"
                    }
                }
            },
            member_card: {
                number: "36-428-5605",
                photo_url: "http://dummyimage.com/210x186.png/cc0000/ffffff",
                issuedAt: "2019-05-14T14:15:40.000Z"
            },
            loan_permission: {
                name: "Student",
                book_limit: 5,
                loan_period: 21,
                grace_period: 7
            },
            campus_address: {
                id: "bb610a7b-ba1b-4400-8094-e48c1ad61a73",
                street: "Melody Road",
                house_number: "539",
                city: {
                    zip: "77070",
                    city: "Houston"
                }
            }
        },
        loan_contents: [
            {
                book_id: "003cd03b-9800-4cf6-8fca-fc8c9c13ea0a",
                loan_id: "009785ff-8a47-4b6a-a919-2b5908db9fa1",
                returned_at: "2020-09-25T14:43:58.000Z",
                book: {
                    id: "003cd03b-9800-4cf6-8fca-fc8c9c13ea0a",
                    condition: "10"
                }
            },
            {
                book_id: "5cc8f9b0-f35c-481b-9d3c-d7dd82dd4e56",
                loan_id: "009785ff-8a47-4b6a-a919-2b5908db9fa1",
                returned_at: "2020-09-24T14:43:58.000Z",
                book: {
                    id: "5cc8f9b0-f35c-481b-9d3c-d7dd82dd4e56",
                    condition: "4"
                }
            },
            {
                book_id: "ae087245-00cf-4846-bf4c-c52f79b80a78",
                loan_id: "009785ff-8a47-4b6a-a919-2b5908db9fa1",
                returned_at: "2020-09-24T14:43:58.000Z",
                book: {
                    id: "ae087245-00cf-4846-bf4c-c52f79b80a78",
                    condition: "10"
                }
            }
        ]
    }
]

export const loan_id = "LOAN ID"